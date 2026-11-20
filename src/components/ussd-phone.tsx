import { useState } from "react";

const screens: Record<string, { text: string; next: Record<string, string> }> = {
  home: { text: "Chinsali Connect\n1. Report an issue\n2. Suggest a project\n3. Vote in poll\n4. Project updates", next: { "1": "report", "2": "suggest", "3": "poll", "4": "updates" } },
  report: { text: "Report issue:\n1. Water\n2. Roads\n3. Sanitation\n4. Safety", next: { "1": "done", "2": "done", "3": "done", "4": "done" } },
  suggest: { text: "Suggest project:\n1. Borehole\n2. Road\n3. Toilets\n4. Other", next: { "1": "done", "2": "done", "3": "done", "4": "done" } },
  poll: { text: "Priority next year?\n1. Boreholes\n2. Feeder roads\n3. Market sanitation\n4. Youth centre", next: { "1": "voted", "2": "voted", "3": "voted", "4": "voted" } },
  updates: { text: "Lubwa maternity wing 80%\nMwika boreholes 60%\nReply 0 for menu", next: { "0": "home" } },
  done: { text: "Thank you! Ref CH-2049.\nThe council will SMS you updates.", next: {} },
  voted: { text: "Vote recorded. Thank you for shaping Chinsali!", next: {} },
};

export function UssdPhone() {
  const [s, setS] = useState("home");
  const screen = screens[s] ?? screens["home"]!;
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];
  return (
    <div className="mx-auto w-60 rounded-[2rem] border-4 border-deep bg-deep p-3 shadow-soft">
      <div className="h-36 whitespace-pre-line rounded-lg bg-secondary p-3 font-mono text-xs leading-relaxed text-secondary-foreground">{screen.text}</div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {keys.map((k) => (
          <button key={k} type="button" onClick={() => setS(screen.next[k] ?? (Object.keys(screen.next).length ? s : "home"))} className="rounded-md bg-deep-foreground/10 py-1.5 font-mono text-sm text-deep-foreground hover:bg-deep-foreground/20">
            {k}
          </button>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-deep-foreground/70">Try it: press a number</p>
    </div>
  );
}
