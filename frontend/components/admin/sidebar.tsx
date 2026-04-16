"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { menuOutline } from "ionicons/icons";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
];

function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/admin" && pathname.startsWith(item.href));

        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminSidebar() {
  return (
    <>
      <aside className="hidden border-r bg-background p-4 md:block">
        <div className="mb-6">
          <p className="text-base font-semibold">Zeze Dashboard</p>
        </div>

        <NavLinks />
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-background px-4 py-3 md:hidden">
        <div>
          <p className="text-sm font-semibold">Admin Panel</p>
          <p className="text-xs text-muted-foreground">Store Management</p>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon-sm" aria-label="Open admin menu">
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader>
              <SheetTitle>Menu Admin</SheetTitle>
            </SheetHeader>
            <div className="px-4 pb-4">
              <NavLinks />
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
