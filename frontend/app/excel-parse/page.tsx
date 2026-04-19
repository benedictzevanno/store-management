"use client";

import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import {
  FileSpreadsheet,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ParsedWorkbook = Record<string, Array<Record<string, unknown>>>;
type TableRowData = Record<string, unknown>;

const ALL_SHEETS = "__all__";

function ExcelParsing() {
  const [fileName, setFileName] = useState("");
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState(ALL_SHEETS);
  const [workbookData, setWorkbookData] = useState<ParsedWorkbook>({});
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSelectedSheet(ALL_SHEETS);
  }, [fileName]);

  const convertedData = useMemo(() => {
    if (!sheetNames.length) {
      return null;
    }

    if (selectedSheet === ALL_SHEETS) {
      return workbookData;
    }

    return workbookData[selectedSheet] ?? [];
  }, [selectedSheet, sheetNames.length, workbookData]);

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsParsing(true);
    setError("");

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });

      const parsed: ParsedWorkbook = {};

      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
          defval: "",
          raw: false,
        });

        parsed[sheetName] = rows.filter((row) =>
          row.No !== undefined && String(row.No).trim() !== ""
        );
      });


      setFileName(file.name);
      setSheetNames(workbook.SheetNames);
      setWorkbookData(parsed);
      setSelectedSheet(ALL_SHEETS);
    } catch (parseError) {
      setFileName("");
      setSheetNames([]);
      setWorkbookData({});
      setSelectedSheet(ALL_SHEETS);
      setError(
        parseError instanceof Error
          ? parseError.message
          : "Unable to read this file. Please upload a valid Excel workbook."
      );
    } finally {
      setIsParsing(false);
      event.target.value = "";
    }
  }

  const tableRows = useMemo<TableRowData[]>(() => {
    if (!convertedData) {
      return [];
    }

    if (Array.isArray(convertedData)) {
      return convertedData;
    }

    return Object.entries(convertedData).flatMap(([sheetName, rows]) =>
      rows.map((row) => ({ __sheet: sheetName, ...row } as TableRowData))
    );
  }, [convertedData]);

  const tableColumns = useMemo(() => {
    const columns = new Set<string>();

    tableRows.forEach((row) => {
      Object.keys(row).forEach((key) => columns.add(key));
    });

    return Array.from(columns);
  }, [tableRows]);

  const rowCount = useMemo(() => {
    if (!convertedData) {
      return 0;
    }

    if (Array.isArray(convertedData)) {
      return convertedData.length;
    }

    return Object.values(convertedData).reduce(
      (total, rows) => total + rows.length,
      0
    );
  }, [convertedData]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 text-zinc-950 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 dark:text-zinc-50">
      <div className="mx-auto flex min-h-screen w-full max-w-none flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-zinc-200 bg-white/90 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                <FileSpreadsheet className="size-4" />
                Hi, Zeze Electronic!
              </div>
              <div className="space-y-3">
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  Upload file excel untuk mendapatkan pilihan sheets yang akan di convert!
                </h1>
              </div>
            </div>

            <Card className="border-zinc-200 shadow-lg dark:border-zinc-800">
              <CardHeader>
                <CardTitle>Upload workbook</CardTitle>
                <CardDescription>
                  Supports .xlsx, .xls, and .csv files.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="excel-file">Excel file</Label>
                  <Input
                    id="excel-file"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileChange}
                    disabled={isParsing}
                  />
                </div>

                {isParsing ? (
                  <div className="flex items-center gap-2 rounded-xl border border-dashed border-zinc-200 px-4 py-3 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                    <Loader2 className="size-4 animate-spin" />
                    Reading workbook...
                  </div>
                ) : null}

                {error ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                    {error}
                  </div>
                ) : null}

                {fileName ? (
                  <div className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{fileName}</p>
                        <p className="text-zinc-500 dark:text-zinc-400">
                          {sheetNames.length} sheet{sheetNames.length === 1 ? "" : "s"} parsed
                        </p>
                      </div>
                      <p className="rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-600 ring-1 ring-zinc-200 dark:bg-zinc-950 dark:text-zinc-300 dark:ring-zinc-800">
                        {rowCount} rows
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sheet">Sheet</Label>
                      <select
                        id="sheet"
                        value={selectedSheet}
                        onChange={(event) => setSelectedSheet(event.target.value)}
                        className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950"
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
                  <div className="rounded-xl border border-dashed border-zinc-200 px-4 py-6 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    Choose a spreadsheet to generate JSON output.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="w-full h-full">
          <Card className="w-full border-zinc-200 shadow-sm dark:border-zinc-800">
            <CardHeader>
              <CardTitle>Table preview</CardTitle>
            </CardHeader>
            <CardContent>
              {tableRows.length > 0 ? (
                <div className="h-[72vh] overflow-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
                  <Table>
                    <TableHeader className="sticky top-0 z-10 bg-zinc-100 dark:bg-zinc-900">
                      <TableRow>
                        {tableColumns.map((column) => (
                          <TableHead key={column}>{column}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tableRows.map((row, index) => (
                        <TableRow key={`${String(row["No"] ?? index)}-${index}`}>
                          {tableColumns.map((column) => (
                            <TableCell key={`${column}-${index}`}>
                              {String(row[column] ?? "")}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-zinc-200 p-4 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  Upload an Excel file to see the table preview here.
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

export default ExcelParsing;
