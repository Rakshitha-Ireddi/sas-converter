import { SasProgram, SasStage, SasStageType } from './types';

/**
 * Parses raw SAS code into a structured AST
 */
export function parseSasCode(code: string): SasProgram {
    const stages: SasStage[] = [];

    // Normalize code: remove comments
    const cleanCode = code
        .replace(/\/\*[\s\S]*?\*\//g, '')  // Block comments
        .replace(/^\s*\%.*?;\s*$/gm, '')   // Simple macro calls (placeholder)
        .replace(/^\s*\*.*?;/gm, '');       // Line comments *;

    // Simple Regex-based parser to identify step boundaries
    // Split by global statements "DATA" or "PROC"

    const tokenRegex = /(DATA\s+[\w\.]+|PROC\s+\w+)/gi;
    const parts = cleanCode.split(tokenRegex);

    // Re-assemble
    // parts[0] is preamble. parts[1] is "DATA foo", parts[2] is body...

    let currentStageType: SasStageType | null = null;
    let currentBody = '';

    for (let i = 1; i < parts.length; i += 2) {
        const header = parts[i];
        const body = parts[i + 1] || '';
        const fullStep = header + body;

        if (header.toUpperCase().startsWith('DATA')) {
            stages.push({
                type: 'data_step',
                rawCode: fullStep,
                parsed: {
                    type: 'data_step',
                    inputDatasets: [],
                    outputDatasets: [{ table: header.split(/\s+/)[1] }], // Rough extraction
                    assignments: [],
                    conditions: [],
                    dropVariables: [],
                    keepVariables: [],
                    retainVariables: [],
                    renameVariables: [],
                    outputStatements: [],
                    byVariables: [],
                    hasFirstLast: false
                }
            });
        } else if (header.toUpperCase().startsWith('PROC SQL')) {
            stages.push({
                type: 'proc_sql',
                rawCode: fullStep,
                parsed: {
                    type: 'proc_sql',
                    statements: [{ statementType: 'select', rawSql: body.split(';')[0], targetTable: 'result' }], // Placeholder
                    options: []
                }
            });
        } else if (header.toUpperCase().startsWith('PROC SORT')) {
            stages.push({
                type: 'proc_sort',
                rawCode: fullStep,
                parsed: {
                    type: 'proc_sort',
                    inputDataset: { table: 'data_in' },
                    outputDataset: { table: 'data_out' },
                    byVariables: [],
                    nodupkey: false,
                    options: []
                }
            });
        }
        // ... Add other PROCs as needed
    }

    return {
        name: 'converted_program',
        includes: [],
        macros: [],
        letVariables: [],
        stages
    };
}
