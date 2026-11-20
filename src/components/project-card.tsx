import { formatKwacha } from "@/lib/civic";
import type { Tables } from "@/integrations/supabase/types";

const statusStyle: Record<string, string> = {
  ongoing: "bg-accent/15 text-accent",
  completed: "bg-primary/15 text-primary",
  planned: "bg-muted text-muted-foreground",
};

export function ProjectCard({ p }: { p: Tables<"projects"> }) {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold uppercase tracking-wide text-muted-foreground">{p.category} · {p.ward}</span>
        <span className={`rounded-full px-2 py-0.5 font-semibold capitalize ${statusStyle[p.status] ?? ""}`}>{p.status}</span>
      </div>
      <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
      <p className="mt-1 flex-1 text-sm text-muted-foreground">{p.summary}</p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${p.progress}%` }} />
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>{p.progress}% complete</span><span>{formatKwacha(p.budget_kwacha)}</span>
      </div>
    </article>
  );
}
