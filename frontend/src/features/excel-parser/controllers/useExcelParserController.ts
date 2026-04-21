"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ALL_SHEETS,
  getRowsForSelectedSheet,
  parseExcelFile,
} from "../models/uploadExcel";
import type { ExcelRow, ParsedWorkbook, SelectedWorkbookData } from "../types/excel-parser.types";

export function useExcelParserController() {
  const [fileName, setFileName] = useState("");
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState(ALL_SHEETS);
  const [workbookData, setWorkbookData] = useState<ParsedWorkbook>({});
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSelectedSheet(ALL_SHEETS);
  }, [fileName]);

  const selectedData = useMemo<SelectedWorkbookData>(() => {
    if (sheetNames.length === 0) {
      return null;
    }

    return getRowsForSelectedSheet(workbookData, selectedSheet);
  }, [sheetNames.length, selectedSheet, workbookData]);

  const tableRows = useMemo<ExcelRow[]>(() => {
    if (!selectedData) {
      return [];
    }

    if (Array.isArray(selectedData)) {
      return selectedData;
    }

    return Object.entries(selectedData).flatMap(([sheetName, rows]) =>
      rows.map((row) => ({ __sheet: sheetName, ...row }))
    );
  }, [selectedData]);

  const tableColumns = useMemo<string[]>(() => {
    const columns = new Set<string>();

    tableRows.forEach((row) => {
      Object.keys(row).forEach((key) => columns.add(key));
    });

    return Array.from(columns);
  }, [tableRows]);

  const rowCount = useMemo(() => {
    if (!selectedData) {
      return 0;
    }

    if (Array.isArray(selectedData)) {
      return selectedData.length;
    }

    return Object.values(selectedData).reduce((total, rows) => total + rows.length, 0);
  }, [selectedData]);

  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsParsing(true);
    setError("");

    try {
      const result = await parseExcelFile(file);
      setFileName(result.fileName);
      setSheetNames(result.sheetNames);
      setWorkbookData(result.workbookData);
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

  function onSheetChange(value: string) {
    setSelectedSheet(value);
  }

  return {
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
  };
}
