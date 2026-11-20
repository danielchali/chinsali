import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { projectsQuery } from "@/lib/civic";
import { ProjectCard } from "@/components/project-card";
import { UssdPhone } from "@/components/ussd-phone";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "My Chinsali — Your voice in local development" },
      { name: "description", content: "Suggest projects, report issues and follow Chinsali Town Council development work — online or via *1234#." },
      { property: "og:title", content: "My Chinsali" },
      { property: "og:description", content: "Suggest projects, report issues and track development in Chinsali." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  component: Index,
});

function Index() {
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const ongoing = projects.filter((p) => p.status === "ongoing").length;
  const done = projects.filter((p) => p.status === "completed").length;
  return (
    <main>
      <section className="bg-hero text-deep-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest opacity-80">Chinsali Town Council</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight md:text-6xl">Your community. Your voice. Your Chinsali.</h1>
            <p className="mt-5 max-w-xl text-lg opacity-90">Suggest the projects your ward needs, report problems in minutes, and see exactly how development work is progressing.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/report" className="rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground hover:opacity-90">Report or suggest</Link>
              <Link to="/projects" className="rounded-full border border-deep-foreground/40 px-6 py-3 font-semibold hover:bg-deep-foreground/10">See projects</Link>
            </div>
          </div>
          <UssdPhone />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-3 gap-4 px-4 -mt-8">
        {[[ongoing, "Ongoing projects"], [done, "Completed works"], ["*1234#", "Works on any phone"]].map(([v, l]) => (
          <div key={String(l)} className="rounded-xl bg-card p-5 text-center shadow-soft">
            <p className="font-display text-3xl font-bold text-primary">{v}</p>
            <p className="text-sm text-muted-foreground">{l}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold">Development in progress</h2>
          <Link to="/projects" className="text-sm font-semibold text-primary">All projects →</Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {projects.filter((p) => p.status !== "planned").slice(0, 3).map((p) => <ProjectCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16">
        <h2 className="text-3xl font-bold">Three ways to take part</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            ["Smartphone & web", "Use this website to report, suggest projects, give feedback and vote.", "/report"],
            ["USSD — *1234#", "Dial from any phone, no data needed. Follow the simple menu.", "/report"],
            ["SMS to 1234", "Text REPORT, IDEA or VOTE followed by your message and ward.", "/polls"],
          ].map(([t, d, to]) => (
            <Link key={t} to={to as "/report"} className="rounded-xl border border-border bg-card p-6 hover:border-primary">
              <h3 className="text-xl font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
