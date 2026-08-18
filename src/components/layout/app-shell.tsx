import type { ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { Landmark } from "lucide-react";

export interface NavItem {
  label: string;
  to: NonNullable<LinkProps["to"]>;
}

export function BrandMark({ subtitle }: { subtitle?: string }) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
        <Landmark className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-base font-semibold leading-tight text-foreground">
          CivicSense
        </span>
        {subtitle ? (
          <span className="block truncate text-xs text-muted-foreground">{subtitle}</span>
        ) : null}
      </span>
    </Link>
  );
}

export function AppShell({
  subtitle,
  nav,
  actions,
  children,
}: {
  subtitle?: string;
  nav?: NavItem[];
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
          <BrandMark {...(subtitle ? { subtitle } : {})} />
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        </div>
        {nav && nav.length > 0 ? (
          <nav
            aria-label="Portal navigation"
            className="mx-auto w-full max-w-6xl overflow-x-auto px-4 sm:px-6"
          >
            <ul className="flex items-center gap-1 pb-1">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    activeOptions={{ exact: true }}
                    activeProps={{
                      className: "border-primary text-primary",
                    }}
                    inactiveProps={{
                      className: "border-transparent text-muted-foreground",
                    }}
                    className="inline-flex whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">{children}</main>

      <SiteFooter />
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} CivicSense — a civic issue reporting platform.</p>
        <p className="text-xs">Prototype interface. No live data is processed yet.</p>
      </div>
    </footer>
  );
}
