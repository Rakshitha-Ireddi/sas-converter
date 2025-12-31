/**
 * Type definitions for the SAS to PySpark/Databricks converter
 */

// ============================================
// Conversion Input/Output Types
// ============================================

/**
 * Input for the conversion process
 */
export interface ConversionInput {
    sasCode: string;
    processCode?: string;
    target: 'pyspark_bdh' | 'databricks';
    baseMountPath?: string;
    parametersOverrides?: ParametersOverrides;
}

/**
 * Optional parameter overrides
 */
export interface ParametersOverrides {
    sysProj?: string;
    sysEnvAbbr?: string;
    runDate?: string;
    inputRoot?: string;
    outputRoot?: string;
}

/**
 * Output from the conversion process
 */
export interface ConversionResult {
    filePlan: FilePlanEntry[];
    directoryTree: string;
    files: GeneratedFile[];
    zipName: string;
}

/**
 * Entry in the file plan
 */
export interface FilePlanEntry {
    path: string;
    purpose: string;
}

/**
 * Generated file with path and content
 */
export interface GeneratedFile {
    path: string;
    content: string;
}

// ============================================
// AST Node Types (SAS Abstract Syntax Tree)
// ============================================

/**
 * Root AST node representing a SAS program
 */
export interface SasProgram {
    name: string;
    includes: string[];
    macros: SasMacro[];
    stages: SasStage[];
    letVariables: SasLetVariable[];
}

/**
 * SAS macro definition
 */
export interface SasMacro {
    name: string;
    params: string[];
    body: string;
    isFrameworkMacro: boolean;
}

/**
 * SAS %let variable assignment
 */
export interface SasLetVariable {
    name: string;
    value: string;
}

/**
 * Stage in the SAS program (DATA step, PROC, etc.)
 */
export interface SasStage {
    type: SasStageType;
    sourceFile?: string;
    rawCode: string;
    parsed: SasStageContent;
}

/**
 * Types of SAS stages
 */
export type SasStageType =
    | 'data_step'
    | 'proc_sql'
    | 'proc_sort'
    | 'proc_transpose'
    | 'proc_append'
    | 'proc_freq'
    | 'proc_means'
    | 'proc_datasets'
    | 'macro_call';

/**
 * Parsed content of a SAS stage
 */
export type SasStageContent =
    | DataStepContent
    | ProcSqlContent
    | ProcSortContent
    | ProcTransposeContent
    | ProcAppendContent
    | ProcDatasetsContent
    | MacroCallContent
    | GenericProcContent;

// ============================================
// DATA Step Types
// ============================================

/**
 * Parsed DATA step content
 */
export interface DataStepContent {
    type: 'data_step';
    outputDatasets: DatasetReference[];
    inputDatasets: DatasetReference[];
    mergeInfo?: MergeInfo;
    byVariables: string[];
    keepVariables: string[];
    dropVariables: string[];
    renameVariables: RenameMapping[];
    retainVariables: string[];
    hasFirstLast: boolean;
    conditions: Condition[];
    assignments: Assignment[];
    outputStatements: OutputStatement[];
}

/**
 * Dataset reference (library.table format)
 */
export interface DatasetReference {
    library?: string;
    table: string;
    alias?: string;
    inFlag?: string;
    options?: DatasetOptions;
}

/**
 * Dataset options (KEEP, DROP, WHERE, RENAME)
 */
export interface DatasetOptions {
    keep?: string[];
    drop?: string[];
    where?: string;
    rename?: RenameMapping[];
}

/**
 * Information about MERGE statement
 */
export interface MergeInfo {
    datasets: DatasetReference[];
    byVariables: string[];
    inFlags: { [dataset: string]: string };
}

/**
 * Rename mapping (old name to new name)
 */
export interface RenameMapping {
    from: string;
    to: string;
}

/**
 * Conditional statement (IF/THEN/ELSE)
 */
export interface Condition {
    condition: string;
    thenStatements: string[];
    elseStatements?: string[];
}

