export type ExcelRow = Record<string, unknown>;

export type ParsedWorkbook = Record<string, ExcelRow[]>;

export type SelectedWorkbookData = ParsedWorkbook | ExcelRow[] | null;

export type ParseExcelResult = {
  fileName: string;
  sheetNames: string[];
  workbookData: ParsedWorkbook;
};
