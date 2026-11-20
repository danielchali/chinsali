import { Link } from "@tanstack/react-router";

const links = [
  { to: "/projects", label: "Projects" },
  { to: "/report", label: "Report or suggest" },
  { to: "/polls", label: "Community polls" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground">C</span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold">Chinsali Connect</span>
            <span className="block text-xs text-muted-foreground">Chinsali Town Council</span>
          </span>
        </Link>
        <nav className="flex flex-wrap gap-1 text-sm font-medium">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="rounded-full px-3 py-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground" activeProps={{ className: "bg-secondary text-foreground" }}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-deep text-deep-foreground">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold">Chinsali Connect</p>
          <p className="mt-2 text-sm opacity-80">A Chinsali Town Council platform for open, accountable local development.</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">No smartphone?</p>
          <p className="mt-1 opacity-80">Dial <b>*1234#</b> or SMS <b>REPORT</b> to <b>1234</b>.</p>
        </div>
        <div className="text-sm opacity-80">Muchinga Province, Zambia</div>
      </div>
    </footer>
  );
}
