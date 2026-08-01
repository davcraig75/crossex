# Crossex: an advisory review

**Convened:** 31 July 2026
**Chair:** Claude (Fable 5), acting as engineer-of-record for the July 2026 work
**Purpose:** answer one question — *what is this tool for, and what would make it matter?*

---

## 0. How to read this

You asked me to think hard, then to convene advisors, hold a meeting, record it, and end
with recommendations. That is what follows.

The advisors are constructs. I built five of them deliberately so they would *disagree*,
because a board that agrees is a mirror, and you do not need another mirror — you have a
README full of things you already believe. Each one is a compression of a real professional
posture I can argue from. Where they conflict, I have left the conflict in. Where they were
wrong, I say so.

Three things I want to be honest about up front:

1. **I have a conflict of interest.** I wrote a large fraction of the code under review this
   month. My instinct is to defend it. I have tried to correct for that, and one advisor
   exists mostly to attack my work.
2. **I added technical debt this month**, not just features. That shows up in the meeting
   and I do not dodge it.
3. **The most useful section is §7, not §5.** The recommendations matter more than the
   theater. If you read one page, read §7.

---

## 1. Evidence brief (prepared before the meeting)

### 1.1 What the artifact actually is

A single-page exploratory analysis environment built on Vega, distributed five ways: a
standalone site, an embeddable `<script>` widget, a GitHub Pages build, an Electron app, and
an R htmlwidget. Everything runs client-side. No account, no upload, no server dependency.

As of this review it does automatic chart selection from column types, ~30 chart forms,
faceting, filtering, sampling to 5M rows, correlation and summary statistics, formula
columns, reshape/join/dedupe with undo history, data-quality profiling with type overrides,
on-chart direct editing, a multi-dataset dashboard builder with a published/locked mode, and
shareable URL state.

### 1.2 Signals from the repository itself

The repo is more revealing than the README. Bundled sample data includes `SOD1.csv` (the ALS
gene), `clinical_subset.csv`, `trgn.demo.csv` / `trgn599.clinical.csv` (TRGN — translational
genomics coursework), and `orien.json` (ORIEN, the Oncology Research Information Exchange
Network). First commit May 2021.

**Inference:** this tool was not born as a general BI product. It was born in translational
cancer research and genomics teaching, where someone repeatedly needed to hand a
non-programmer a dataset and let them look at it — and could not upload that dataset
anywhere. Five years of work has generalized it, but the DNA is visible.

That inference drives most of what follows. I flag it as inference, not fact.

### 1.3 The competitive picture

| Tool | Shape | Where it needs to run | Stars |
|---|---|---|---|
| **PyGWalker** | Tableau-style UI over a dataframe | Python + Jupyter/Streamlit | ~15.7k |
| **Graphic Walker** | Embeddable React analytics component | A React build | — |
| **Rath** | AI-automated EDA | Hosted app / local install | ~4.7k |
| **Observable / Plot** | Notebook + grammar library | Notebook or JS build |  — |
| **Tableau / Looker / Flourish** | Hosted BI / storytelling | A service, with upload | — |
| **crossex** | Full explorer | **A browser tab. Nothing else.** | small |

Every serious competitor assumes a runtime someone else has to install or a service someone
else has to trust. Crossex assumes a file and a tab. That is the whole strategic asset, and
it is currently buried under a feature list.

### 1.4 Honest weaknesses

- **The Vega spec is a 130KB single-line JSON monolith.** Every change this month — mine
  included — was made by writing throwaway Python that surgically patches JSON paths. This
  works and it is *not sustainable*. It is the single biggest barrier to anyone else ever
  contributing.
- **No visual regression testing.** I verified this month's work by rendering screenshots and
  *looking at them*. That caught real bugs, and it does not scale past me.
- **No package registry presence.** Not on npm. R package prepared for CRAN but not there.
- **No citable identifier.** No DOI, no `CITATION.cff`.
- **Positioning is absent.** The landing page (which I simplified twice this month) still
  leads with capability, not with a job.
