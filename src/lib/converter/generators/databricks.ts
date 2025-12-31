import { GeneratedFile, SasAst } from '../types';
import { generatePySparkCode } from './pyspark';

export function generateDatabricksNotebook(ast: SasAst): GeneratedFile[] {
    // Reuse PySpark logic but wrap in Databricks specific comments/structure if needed
    // For now, it's very similar but we might add widget definitions or magic commands

    const baseFiles = generatePySparkCode(ast);

    return baseFiles.map(f => {
        if (f.path.endsWith('.py')) {
            return {
                ...f,
                content: `# Databricks notebook source\n${f.content}`
            };
        }
        return f;
    });
}
