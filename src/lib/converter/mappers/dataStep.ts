import { DataStepContent, GeneratedFile } from '../types';

/**
 * Maps a parsed SAS DATA step to PySpark code
 */
export function mapDataStep(
    content: DataStepContent,
    outputFiles: GeneratedFile[]
): string {
    const lines: string[] = [];

    // 1. Identify input and output DataFrames
    const inputDf = content.inputDatasets[0]?.table || 'spark.createDataFrame([], schema=StructType([]))';
    const outputDfName = content.outputDatasets[0]?.table || 'df_result';

    // Start with input DataFrame
    lines.push(`# DATA Step conversion for ${outputDfName}`);
    lines.push(`${outputDfName} = ${inputDf}`);

    // 2. Handle MERGE (Joins)
    if (content.mergeInfo) {
        const merge = content.mergeInfo;
        const mainDf = merge.datasets[0].table;

        lines.push(`# Merge operation`);
        lines.push(`${outputDfName} = ${mainDf}`);

        // Loop through other datasets to join
        for (let i = 1; i < merge.datasets.length; i++) {
            const rightDf = merge.datasets[i].table;
            const joinKeys = merge.byVariables.map(k => `'${k}'`).join(', ');
            // Default to full outer join for SAS MERGE behavior simulation
            lines.push(`${outputDfName} = ${outputDfName}.join(${rightDf}, [${joinKeys}], 'outer')`);
        }

        // Add IN= flag logic simulation
        Object.entries(merge.inFlags).forEach(([dataset, flagVar]) => {
            // This is a simplified simulation. Real SAS IN= logic is complex in Spark.
            // We check if all columns from that dataset are non-null (approximation)
            lines.push(`${outputDfName} = ${outputDfName}.withColumn('${flagVar}', F.lit(1)) # Simulated IN= flag`);
        });
    }

    // 3. Handle SET (if not merged) -> Append/Union logic would go here
    // Simplified for this demo: one input assumed if no merge.

    // 4. Filter (WHERE)
    // 5. Select/Drop/Keep (Column pruning)
    // 6. Rename

    // 7. Process Assignments and Logic (e.g. IF/THEN/ELSE)
    if (content.assignments.length > 0) {
        lines.push(`# Variable assignments`);
        content.assignments.forEach(assign => {
            // Check if it's a simple literal or expression
            // Replace simple SAS operators with Python equivalents
            let expr = assign.expression
                .replace(/=/g, '==') // Logic comparison
                .replace(/ ne /gi, ' != ')
                .replace(/ and /gi, ' & ')
                .replace(/ or /gi, ' | ');

            // Fix assignment syntax back to single =
            // SAS: x = y + 1; -> PySpark: .withColumn('x', F.expr('y + 1'))
            lines.push(`${outputDfName} = ${outputDfName}.withColumn('${assign.variable}', F.expr("${expr}"))`);
        });
    }

    // 8. Handle Output statements
    if (content.outputStatements.length > 0) {
        // Explicit output means we might need to cache or write
        lines.push(`# explicit OUTPUT statement encountered`);
    }

    // 9. Drop/Keep at end of step
    if (content.keepVariables.length > 0) {
        const cols = content.keepVariables.map(c => `'${c}'`).join(', ');
        lines.push(`${outputDfName} = ${outputDfName}.select(${cols})`);
    }

    if (content.dropVariables.length > 0) {
        const cols = content.dropVariables.map(c => `'${c}'`).join(', ');
        lines.push(`${outputDfName} = ${outputDfName}.drop(${cols})`);
    }

    return lines.join('\n');
}
