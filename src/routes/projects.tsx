import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { projectsQuery } from "@/lib/civic";
import { ProjectCard } from "@/components/project-card";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Chinsali Connect" },
      { name: "description", content: "Ongoing, completed and planned Chinsali Town Council projects with progress and budgets." },
      { property: "og:title", content: "Chinsali development projects" },
      { property: "og:description", content: "Track progress and budgets of council projects in every ward." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  component: Projects,
});

const filters = ["all", "ongoing", "completed", "planned"];

function Projects() {
  const { data } = useSuspenseQuery(projectsQuery);
  const [f, setF] = useState("all");
  const list = f === "all" ? data : data.filter((p) => p.status === f);
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold">Projects & works</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">Every council project, its progress and its budget — published openly for residents.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((x) => (
          <button key={x} onClick={() => setF(x)} className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize ${f === x ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{x}</button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">{list.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
    </main>
  );
}
