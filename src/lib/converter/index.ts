import { parseSasCode } from './parser';
import { ConversionInput, ConversionResult } from './types';
import { generatePySparkCode } from './generators/pyspark';
import { generateDatabricksNotebook } from './generators/databricks';

/**
 * Main conversion entry point
 */
export async function convert(input: ConversionInput): Promise<ConversionResult> {
    const sasProgram = parseSasCode(input.sasCode);

    letfiles = [];
    if (input.target === 'databricks') {
        files = generateDatabricksNotebook(sasProgram);
    } else {
        files = generatePySparkCode(sasProgram);
    }

    return {
        zipName: 'converted_project.zip',
        directoryTree: 'main.py',
        files,
        filePlan: [{ path: 'main.py', purpose: 'Main execution script' }]
    };
}
