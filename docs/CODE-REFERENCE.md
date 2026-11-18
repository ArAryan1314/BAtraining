# Code reference

## Topic pages (`components/topic`, `components/illustrations`)

Every public inner page (`/jira`, `/banking`, `/roadmap` ...) is data in `content/topics` rendered by `TopicPage`.

| File | What it does |
| --- | --- |
| `illustrations/TopicArt.tsx` | Vector artwork drawn in code. 12 scenes (path, growth, documents, dashboard, kanban, network, flow, table, skyline, target, chat, layers) x 6 colour sets. `artSpec(slug)` gives each page its own scene + colours (steps through the page list, so no two pages match). `artSceneFor(slug, step)` gives the pictures further down the page, always different scenes from the banner and each other. |
| `topic/look.ts` | `topicLook(slug)`: the page's colour theme class, background pattern (9), section divider shape (4), concept-list style (cards / zigzag / banded / centered), step style (rail / alternating) and left-right flip. Derived from the page's position in the list. |
| `topic/TopicPattern.tsx` | SVG repeating background patterns (grid, dots, diagonal, waves, rings, chevrons, crosses, circuit, triangles). |
| `topic/SectionFlow.tsx` | Stacks a page's sections as coloured bands (white / tint / soft / dark / brand), adds a divider in the page's shape wherever the colour changes, and lays the pattern on tinted and dark bands. |
| `topic/TopicSections.tsx` | Section contents: overview, concepts (4 list styles), outcomes, steps (2 styles), example, deliverables (2 styles), A-Z glossary grouped by letter, FAQ, related topics (each card carries that page's artwork). `SectionArt` is the picture helper. |
| `topic/TopicHero.tsx` | Shared banner; uses the page's pattern and flips sides on alternate pages. |
| `topic/layouts/*` | Learn, Career, Resource layouts; `TopicPage.tsx` holds Platform. Each page is wrapped in its theme class. |
| `app/globals.css` | `.theme-emerald/-amber/-rose/-violet/-sky` remap the `primary-*` colours for a whole page. |

Tests: `tests/topic-art.test.ts`, `tests/topic-art-purity.test.ts`, `tests/topic-look.test.ts`.

## Dashboards and review data

Three role dashboards (admin, trainer, learner) plus the trainer learner report. Every figure is compared with the previous period where that makes sense, and every chart has an accessible label and prints its numbers (nothing relies on colour alone).

### Data shaping: `lib/analytics/series.ts` (pure, unit-tested)

| Function | Use |
| --- | --- |
| `bucketByDay`, `sumByDay` | Daily counts or totals for the last N days, oldest first. |
| `trend(series, window)` | Last window vs the window before: `{ current, previous, change }`; `change` is `null` when there was nothing before. |
| `histogram(values, edges)` | Score ranges (0-39, 40-59 ...), last bucket includes its top edge. |
| `funnel(stages)` | Each stage's share of the first stage and of the previous stage. |
| `activityGrid(dates, weeks)` | Contribution-calendar cells, Monday-first, shaded 0-4. |
| `riskOf`, `daysSince` | Learner status from days idle: on-track (<4), slowing (4-6), stalled (7+), inactive (never). |

### Queries: `services/dashboards/index.ts`

- `getAdminDashboard`: totals, 30-day series and trends (activity, enrolments, revenue, active learners), learner-journey funnel (enrolled, completed a lesson, 50%, finished, certified), quiz distribution, course performance table (enrolled, finished, progress, quiz average), review workload (ungraded assignments, pending projects, oldest wait, graded and feedback in 30 days), role mix, 8-week activity heat map, recent audit entries.
- `getTrainerDashboard`: scoped to the trainer's cohorts. Review queue (oldest first, overdue at 3+ days), engagement series and trend, learner health counts, at-risk and top learners, course progress, quiz distribution, feedback given in 30 days and the latest notes.
- `getStudentDashboard`: progress and streak, 16-week activity calendar, 14-day trend, recent quiz scores and pass rate, assignment average, upcoming and overdue assignments, latest trainer feedback.
- Existing fields were kept, so older callers keep working.

### Charts: `components/charts` (no dependencies, SVG)

`Sparkline`, `Delta` (change badge), `AreaChart`, `RingGauge`, `Donut` (with a full legend), `FunnelChart`, `ColumnChart`, `HeatCalendar`. Colours come from `tones.ts` (full class names so Tailwind sees them) and the `primary` tone follows the page theme.

### Dashboard parts: `components/dashboard`

`KpiTile` (value + change vs previous period + sparkline), `ReviewQueue` (waiting submissions with age and overdue flag), `FeedbackList`, `ChartCard`, `ProgressOverview` (now uses `RingGauge`).

### Screens

| File | Layout |
| --- | --- |
| `components/admin/AdminDashboard.tsx` | KPI row, activity chart + learner funnel, review/quiz/completion cards, course performance table, heat map + role donut + audit feed, shortcuts. |
| `components/trainer/TrainerDashboard.tsx` | Header names the overdue count; KPI row, review queue + engagement chart, needs-attention + learner health + quiz results, course progress, top learners, recent feedback. |
| `components/dashboard/StudentDashboard.tsx` | Progress hero, KPI row, activity calendar + quiz trend, coming up + feedback, courses. |
| `components/trainer/TrainerReports.tsx` | Summary tiles, then one row per learner with status badge and progress bar, those who need help first. |

Tests: `tests/analytics-series.test.ts` (helpers), `tests/dashboard-render.test.ts` (charts with empty data, admin and trainer dashboards render every section).

## Planned work (specs only, no code yet)

See [SPECS.md](SPECS.md). Each feature gets its own section here when it ships, naming the files it adds and the spec ID it satisfies.
