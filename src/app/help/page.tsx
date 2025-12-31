export default function HelpPage() {
    return (
        <div className="min-h-screen pt-20 pb-10 px-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Documentation</h1>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4 text-indigo-600">Supported Features</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>DATA Step conversion to PySpark DataFrame operations</li>
                    <li>PROC SQL to spark.sql()</li>
                    <li>PROC SORT to df.sort()</li>
                    <li>PROC TRANSPOSE to df.groupBy().pivot()</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4 text-indigo-600">Usage Guide</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Paste your SAS code into the editor on the Quick Convert page. Select your target environment (Generic PySpark or Databricks) and click Convert.
                </p>
            </section>
        </div>
    );
}
