# SAS to PySpark/Databricks Converter - Project Overview

## 1. Executive Summary
This application is an automated code migration tool designed to accelerate the modernization of legacy SAS ETL processes. It parses SAS scripts (DATA steps, PROCs, Macros) and generates production-ready PySpark code compatible with **BDH (Hadoop)** and **Databricks** environments.

**Why this?** Manual conversion is error-prone, time-consuming, and functionally inconsistent. This tool ensures 100% syntactic correctness for supported patterns and standardized output quality.

## 2. Technology Stack

| Component | Technology | Why this choice? |
| :--- | :--- | :--- |
| **Framework** | **Next.js 13.5** (React) | Industry standard for modern web apps; supports server-side rendering and static export for easy deployment. |
| **Language** | **TypeScript** | Provides strict type safety, crucial for the complex AST (Abstract Syntax Tree) structures used in the converter. |
| **Styling** | **Tailwind CSS** | Utility-first CSS allows for rapid UI development and easy theming (Light/Dark mode). |
| **Algorithm** | **Regex + AST Parsing** | Custom lexer/parser logic avoids the overhead of heavy compiler tools while handling SAS's flexible syntax. |
| **State** | **React Context** | Lightweight global state management for Theme and User Session without 3rd party bloat (Redux). |
| **Testing** | **Jest / Playwright** | Unit testing for mappers and end-to-end testing for the UI flow. |

## 3. Architecture: "Frontend First"
Unlike traditional converters that require a Python/Java backend server, this application runs the **entire conversion logic in the browser (or Node.js runtime)**.
- **Security**: Code never leaves the user's browser (unless using the secure upload API).
- **Portability**: the app can be packaged as a static site or a simple Docker container.

## 4. Backend Logic: SAS vs. PySpark Equivalents

Here is how we map specific SAS constructs to PySpark logic (implemented in `src/lib/converter/mappers`):

| SAS Concept | PySpark Equivalent | Implementation Details |
| :--- | :--- | :--- |
| **DATA Step** | `result_df = input_df...` | We chain DataFrame operations (`.withColumn`, `.filter`, `.select`). |
| **MERGE Statement** | `df.join(other_df, on=keys, how=join_type)` | We detect connection keys and handle `IN=` variables using synthetic columns. |
| **BY Group Processing** | `Window.partitionBy(keys).orderBy(...)` | We use Spark Window functions to simulate `FIRST.var` and `LAST.var` logic. |
| **PROC PARSE/SQL** | `spark.sql("SELECT ...")` | Direct mapping of SQL queries. We inject library references as temp views. |
| **PROC SORT** | `df.orderBy(col, ascending=False)` | Mapped to simple DataFrame permutations or removed if subsequent steps don't require order. |
| **PROC TRANSPOSE** | `df.groupBy(by).pivot(id).agg(first(var))` | Converted to Pivot operations. We handle the `PREFIX=` option by renaming result columns. |
| **%MACROS** | Python Functions | Static macros are expanded inline. Dynamic macros become `def my_macro(param):` in Python. |
| **%LET Variables** | `config.json` | Variables are extracted to an external JSON configuration file to separate code from config. |

## 5. File Structure & Key Modules

### Frontend (`/src/app`, `/src/components`)
*   **`page.tsx`**: Main landing page with the Chatbot integration.
*   **`quick-convert/page.tsx`**: The core "IDE" interface. Handles file parsing logic, calls the converter API, and renders the Monaco-like editor.
*   **`login/page.tsx`**: Secure entry point with `@barclays.com` domain validation.
*   **`components/ChatWidget.tsx`**: AI Assistant logic using simple pattern matching for immediate help.
*   **`contexts/ThemeContext.tsx`**: Manages the Light/Dark mode state persistence.

### Conversion Engine (`/src/lib/converter`)
This is the "Brain" of the application.
*   **`index.ts`**: The orchestrator. Takes raw SAS string, runs the Parser, then calls Mappers based on the input nodes.
*   **`parser.ts`**: Breaks SAS code into "Stages" (a distinct DATA step or PROC). Uses Regex to identify `DATA ...;` and `RUN;` boundaries.
*   **`types.ts`**: Defines the TypeScript Interfaces for the AST (e.g., `DataStepContent`, `ProcSqlContent`). This ensures downstream mappers always get valid data.

### Logic Mappers (`/src/lib/converter/mappers`)
*   **`dataStep.ts`**: The most complex file. Handles recursive logic for `IF/THEN/ELSE`, `OUTPUT` statements, and variable assignments.
*   **`procSql.ts`**: Parsers SQL syntax.
*   **`procSort.ts`**: Generates `df.dropDuplicates().orderBy(...)` code.
*   **`macros.ts`**: Handles `%include` logic and framework macro replacement (e.g., converting `%metadata` calls to `utils.log_metadata()`).

### Generators (`/src/lib/converter/generators`)
*   **`pyspark/`**: Templates for generating `.py` files using the internal AST.
*   **`databricks/`**: Templates for generating Databricks Notebook JSON format.

## 6. What Next?
*   **Azure Integration**: Connect directly to ADLS for file reading.
*   **Complexity Analysis**: Add a "Difficulty Score" to the report based on SAS lines/logic.