/**
 * Variable assignment
 */
export interface Assignment {
    variable: string;
    expression: string;
    attrib?: AttributeInfo;
}

/**
 * Attribute information (LENGTH, FORMAT)
 */
export interface AttributeInfo {
    length?: number;
    format?: string;
    informat?: string;
}

/**
 * OUTPUT statement
 */
export interface OutputStatement {
    dataset?: string;
}

// ============================================
// PROC SQL Types
// ============================================

/**
 * Parsed PROC SQL content
 */
export interface ProcSqlContent {
    type: 'proc_sql';
    statements: SqlStatement[];
    options: string[];
}

/**
 * SQL statement within PROC SQL
 */
export interface SqlStatement {
    statementType: 'select' | 'create_table' | 'insert' | 'update' | 'delete' | 'execute' | 'drop';
    targetTable?: string;
    selectClause?: string;
    fromClause?: string;
    whereClause?: string;
    groupByClause?: string;
    havingClause?: string;
    orderByClause?: string;
    joinInfo?: JoinInfo[];
    rawSql: string;
}

/**
 * Join information
 */
export interface JoinInfo {
    joinType: 'inner' | 'left' | 'right' | 'full' | 'cross';
    rightTable: string;
    onCondition: string;
}

// ============================================
// PROC SORT Types
// ============================================

/**
 * Parsed PROC SORT content
 */
export interface ProcSortContent {
    type: 'proc_sort';
    inputDataset: DatasetReference;
    outputDataset?: DatasetReference;
    byVariables: SortVariable[];
    nodupkey: boolean;
    options: string[];
}

/**
 * Sort variable with direction
 */
export interface SortVariable {
    name: string;
    descending: boolean;
}

// ============================================
// PROC TRANSPOSE Types
// ============================================

/**
 * Parsed PROC TRANSPOSE content
 */
export interface ProcTransposeContent {
    type: 'proc_transpose';
    inputDataset: DatasetReference;
    outputDataset?: DatasetReference;
    byVariables: string[];
    idVariable?: string;
    varVariables: string[];
    prefix?: string;
    name?: string;
}

// ============================================
// PROC APPEND Types
// ============================================

/**
 * Parsed PROC APPEND content
 */
export interface ProcAppendContent {
    type: 'proc_append';
    baseDataset: DatasetReference;
    dataDataset: DatasetReference;
    force: boolean;
}

// ============================================
// PROC DATASETS Types
// ============================================

/**
 * Parsed PROC DATASETS content
 */
export interface ProcDatasetsContent {
    type: 'proc_datasets';
    library: string;
    deleteDatasets: string[];
    changeNames: RenameMapping[];
}

// ============================================
// Macro Call Types
// ============================================

/**
 * Parsed macro call content
 */
export interface MacroCallContent {
    type: 'macro_call';
    macroName: string;
    parameters: { [key: string]: string };
}

// ============================================
// Generic PROC Types
// ============================================

/**
 * Generic PROC content for unsupported PROCs
 */
export interface GenericProcContent {
    type: 'generic_proc';
    procType: string;
    rawCode: string;
}

// ============================================
// Job Configuration Types
// ============================================

/**
 * Job parameters configuration
 */
export interface JobParameters {
    runDate: string;
    inputRoot: string;
    outputRoot: string;
    tempRoot: string;
    errorMappingPath: string;
    jobName?: string;
    jobProject?: string;
    jobType?: string;
    sysProj?: string;
    sysEnvAbbr?: string;
    [key: string]: string | undefined;
}

/**
 * Database configuration
 */
export interface DatabaseConfig {
    sourceSystem: string;
    jdbcUrl: string;
    user: string;
    password: string;
    schema?: string;
}

/**
 * Email configuration
 */
export interface EmailConfig {
    to: string[];
    cc: string[];
    from: string;
    subjectPrefix: string;
}

/**
 * Error code mapping
 */
export interface ErrorCodeMapping {
    [code: string]: string;
}