- **Bug archaeology is revealing.** This month I found: a `Count` formula that silently
  clamped negative sums to zero, a histogram that ignored `Sum By` while its axis title
  claimed otherwise, a clip rectangle that erased an entire axis, and a corrupted row in the
  bundled penguins data. These are the fingerprints of a tool that has been *extended* for
  five years faster than it has been *tested*.

---

## 2. The board

**Dr. Amara Osei** — Director of research computing at a comprehensive cancer center.
Runs the group that tells investigators "no, you cannot put that in a Google Sheet."

**Ben Kwan** — Developer-tools founder, previously maintained a widely used OSS
visualization library. Thinks in wedges and distribution.

**Sofia Reyes** — Staff visualization engineer, grammar-of-graphics background, has shipped
chart engines at scale. Reads specs the way other people read prose.

**Marcus Hale** — Product design lead. Has killed more features than he has shipped and
considers that his best work.

**Nadia Petrov** — Operator and investor. Her job in this room is to ask the question nobody
wants asked.

---

## 3. The meeting

### 3.1 Opening: what is this?

**Chair:** The question on the table is not "is this good software." It is "what is it for."
The owner has five years in and is deciding what to do with it.

**Hale:** Then I'll start with the uncomfortable part. I opened the app cold. I counted eight
tabs, four overlay views, a dashboard builder, and something like thirty chart forms. I could
not tell you in one sentence what it is *for*. It's a Swiss Army knife presented as a Swiss
Army knife. Nobody buys a Swiss Army knife because it has thirty tools; they buy it because
they're going camping.

**Kwan:** Agreed on the symptom, disagree on the cause. This isn't feature sprawl for its own
sake — the features are *coherent*, they're just unranked. Somewhere in there is one thing it
does that nothing else does. The job is to find it and lead with it.

**Osei:** I can tell you what it does that nothing else does, because I have this problem
every week. An investigator has a clinical dataset. It is under an IRB protocol. She wants to
look at it, and she wants her collaborator across the country to look at the same view. Her
options today are: upload it to a service — which is a protocol violation, so no; install
Python and learn pandas — she has a lab to run, so no; or send a static PNG and a sentence
describing what she saw. She sends the PNG. Every time.

**Petrov:** And crossex solves that?

**Osei:** Crossex is the only thing I've seen that could. It's a file and a tab. No install,
no upload, no account, nothing crosses the network. That's not a feature to me, that's the
entire reason I'd be allowed to deploy it.

**Reyes:** I want to reinforce that from the engineering side, because it's not an accident.
Client-side-only is a *constraint you cannot retrofit*. Tableau cannot become this. PyGWalker
cannot become this without abandoning Python. Anyone who wants to compete has to rebuild from
zero. That's a real moat, and it's the only real moat here.

### 3.2 The disagreement: who is it for?

**Kwan:** Here's where I'll push back on Amara. Research computing is a beautiful use case
and a terrible market. Long sales cycles, no budget, no viral loop, and your users are
measured on papers, not tools. If the goal is adoption, the wedge is developers: ship it on
npm, make `crossex(df)` a one-liner in every JS notebook, and compete with PyGWalker on the
axis where you win — no Python required.

**Osei:** "No budget" is doing a lot of work in that sentence. My center spends real money on
software. What we don't do is spend it quickly.

**Kwan:** Which is the same thing on a two-year horizon.

**Hale:** You're both answering "market." I'm asking about *story*. Ben's version has a story:
"Tableau in a script tag." Amara's has a better one: "the analysis you can hand someone."
Neither of those is currently on the landing page.

**Petrov:** Let me ask the only question I care about. If crossex disappeared tonight — repo
gone, site down — who notices by Friday?

*(silence)*

**Chair:** Honestly? Based on the repo, a genomics course and its instructor.

