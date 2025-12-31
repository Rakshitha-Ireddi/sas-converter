import { ProcSortContent } from '../types';

/**
 * Maps PROC SORT to PySpark orderBy
 */
export function mapProcSort(content: ProcSortContent): string {
    const lines: string[] = [];

    const inputDf = content.inputDataset.table;
    const outputDf = content.outputDataset?.table || inputDf; // Overwrite if same

    lines.push(`# PROC SORT conversion for ${inputDf}`);

    // NODUPKEY -> dropDuplicates
    let currentDf = inputDf;

    if (content.nodupkey) {
        // If BY variables provided, drop duplicates on those keys
        if (content.byVariables.length > 0) {
            const keys = content.byVariables.map(v => `'${v.name}'`).join(', ');
            lines.push(`${outputDf} = ${currentDf}.dropDuplicates([${keys}])`);
        } else {
            lines.push(`${outputDf} = ${currentDf}.dropDuplicates()`);
        }
        currentDf = outputDf;
    }

    // Sort
    if (content.byVariables.length > 0) {
        const sortCols = content.byVariables.map(v => {
            return v.descending
                ? `F.col('${v.name}').desc()`
                : `F.col('${v.name}').asc()`;
        }).join(', ');

        lines.push(`${outputDf} = ${currentDf}.orderBy(${sortCols})`);
    } else {
        // Just assigning if no sort needed (rare for proc sort)
        if (outputDf !== currentDf) {
            lines.push(`${outputDf} = ${currentDf}`);
        }
    }

    return lines.join('\n');
}
