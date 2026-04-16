import Link from "next/link";
import { FileSpreadsheet, ListChecks, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Fondasi halaman admin untuk manajemen data dan upload file Excel.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="size-4" /> Validation Ready
            </CardTitle>
            <CardDescription>
              Slot disiapkan untuk preview baris valid/invalid.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="size-4" /> Import Pipeline
            </CardTitle>
            <CardDescription>
              Slot disiapkan untuk dry-run dan commit import ke backend.
            </CardDescription>
          </CardHeader>
        </Card>
                <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="size-4" /> Upload Excel
            </CardTitle>
            <CardDescription>
              Masuk ke halaman upload untuk proses import data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/upload-excel">Buka Upload Excel</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