**Petrov:** Then everything Ben just said about markets is premature. You don't have a
distribution problem, you have an *existence-of-users* problem. Those need different medicine.
Distribution problems get fixed with npm and docs. Existence problems get fixed by finding
ten people with the pain and watching them fail to use it.

**Osei:** I'll volunteer that I could name ten tomorrow. That's not a hypothetical.

**Petrov:** Then that's your answer, and it isn't "developers." Go where the pain is already
diagnosed.

### 3.3 Reyes on the architecture

**Reyes:** Can I talk about the thing that will actually kill this? Not the market. The spec.

**Chair:** Go ahead. It's my mess too.

**Reyes:** There's a 130-kilobyte JSON file on one line. It's the entire visual grammar of the
product. I read this month's commits. Every single change — the pie family, the Gantt, the
waterfall, the ridgeline — was made by writing a Python script that walks JSON paths, asserts
on the current structure, mutates it, and writes it back.

**Chair:** That's accurate.

**Reyes:** It's *clever*. The assertions are genuinely good discipline — they turn silent
structural drift into loud failures, and I'd keep that idea. But step back. You have built a
system where the only way to make a change is to write a program that rewrites a program. The
number of humans on Earth who will do that for free is zero. You have a bus factor of one, and
the one is a language model.

**Hale:** That's the sharpest thing said today.

**Reyes:** And it compounds. The bugs found this month are the tell — negative sums silently
zeroed, a histogram ignoring the aggregation its own axis label advertised, a clip rectangle
that deleted an axis. None of those are dumb mistakes. They're what happens when the source of
truth is unreadable, so nobody can see the contradiction. You don't get those bugs in a
codebase you can read.

**Kwan:** What's the fix?

**Reyes:** Decompose it. The spec should be authored as maybe fifteen source modules — scales,
the scatter subtree, the box family, the part-of-whole family — composed by a build step into
the artifact Vega consumes. Same output, readable input. It's a week of unglamorous work and
it's the highest-leverage week available, because it's the precondition for every other
person who might ever help.

### 3.4 On the month's additions

**Petrov:** The chair shipped ten new chart types this month. Was that the right call?

**Reyes:** Half of it, yes. The part-of-whole family is well-designed — one Layout selector
over one aggregation, seven representations, and the panel hides controls that don't apply.
That's a real idea, not a pile. The Gantt is a genuinely different data shape and it earns its
place.

**Hale:** And the other half?

**Reyes:** The other half is inventory. Sunburst, rose, waffle, marimekko — each one is real
work, each one is correct, and I don't believe the marginal user was blocked on any of them.

**Chair:** In defense: they were requested directly.

**Petrov:** Requests from an owner deciding what to do with a product are not user demand.
They're the owner exploring. That's legitimate — it's just not evidence.

**Hale:** Here's my version of the same point. The best thing shipped this month wasn't a
chart. It was the published-dashboard mode — design vs. view, right-click to edit, the lock.
That's a *workflow*, and it's the first feature I've seen here that implies a second person.
Everything else assumes one analyst alone. That one assumes an audience.

**Osei:** That's exactly right, and I'd go further. The second-best thing was the example
library built today: nine real datasets with sources, licenses, and a machine-checked claim
about which chart each produces. That's not a demo. In my world that's *documentation of
correctness*, and it's the thing that would survive a procurement review.

### 3.5 Converging

**Chair:** Let me try to state where we are. Nadia says find users before markets. Amara has
users. Ben says the moat is embeddability, Sofia says the moat is client-side-only, and I
think those are the same claim from two directions. Marcus says none of it matters until
there's a sentence. Sofia says none of it matters if nobody can edit the spec.

**Kwan:** I'll concede the sequencing. Research first, developers later — but build it so the
developer path stays open. Don't make research-specific choices you can't undo.

**Hale:** Then give me the sentence and I'll stop complaining.

**Osei:** "An analysis you can hand someone — no upload, no install, no expiry."

**Hale:** *That's* a product. That's also, notably, not what the site says.

