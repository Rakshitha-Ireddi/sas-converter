import { GeneratedFile, SasAst } from '../types';
import { mapDataStep, mapProcSql, mapProcSort, mapProcTranspose } from '../mappers';

export function generatePySparkCode(ast: SasAst): GeneratedFile[] {
    const lines: string[] = [];

    // Headers
    lines.push('from pyspark.sql import SparkSession');
    lines.push('import pyspark.sql.functions as F');
    lines.push('from pyspark.sql.window import Window');
    lines.push('');
    lines.push('spark = SparkSession.builder.appName("SAS_Converted").getOrCreate()');
    lines.push('');

    const files: GeneratedFile[] = [];

    // Iterate stages
    ast.stages.forEach(stage => {
        lines.push('');
        lines.push(`# --- Processing Stage: ${stage.type} ---`);

        try {
            if (stage.type === 'data_step') {
                // Note: mapDataStep might return a string or push to files depending on implementation
                // Assuming it returns code string for main file
                lines.push(mapDataStep(stage.parsed as any, files));
            } else if (stage.type === 'proc_sql') {
                lines.push(mapProcSql(stage.parsed as any));
            } else if (stage.type === 'proc_sort') {
                lines.push(mapProcSort(stage.parsed as any));
            } else if (stage.type === 'proc_transpose') {
                lines.push(mapProcTranspose(stage.parsed as any));
            } else {
                lines.push(`# Unsupported stage type: ${stage.type}`);
            }
        } catch (e: any) {
            lines.push(`# Error converting stage ${stage.type}: ${e.message}`);
        }
    });

    // Add the main script
    files.push({
        path: 'main.py',
        content: lines.join('\n')
    });

    return files;
}
