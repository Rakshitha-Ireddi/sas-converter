import { ProcSqlContent } from '../types';

/**
 * Maps PROC SQL to PySpark SQL code
 */
export function mapProcSql(content: ProcSqlContent): string {
    const lines: string[] = [];

    lines.push(`# PROC SQL conversion`);

    content.statements.forEach(stmt => {
        let sql = stmt.rawSql;

        // Basic cleanup of SAS specific SQL syntax
        sql = sql.replace(/calc\./gi, ''); // Remove library refs for local views
        sql = sql.replace(/;/g, '');

        if (stmt.statementType === 'create_table') {
            const table = stmt.targetTable || 'table_result';
            const selectPart = stmt.selectClause || '*';

            // Convert to Spark SQL CTAS (Create Table As Select)
            // Or simple DataFrame API
            lines.push(`${table} = spark.sql("""`);
            lines.push(`    ${sql}`);
            lines.push(`""")`);

            // Create Temp View for subsequent steps to use
            lines.push(`${table}.createOrReplaceTempView("${table}")`);
        } else if (stmt.statementType === 'select') {
            // Just a Select ?
            lines.push(`df_result = spark.sql("""`);
            lines.push(`    ${sql}`);
            lines.push(`""")`);
            lines.push(`df_result.show()`);
        }
    });

    return lines.join('\n');
}