**Petrov:** And it implies a deliverable that doesn't exist yet. If the promise is "hand
someone," the artifact is a *file*. Not a URL — a file. URLs rot, get blocked, expire, and
leak what you looked at. A self-contained HTML file with the data and the engine inside it
does not.

**Reyes:** That's technically very close. Share links already encode state and data; the
single-file export is mostly a packaging problem, not an engine problem.

**Chair:** So the product is: open data, explore it, export one HTML file that anyone can open
forever, offline, with the explorer intact.

**Osei:** If that existed I would put it in front of investigators this quarter.

**Petrov:** Then that's the thing. Everything else is a feature.

---

## 4. Where the board did not agree

I am recording these rather than resolving them, because they are live.

1. **Research-first vs. developer-first.** Kwan never fully conceded; he holds that the
   research path is slow enough to starve the project of the feedback that makes it good. His
   fallback — "keep the developer path open" — is a truce, not agreement.
2. **Whether to decompose the spec now or later.** Reyes wants it before any more features.
   Hale wants the positioning fixed first, on the grounds that a well-architected tool nobody
   understands is still nobody's tool. I lean Reyes, narrowly, because positioning work is
   cheap to redo and architecture work gets more expensive every month.
3. **Whether the 5M-row capability is an asset.** Kwan thinks it's a credibility signal.
   Reyes thinks it invites a benchmark fight against DuckDB-WASM that crossex loses, and that
   the honest ceiling is "comfortably bigger than Excel," which is a much better promise.

---

## 5. What I think the board got wrong

Three corrections from the chair.

**On Petrov's "who notices by Friday."** It is the right question and she over-applied it.
Tools with one committed user and a real constraint are exactly how durable software starts;
the failure mode she's describing is tools with one user and *no* constraint. Crossex has a
constraint — data that cannot move — and that is different.

**On Hale's feature-sprawl critique.** He under-weighted the relevance engine. Crossex hides
every control that cannot affect the visible chart. That is an unusual and genuinely good idea
— it means the interface's apparent complexity is a function of *your data*, not of the
product. The sprawl he perceived is partly a landing-page failure, not an interface failure.

**On my own work.** I said in the room that the chart types were requested. That's true and
it's a weak defense. The stronger, more honest read is Petrov's: an owner asking "can it do X"
while deciding a product's fate is exploring, not specifying. I should have said so at the
time instead of building ten of them.

---

## 6. What I would cut

Cutting is a recommendation, so it gets its own section.

- **Stop adding chart types.** Full stop, for now. Thirty forms is past the point where
  another one changes anyone's decision, and each one adds documentation, test, and rendering
  surface forever.
- **Deprioritize the 3D view and the pivot table.** Both are demos of capability rather than
  parts of a workflow. Neither appears in a sentence anyone would say about why they use this.
- **Retire the "5M rows" headline.** Replace it with an honest, tested ceiling and a
  statement about what happens past it. The current claim invites the wrong comparison.
- **Do not build Venn/Euler or the dendrogram** that the roadmap lists. Both need bespoke
  layout math for narrow payoff. If clustering matters, it belongs in the statistics surface,
  not the chart menu.

---

## 7. Recommendations

Sequenced. Each has a definition of done.

### Move 1 — Make the artifact real (2–4 weeks)

**Ship single-file export.** One menu item: *Export standalone explorer (.html)*. Output is
one HTML file containing the data, the current settings, and the engine. Opens offline, in any
browser, with no network, forever.

This is the product. Everything crossex already does becomes the *authoring tool* for this
artifact. Share links stay for convenience, but the file is the promise, because a file
survives link rot, network blocks, and the institution's proxy.

*Done when:* a colleague with no install and no internet opens the file and explores the data.

### Move 2 — Say what it is (1 week, concurrent)

Rewrite the landing page around one sentence — Osei's, or better. Something like:

> **An analysis you can hand someone.** Open a table, explore it, and export a single file
> anyone can open — offline, forever. Your data never leaves the browser.

