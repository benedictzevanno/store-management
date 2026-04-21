"use client";

import { FileSpreadsheet, Loader2 } from "lucide-react";
import { ALL_SHEETS } from "../models/uploadExcel";
import { useExcelParserController } from "../controllers/useExcelParserController";

export default function ExcelParserView() {
  const {
    fileName,
    sheetNames,
    selectedSheet,
    isParsing,
    error,
    rowCount,
    tableRows,
    tableColumns,
    onFileChange,
    onSheetChange,
  } = useExcelParserController();

  return (
    <main className="min-h-screen bg-zinc-50 p-4 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 sm:p-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            <FileSpreadsheet className="size-4" />
            Excel Parser (MVC)
          </div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Upload and preview your Excel file</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Model handles parsing, Controller handles state, View handles UI.
          </p>
        </header>

        <section className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">File input</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Supports .xlsx, .xls, and .csv</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="excel-file" className="text-sm font-medium">Excel file</label>
              <input
                id="excel-file"
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={onFileChange}
                disabled={isParsing}
                className="block w-full cursor-pointer rounded-md border border-zinc-200 bg-white p-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-70 dark:border-zinc-800 dark:bg-zinc-950 dark:file:bg-zinc-800 dark:hover:file:bg-zinc-700"
              />
            </div>

            {isParsing ? (
              <div className="flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900">
                <Loader2 className="size-4 animate-spin" />
                Parsing file...
              </div>
            ) : null}

            {error ? (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                {error}
              </div>
            ) : null}

            {fileName ? (
              <div className="grid gap-4 rounded-md border border-zinc-200 bg-zinc-100 p-4 dark:border-zinc-800 dark:bg-zinc-900/60 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">File name</p>
                  <p className="break-all font-medium">{fileName}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Rows</p>
                  <p className="font-medium">{rowCount}</p>
                </div>

                <div className="space-y-2 sm:col-span-3">
                  <label htmlFor="sheet" className="text-sm font-medium">Sheet</label>
                  <select
                    id="sheet"
                    value={selectedSheet}
                    onChange={(event) => onSheetChange(event.target.value)}
                    className="h-10 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    <option value={ALL_SHEETS}>All sheets</option>
                    {sheetNames.map((sheetName) => (
                      <option key={sheetName} value={sheetName}>
                        {sheetName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-zinc-300 px-3 py-5 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                No file selected yet.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Table preview</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {tableRows.length > 0
                ? `${tableRows.length} rows • ${tableColumns.length} columns`
                : "Upload a file to display data"}
            </p>
          </div>

          {tableRows.length > 0 ? (
            <div className="max-h-[65vh] overflow-auto rounded-md border border-zinc-200 dark:border-zinc-800">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 z-10 bg-zinc-100 dark:bg-zinc-900">
                  <tr>
                    {tableColumns.map((column) => (
                      <th
                        key={column}
                        className="border-b border-zinc-200 px-3 py-2 text-left text-sm font-medium dark:border-zinc-800"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, index) => (
                    <tr
                      key={`${String(row["No"] ?? index)}-${index}`}
                      className="odd:bg-zinc-50/50 dark:odd:bg-zinc-900/20"
                    >
                      {tableColumns.map((column) => (
                        <td
                          key={`${column}-${index}`}
                          className="border-b border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800"
                        >
                          {String(row[column] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-zinc-300 px-3 py-8 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              Your table preview will appear here.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
