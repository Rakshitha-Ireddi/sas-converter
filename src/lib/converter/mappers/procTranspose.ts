import { ProcTransposeContent } from '../types';

/**
 * Maps PROC TRANSPOSE to PySpark pivot
 */
export function mapProcTranspose(content: ProcTransposeContent): string {
    const lines: string[] = [];
    const inputDf = content.inputDataset.table;
    const outputDf = content.outputDataset?.table || 'df_transposed';

    lines.push(`# PROC TRANSPOSE conversion`);

    // Group By variables
    const groupBy = content.byVariables.map(v => `'${v}'`).join(', ');

    // ID Variable (Pivot Column)
    const pivotCol = content.idVariable || 'id_col';

    // Value Variable (Agg Column) - typical default
    const valCol = content.varVariables[0] || 'value_col';

    lines.push(`${outputDf} = ${inputDf}.groupBy(${groupBy}).pivot('${pivotCol}').agg(F.first('${valCol}'))`);

    return lines.join('\n');
}
