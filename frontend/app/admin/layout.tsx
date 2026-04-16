import type { ReactNode } from "react";

import { AdminSidebar } from "../../components/admin/sidebar";

type AdminLayoutProps = {
	children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
	return (
		<div className="min-h-screen bg-muted/30">
			<div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 md:grid-cols-[240px_1fr]">
				<AdminSidebar />

				<main className="p-4 md:p-8">
					<div className="rounded-xl border bg-background p-4 shadow-sm md:p-6">
						{children}
					</div>
				</main>
			</div>
		</div>
	);
}
