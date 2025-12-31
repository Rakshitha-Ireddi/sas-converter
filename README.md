# SAS to PySpark/Databricks Converter

A modern web application for converting legacy SAS projects into production-ready PySpark code for BDH (Hadoop) or Databricks environments.

## Features

- **Intelligent Conversion**: Transforms DATA steps, PROC SQL, and SAS macros into optimized PySpark logic.
- **Dual Targets**: Generate code for **PySpark BDH** (with shell scripts) or **Databricks Notebooks** (with workflow JSONs).
- **Modern UI**: Dark/Light mode, integrated code editor, and instant ZIP project conversion.
- **Secure**: Validation for restricted environments (e.g., email domain checks).
- **AI Assistant**: Built-in chatbot for platform guidance.

## Prerequisites

- **Node.js**: Version 18.17 or higher.
- **npm**: Included with Node.js.

## Installation & Setup

### 1. Get the Code
**Option A: Clone via Git**
```bash
git clone https://github.com/Rakshitha-Ireddi/sas-converter.git
cd sas-converter
```

**Option B: Download ZIP (No Git)**
1. Go to [https://github.com/Rakshitha-Ireddi/sas-converter](https://github.com/Rakshitha-Ireddi/sas-converter).
2. Click the green **<> Code** button.
3. Select **Download ZIP**.
4. Extract the ZIP file to your desired folder.
5. Open that folder in VS Code.

### 2. Install Dependencies
Open a terminal in the project folder and run:
```bash
npm install
```

### 3. Run the Application
Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app`: Next.js App Router pages and API endpoints.
- `src/components`: Reusable UI components (Editor, ChatWidget, etc.).
- `src/lib/converter`: Core logic for SAS to PySpark conversion (TypeScript).
- `src/contexts`: React contexts (Theme, etc.).
- `public`: Static assets.

## Usage

1. **Quick Convert**: Paste SAS code directly or upload a `.sas` file.
2. **Project Convert**: Upload a `.zip` file containing multiple SAS scripts.
3. **Select Target**: Choose between PySpark BDH or Databricks.
4. **Download**: Get the converted code as a ZIP file.

## License

Private / Internal Use