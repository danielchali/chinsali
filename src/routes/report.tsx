import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { WARDS, CATEGORIES } from "@/lib/civic";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report an issue or suggest a project — Chinsali Connect" },
      { name: "description", content: "Tell Chinsali Town Council about problems in your area or projects your community needs." },
      { property: "og:title", content: "Report or suggest — Chinsali Connect" },
      { property: "og:description", content: "Report issues, suggest projects or give feedback to the council." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Report,
});

const kinds = [
  { v: "report", l: "Report an issue", d: "Burst pipe, broken road, waste…" },
  { v: "suggestion", l: "Suggest a project", d: "Borehole, school, clinic…" },
  { v: "feedback", l: "Feedback or question", d: "Ask, comment or commend" },
] as const;

const field = "mt-1 w-full rounded-lg border border-input bg-card px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring";

function Report() {
  const [kind, setKind] = useState<(typeof kinds)[number]["v"]>("report");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const details = String(fd.get("details") ?? "").trim();
    if (details.length < 5) { toast.error("Please describe it in a few more words."); return; }
    setBusy(true);
    const phone = String(fd.get("phone") ?? "").trim();
    const { error } = await supabase.from("submissions").insert({
      kind, details,
      ward: String(fd.get("ward")),
      category: String(fd.get("category")),
      ...(phone ? { phone } : {}),
    });
    setBusy(false);
    if (error) { toast.error("Could not send. Please try again."); return; }
    setSent(true);
  }

  if (sent)
    return (
      <main className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-4xl font-bold">Thank you!</h1>
        <p className="mt-3 text-muted-foreground">The Town Council has received your message. If you left a number, we'll SMS you updates.</p>
        <button onClick={() => setSent(false)} className="mt-6 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Send another</button>
      </main>
    );

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-4xl font-bold">Speak to your council</h1>
      <p className="mt-2 text-muted-foreground">No account needed. On a basic phone? Dial <b>*1234#</b>.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {kinds.map((k) => (
          <button key={k.v} type="button" onClick={() => setKind(k.v)} className={`rounded-xl border p-4 text-left ${kind === k.v ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
            <p className="font-semibold">{k.l}</p><p className="text-xs text-muted-foreground">{k.d}</p>
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="mt-6 space-y-4 rounded-xl border border-border bg-card p-6 shadow-soft">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">Ward<select name="ward" className={field}>{WARDS.map((w) => <option key={w}>{w}</option>)}</select></label>
          <label className="text-sm font-medium">Topic<select name="category" className={field}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></label>
        </div>
        <label className="block text-sm font-medium">Details<textarea name="details" rows={5} maxLength={2000} required className={field} placeholder="Where is it and what's happening?" /></label>
        <label className="block text-sm font-medium">Phone (optional, for SMS updates)<input name="phone" maxLength={20} className={field} placeholder="097 1234567" /></label>
        <button disabled={busy} className="w-full rounded-full bg-accent py-3 font-semibold text-accent-foreground disabled:opacity-60">{busy ? "Sending…" : "Send to council"}</button>
      </form>
    </main>
  );
}