Then three proof points, then the gallery. Delete the capability list; capability is what the
tool shows once data is loaded, not what the page argues.

*Done when:* five people who have never seen it can state, after ten seconds, who it's for.

### Move 3 — Become citable and installable (2–4 weeks)

For the research audience, *citability is distribution*. This is the highest-leverage
non-obvious move available.

- `CITATION.cff` in the repo.
- A Zenodo release DOI, so every version is permanently citable.
- A **JOSS** (Journal of Open Source Software) submission. JOSS exists precisely for research
  software; acceptance is a peer-reviewed, indexed, citable paper. For an audience measured in
  publications, this converts the tool from "a thing someone made" into "a thing you can cite
  in methods." I consider this the single highest-return item in this document relative to
  its cost.
- Publish to **npm** (`crossex`) and to **r-universe**, then CRAN when ready. The R package is
  already prepared; finishing it is cheap.

*Done when:* a methods section can read "…explored using crossex (DOI: …)."

### Move 4 — Pay the architectural debt (2–3 weeks)

Reyes is right and this is the precondition for a second contributor.

- Decompose the Vega spec into ~15 authored source modules composed by the build. Keep the
  assertion discipline — make it a schema check in the build rather than ad-hoc scripts.
- Add **visual regression baselines** for the chart matrix. This month proved that screenshot
  review catches real bugs; automate it so it doesn't depend on someone looking.
- Move parsing and column typing to a **Web Worker**, which the roadmap already identifies.

*Done when:* a stranger can add a chart type by editing a readable file and running the build.

### Move 5 — Find the ten users (ongoing, start now)

Nadia's medicine. Ten investigators with data that cannot move. Watch them use it without
help. Instrument nothing; just watch. The failures in the first ten minutes are the roadmap
for the next six months, and they will not be the failures any of us predicted in that room.

---

## 8. If you decide it is not a product

This is a real option and it deserves respect rather than being a consolation prize.

Crossex is an unusually complete piece of teaching infrastructure. It renders thirty chart
forms from column types, which means it can *show* a student why a violin plot and a box plot
answer different questions using their own data, with no install, in a browser, in a computer
lab with no admin rights. The example library built today — Nightingale's actual cholera-era
mortality data driving the rose chart that she invented — is a curriculum artifact, not just a
demo.

If the answer is "this is how I teach data exploration, and it's excellent at that," then
Moves 1, 2, and 3 still apply and Move 4 becomes optional. That is a coherent, honorable, and
much cheaper destination. It just needs to be chosen rather than defaulted into.

---

## 9. The chair's closing note

You said this might be my legacy, and asked me to work harder if I did not think I would
impress you. So, plainly:

The thing I am proudest of this month is not any chart. It is the example library and its
verification harness — nine real datasets, every one with a named source and license, and
twenty-four claims about which chart each mapping produces, every one of them *executed and
checked* rather than asserted. Documentation that cannot lie to you is rare, and that is the
piece I would want to be judged on.

The thing I am least proud of is that I spent this month making a 130KB single-line JSON file
larger and harder to read, using scripts I threw away, and I did not say so until an advisor I
invented forced the issue. That is real debt and I added to it knowingly.

My honest read, in one paragraph: **you have built the only serious exploratory analysis
environment that needs nothing but a browser tab, and you have been describing it as a chart
tool.** The chart tool market is crowded and you will not win it. The "analysis you can hand
someone, that never leaves your machine, that still opens in ten years" space is nearly empty,
you have most of the hard parts already built, and you are — judging by the ORIEN and TRGN
files in your own repo — standing in the exact room where that problem is felt most acutely.
Build the single-file export, say that sentence on the front page, get a DOI, and put it in
front of ten investigators.

If that lands, everything in §7 is worth doing. If it doesn't land after ten honest attempts,
§8 is a good life for it, and five years will not have been wasted either way.

— Chair, 31 July 2026
