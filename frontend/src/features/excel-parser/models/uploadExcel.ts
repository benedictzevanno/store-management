import * as XLSX from "xlsx";
import type {
    ExcelRow,
    ParsedWorkbook,
    ParseExcelResult,
} from "../types/excel-parser.types";

export const ALL_SHEETS = "__all__";

export async function parseExcelFile(file: File): Promise<ParseExcelResult> {
    const allowedExtensions = [".xlsx", ".xls", ".csv"];
    const lowerName = file.name.toLowerCase();

    if (!allowedExtensions.some((ext) => lowerName.endsWith(ext))) {
        throw new Error("Unsupported file type. Please upload .xlsx, .xls, or .csv file.");
    }

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });

    if (workbook.SheetNames.length === 0) {
        throw new Error("No sheets found in workbook.");
    }

    const workbookData: ParsedWorkbook = {};

    workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        if (!sheet) {
            workbookData[sheetName] = [];
            return;
        }

        const rows = XLSX.utils.sheet_to_json<ExcelRow>(sheet, {
            defval: "",
            raw: false,
        });

        workbookData[sheetName] = filterRows(rows);
    });

    return {
        fileName: file.name,
        sheetNames: workbook.SheetNames,
        workbookData,
    };
}

export function filterRows(rows: ExcelRow[]): ExcelRow[] {
    return rows.filter((row) => {
        if (row.No === undefined) {
            return true;
        }

        return String(row.No).trim() !== "";
    });
}

export function getRowsForSelectedSheet(
    workbookData: ParsedWorkbook,
    selectedSheet: string
) {
    if (selectedSheet === ALL_SHEETS) {
        return workbookData;
    }

    return workbookData[selectedSheet] ?? [];
}