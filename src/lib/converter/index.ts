import { parseSasCode } from './parser';
import { mapDataStep, mapProcSql, mapProcSort, mapProcTranspose, mapMacroDefinition } from './mappers';
import { ConversionInput, ConversionResult, GeneratedFile } from './types';

/**
 * Main conversion entry point
 */
export async function convert(input: ConversionInput): Promise<ConversionResult> {
    const files: GeneratedFile[] = [];
    const sasProgram = parseSasCode(input.sasCode);

    // Main File
    const lines: string[] = [];
    lines.push('from pyspark.sql import SparkSession');
    lines.push('import pyspark.sql.functions as F');
    lines.push('from pyspark.sql.window import Window');
    lines.push('');
    lines.push('spark = SparkSession.builder.appName("SAS_Converted").getOrCreate()');
    lines.push('');

    // Iterate stages
    sasProgram.stages.forEach(stage => {
        lines.push('');
        if (stage.type === 'data_step') {
            lines.push(mapDataStep(stage.parsed as any, files));
        } else if (stage.type === 'proc_sql') {
            lines.push(mapProcSql(stage.parsed as any));
        } else if (stage.type === 'proc_sort') {
            lines.push(mapProcSort(stage.parsed as any));
        } else if (stage.type === 'proc_transpose') {
            lines.push(mapProcTranspose(stage.parsed as any));
        }
        // ...
    });

    files.push({
        path: 'main.py',
        content: lines.join('\n')
    });

    return {
        zipName: 'converted_project.zip',
        directoryTree: 'main.py',
        files,
        filePlan: [{ path: 'main.py', purpose: 'Main execution script' }]
    };
}
