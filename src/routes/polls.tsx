import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { pollsQuery } from "@/lib/civic";

export const Route = createFileRoute("/polls")({
  head: () => ({
    meta: [
      { title: "Community polls — My Chinsali" },
      { name: "description", content: "Vote on which projects Chinsali Town Council should prioritise." },
      { property: "og:title", content: "Community polls — My Chinsali" },
      { property: "og:description", content: "Help decide Chinsali's development priorities." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(pollsQuery),
  component: Polls,
});

function Polls() {
  const { data } = useSuspenseQuery(pollsQuery);
  const qc = useQueryClient();
  const [voted, setVoted] = useState<Record<string, boolean>>({});
  useEffect(() => setVoted(JSON.parse(localStorage.getItem("cc-votes") ?? "{}")), []);

  async function vote(pollId: string, optionId: string) {
    const { error } = await supabase.rpc("cast_vote", { _option: optionId });
    if (error) { toast.error("Vote failed, try again."); return; }
    const next = { ...voted, [pollId]: true };
    setVoted(next);
    localStorage.setItem("cc-votes", JSON.stringify(next));
    toast.success("Thank you for voting!");
    qc.invalidateQueries({ queryKey: pollsQuery.queryKey });
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-bold">Community polls</h1>
      <p className="mt-2 text-muted-foreground">Help the council decide what comes first. Also by SMS: text <b>VOTE 1</b> to <b>1234</b>.</p>
      {data.map((poll) => {
        const total = poll.poll_options.reduce((a, o) => a + o.votes, 0);
        return (
          <section key={poll.id} className="mt-8 rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-2xl font-bold">{poll.question}</h2>
            <div className="mt-5 space-y-3">
              {poll.poll_options.map((o, i) => {
                const pct = total ? Math.round((o.votes / total) * 100) : 0;
                return voted[poll.id] ? (
                  <div key={o.id}>
                    <div className="flex justify-between text-sm"><span>{o.label}</span><span className="font-semibold">{pct}%</span></div>
                    <div className="mt-1 h-2.5 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} /></div>
                  </div>
                ) : (
                  <button key={o.id} onClick={() => vote(poll.id, o.id)} className="flex w-full items-center gap-3 rounded-lg border border-border px-4 py-3 text-left hover:border-primary hover:bg-primary/5">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-secondary text-sm font-bold">{i + 1}</span>{o.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{total.toLocaleString()} votes so far</p>
          </section>
        );
      })}
    </main>
  );
}
