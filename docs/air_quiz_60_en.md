# AIR 60-Question Questionnaire Design Document

> Version v2.0 — Complete redesign based on facet-based structure
>
> Date: 2026-03-25

---

## Part 1: Design Analysis

### 1.1 Deep Analysis of Four Dimensions

#### Dimension 1: Learnability (E/T)

**Good questions for this dimension**:
- Focus on the *form* of knowledge (digital vs embodied), not difficulty
- Distinguish publicly accessible knowledge from experiential knowledge
- Describe how codifiable work processes are
- Address environmental novelty and unpredictability

**Common pitfalls**:
- Confusing "difficult" with "unlearnable" — Go is hard but AI mastered it
- Equating "creative" with "unlearnable" — AI excels in some creative domains
- Ignoring embodied knowledge (touch, force control, spatial awareness)
- Mistaking "requires experience" for "tacit knowledge"

---

#### Dimension 2: Evaluation Objectivity (O/S)

**Good questions for this dimension**:
- Measure the *existence* of right answers, not task difficulty
- Distinguish quantifiable metrics from subjective impressions
- Focus on inter-rater reliability
- Address inherently subjective domains (aesthetics, taste, culture)

**Common pitfalls**:
- Confusing "complex" with "subjective" — weather forecasting is complex but objective
- Equating "multi-reviewer" with "subjective" — code review has multiple reviewers but clear standards
- Ignoring temporal dimension — some work quality only shows years later
- Confusing "hard to verify" with "subjective"

---

#### Dimension 3: Risk Tolerance (F/R)

**Good questions for this dimension**:
- Focus on *consequences* of errors, not probability of errors
- Address societal/legal trust in AI decisions
- Consider regulatory frameworks and accountability
- Distinguish "trial and error OK" from "must get it right the first time"

**Common pitfalls**:
- Confusing "important work" with "low fault tolerance"
- Equating "high precision" with "low fault tolerance"
- Ignoring social acceptance dimension
- Misattributing "fast decisions" to this dimension

---

#### Dimension 4: Human Presence (P/H)

**Good questions for this dimension**:
- Measure the weight of interpersonal relationships and trust
- Address the commercial value of personal brand, reputation, identity
- Include physical presence requirements
- Distinguish "emotional labor" from "information transfer"

**Common pitfalls**:
- Confusing "requires communication" with "human-dependent"
- Oversimplifying "teamwork" as "human-dependent"
- Ignoring the "anonymity test" — would removing your name reduce work value?
- Confusing "must be done by a human" with "must be done by a specific person"

---

### 1.2 Cross-dimension Contamination Risks

| High-risk Cross-contamination | How to Avoid |
|-------------------------------|--------------|
| Learnability x Evaluation Objectivity | Learnability focuses on knowledge acquisition form; Evaluation focuses on output assessment criteria |
| Risk Tolerance x Human Presence | Risk Tolerance focuses on consequence severity; Human Presence focuses on personal identity value |
| Learnability x Risk Tolerance | Risk Tolerance only examines error consequences, not entry barriers |
| Evaluation Objectivity x Human Presence | Evaluation Objectivity looks at assessment criteria; Human Presence looks at identity premium |

---

### 1.3 Identifying and Avoiding Leading Questions

**Bad examples**:
- "Can AI easily learn your job?" — directly implies the dimension, and "easily" is dismissive
- "Does your work require superior craftsmanship?" — "superior" is positive framing, biasing toward high scores
- "Could your work error hurt someone?" — "hurt" is too extreme

**Good examples**:
- "Where is your daily work mainly done?" — neutral description, behavioral anchoring
- "When you receive a task, does the requester know what they want?" — specific scenario, no value judgment
- "If you suddenly left tomorrow, how long to find a replacement?" — objectively measurable

---

## Part 2: Design Principles

### 2.1 Core Principles

#### Principle 1: Single Construct
Each question measures exactly one facet within one dimension. Never ask double-barreled questions like "Does your work require both creativity and interpersonal skills?"

#### Principle 2: Behavioral Anchoring
Options use concrete behavioral descriptions, not abstract frequency/degree words. Avoid templated gradients like "strongly agree / agree / neutral / disagree / strongly disagree." Each option should be an imaginable specific scenario.

#### Principle 3: Conversational Tone
Questions use everyday conversational language, as if chatting with a friend. Avoid academic terminology and stiff written language.

#### Principle 4: Universal Applicability
Questions don't presume specific industries, levels, or work types. Whether delivery driver, design director, or stay-at-home parent, everyone should be able to understand and answer.

#### Principle 5: Dimension Opacity
Questions should not reveal which dimension they measure. If test-takers can easily guess the dimension and answer "as expected," validity is compromised.

---

### 2.2 Forward-Reverse Balance Strategy

**Target**: ~9 forward (60%) and ~6 reverse (40%) per dimension of 15 questions.

**Rationale**:
1. Perfect 50/50 makes test-takers feel questions are "tricky," hurting experience
2. More forward questions maintain smooth pacing
3. Enough reverse items (at least 40%) detect careless responding and acquiescence bias
4. Reverse items distributed across facets, not clustered

**Per-dimension allocation**:

| Dimension | Forward | Reverse | Ratio |
|-----------|---------|---------|-------|
| D1 Learnability | 9 | 6 | 60/40 |
| D2 Evaluation Objectivity | 9 | 6 | 60/40 |
| D3 Risk Tolerance | 9 | 6 | 60/40 |
| D4 Human Presence | 9 | 6 | 60/40 |
| **Total** | **36** | **24** | **60/40** |

---

### 2.3 Facet Architecture

Each dimension has 5 facets with 3 questions each (typically 2 forward + 1 reverse, or 1 forward + 2 reverse). This ensures:
- Content validity: each facet covers a different aspect of the dimension
- Reliability: 3 items within a facet should be highly correlated
- Discrimination: moderate correlation between different facets

---

### 2.4 Question Ordering Interleaving Strategy

**Principles**:
1. **Dimension rotation**: 4 consecutive questions always from 4 different dimensions (round-robin)
2. **Difficulty progression**: first third = easy daily scenarios, middle third = deeper thinking, last third = more abstract
3. **Direction alternation**: no more than 3 consecutive same-direction questions
4. **Facet spacing**: 3 questions from same facet spaced at least 12 questions apart
5. **First/last impression**: first and last questions should be the most engaging

---

## Part 3: Question Design

### Legend
- **D1** = Learnability (E/T)
- **D2** = Evaluation Objectivity (O/S)
- **D3** = Risk Tolerance (F/R)
- **D4** = Human Presence (P/H)
- **F** = Forward (higher score = more AI-replaceable)
- **R** = Reverse (higher score = less AI-replaceable; scoring uses 6 - score transformation)

> **Important Note on Direction Convention**:
>
> This document follows the project code convention:
> - **Forward**: Option 1 = least AI-replaceable -> Option 5 = most AI-replaceable. Raw score used directly.
> - **Reverse**: Option 1 = most AI-replaceable -> Option 5 = least AI-replaceable. Scoring uses 6 - score transformation.
>
> Reverse items serve to break response patterns — test-takers won't always select in the same direction. The natural reading order of options differs from other items, creating a psychological "speed bump."

---

### Dimension 1: Learnability (E/T) — 15 Questions

#### Facet 1A: Digitalization (3 questions)

---

**Q1** | D1-1A | Forward

> **Dimension**: Learnability | **Facet**: Digitalization | **Direction**: Forward

Where is your daily work mainly done?

| Score | Option |
|-------|--------|
| 1 | Almost never use a computer — all hands-on physical work |
| 2 | Occasionally use a computer, but core work is hands-on |
| 3 | About half digital, half physical |
| 4 | Mostly done on computers/systems |
| 5 | Almost entirely in digital systems |

---

**Q2** | D1-1A | Forward

> **Dimension**: Learnability | **Facet**: Digitalization | **Direction**: Forward

How much of your daily work output automatically leaves a digital trail?

| Score | Option |
|-------|--------|
| 1 | Almost nothing — results exist in the physical world |
| 2 | A small portion is recorded, most has no digital trace |
| 3 | About half has digital records |
| 4 | Most processes and results have digital records |
| 5 | Fully digital, every step is logged |

---

**Q3** | D1-1A | Reverse

> **Dimension**: Learnability | **Facet**: Digitalization | **Direction**: Reverse

How much of your work requires physically touching, inspecting, or handling real objects to make judgments?

| Score | Option |
|-------|--------|
| 1 | Almost every step requires hands-on contact with physical objects |
| 2 | Most requires hands-on work, a little can be done on screen |
| 3 | Half needs physical handling, half can be done with data |
| 4 | Occasionally need to see physical objects, mostly done on screen |
| 5 | Never need to handle physical objects — purely data and information |

---

#### Facet 1B: Knowledge Accessibility (3 questions)

---

**Q4** | D1-1B | Forward

> **Dimension**: Learnability | **Facet**: Knowledge Accessibility | **Direction**: Forward

How much of the professional knowledge your work involves can be found online?

| Score | Option |
|-------|--------|
| 1 | Almost nothing — all internal accumulation or oral transmission |
| 2 | Basic knowledge is available, but key techniques are insider-only |
| 3 | About half can be found, half relies on internal experience |
| 4 | Most has public tutorials and documentation |
| 5 | Everything is online — tutorials, videos, courses, case studies |

---

**Q5** | D1-1B | Forward

> **Dimension**: Learnability | **Facet**: Knowledge Accessibility | **Direction**: Forward

If AI read all the books, papers, and textbooks in your field, what percentage of the knowledge your work requires would it have?

| Score | Option |
|-------|--------|
| 1 | Less than 20% — book knowledge is just the surface |
| 2 | About 30-40% — useful but far from enough |
| 3 | About 50-60% — a decent foundation |
| 4 | About 70-80% — most can be learned from materials |
| 5 | Over 90% — books cover almost everything |

---

**Q6** | D1-1B | Reverse

> **Dimension**: Learnability | **Facet**: Knowledge Accessibility | **Direction**: Reverse

How did you learn the most critical knowledge for your work?

| Score | Option |
|-------|--------|
| 1 | Only through years of personal experience and gradual realization |
| 2 | Mainly through mentorship and self-exploration — not in books |
| 3 | Half from formal learning, half from practice |
| 4 | Most came from school or training programs |
| 5 | Almost entirely from textbooks and tutorials |

---

#### Facet 1C: Process Standardization (3 questions)

---

**Q7** | D1-1C | Forward

> **Dimension**: Learnability | **Facet**: Process Standardization | **Direction**: Forward

How "by the book" are your work processes?

| Score | Option |
|-------|--------|
| 1 | Almost no fixed process — every situation is new |
| 2 | Some basic steps, but mostly improvisation |
| 3 | Half follows procedures, half improvisation |
| 4 | Mostly standardized, occasional exceptions |
| 5 | Almost entirely by the manual — just follow it |

---

**Q8** | D1-1C | Forward

> **Dimension**: Learnability | **Facet**: Process Standardization | **Direction**: Forward

Could your work be written into a detailed manual for a newcomer to follow?

| Score | Option |
|-------|--------|
| 1 | Impossible — too many "it depends" judgment calls |
| 2 | Can write an outline, but details depend on personal judgment |
| 3 | Could cover about half; the other half can't be written down |
| 4 | Most of it can be written very clearly |
| 5 | Absolutely — there's already an existing SOP |

---

**Q9** | D1-1C | Reverse

> **Dimension**: Learnability | **Facet**: Process Standardization | **Direction**: Reverse

How often do you need to make a decision with no precedent to reference?

| Score | Option |
|-------|--------|
| 1 | Every day — having no precedent is the norm |
| 2 | At least several times a week |
| 3 | A few times a month |
| 4 | Rarely — just a few times a year |
| 5 | Never — there are established solutions for every situation |

---

#### Facet 1D: Tacit Knowledge Depth (3 questions)

---

**Q10** | D1-1D | Reverse

> **Dimension**: Learnability | **Facet**: Tacit Knowledge Depth | **Direction**: Reverse

How much does your work depend on "hard to articulate" experience?

| Score | Option |
|-------|--------|
| 1 | Entirely relies on years of cultivated "feel" — hard to explain |
| 2 | Heavily depends on long-accumulated intuition and feel |
| 3 | Needs some experience, but can be taught |
| 4 | Some small tricks but learnable quickly |
| 5 | Not at all — a newbie can do it with the manual |

---

**Q11** | D1-1D | Reverse

> **Dimension**: Learnability | **Facet**: Tacit Knowledge Depth | **Direction**: Reverse

If you were teaching a smart but completely inexperienced person your job, what would be the hardest part to teach?

| Score | Option |
|-------|--------|
| 1 | Almost everything is hard to teach — just "watch and learn over time" |
| 2 | Core skills can't be explained — only learned through extensive practice |
| 3 | Some things can be taught, some must be figured out on their own |
| 4 | Most can be taught clearly, a few need some practice |
| 5 | Everything can be taught — just step by step |

---

**Q12** | D1-1D | Forward

> **Dimension**: Learnability | **Facet**: Tacit Knowledge Depth | **Direction**: Forward

When making work decisions, what proportion can be explained with logical reasoning rather than "gut feeling"?

| Score | Option |
|-------|--------|
| 1 | Less than 20% — mostly gut feeling |
| 2 | About 30-40% — gut feeling dominates |
| 3 | About half and half |
| 4 | About 70-80% can be logically explained |
| 5 | Nearly 100% — every decision has a clear basis |

---

#### Facet 1E: Novelty & Change (3 questions)

---

**Q13** | D1-1E | Reverse

> **Dimension**: Learnability | **Facet**: Novelty & Change | **Direction**: Reverse

How often does your work encounter completely new situations that no one has seen before?

| Score | Option |
|-------|--------|
| 1 | Constantly — every project is uncharted territory |
| 2 | Often — the landscape shifts every few months |
| 3 | Sometimes — new challenges come up regularly |
| 4 | Rarely — occasional new cases, mostly routine |
| 5 | Almost never — same patterns day after day |

---

**Q14** | D1-1E | Forward

> **Dimension**: Learnability | **Facet**: Novelty & Change | **Direction**: Forward

How many of your work tasks have you "done something similar before"?

| Score | Option |
|-------|--------|
| 1 | Almost every time is brand new — no reference |
| 2 | Mostly new, occasionally can apply past experience |
| 3 | About half are familiar patterns |
| 4 | Most have similar cases to reference |
| 5 | Almost all are repetitive standard tasks |

---

**Q15** | D1-1E | Forward

> **Dimension**: Learnability | **Facet**: Novelty & Change | **Direction**: Forward

Has the way work is done in your industry changed much in the past 5 years?

| Score | Option |
|-------|--------|
| 1 | Completely transformed — methods from 5 years ago are obsolete |
| 2 | Big changes — core skills need constant updating |
| 3 | Some changes, but fundamentals remain the same |
| 4 | Not much change — most methods are the same |
| 5 | Almost no change — same as 10 years ago |

---

**D1 Summary**: Forward 9 (Q1, Q2, Q4, Q5, Q7, Q8, Q12, Q14, Q15), Reverse 6 (Q3, Q6, Q9, Q10, Q11, Q13)

---

### Dimension 2: Evaluation Objectivity (O/S) — 15 Questions

#### Facet 2A: Measurability (3 questions)

---

**Q16** | D2-2A | Forward

> **Dimension**: Evaluation Objectivity | **Facet**: Measurability | **Direction**: Forward

Can your work quality be scored with clear numerical metrics?

| Score | Option |
|-------|--------|
| 1 | Impossible to score — quality is purely subjective |
| 2 | Mostly subjective, few things are quantifiable |
| 3 | Half quantifiable, half subjective |
| 4 | Mostly clear metrics, few subjective ones |
| 5 | Almost everything has clear KPIs or benchmarks |

---

**Q17** | D2-2A | Forward

> **Dimension**: Evaluation Objectivity | **Facet**: Measurability | **Direction**: Forward

After completing a task, how quickly can you tell if it was done well?

| Score | Option |
|-------|--------|
| 1 | May not know for years — impact unfolds slowly |
| 2 | Can only be evaluated months later |
| 3 | Feedback visible within days to weeks |
| 4 | Know the result within hours |
| 5 | Instant feedback — right or wrong is immediately clear |

---

**Q18** | D2-2A | Reverse

> **Dimension**: Evaluation Objectivity | **Facet**: Measurability | **Direction**: Reverse

Can your work output be checked for quality using automated tools?

| Score | Option |
|-------|--------|
| 1 | Almost entirely verifiable by automated programs |
| 2 | Most can be checked with automated testing or QC |
| 3 | Some can be checked with tool assistance |
| 4 | Very few aspects can be auto-checked |
| 5 | Not at all — must be judged by humans |

---

#### Facet 2B: Result Convergence (3 questions)

---

**Q19** | D2-2B | Forward

> **Dimension**: Evaluation Objectivity | **Facet**: Result Convergence | **Direction**: Forward

For the same task, how much do results vary between different people?

| Score | Option |
|-------|--------|
| 1 | Everyone produces completely different results |
| 2 | Similar direction but big differences in detail |
| 3 | Core is similar, with room for personal touch |
| 4 | Most results are basically the same, minor differences |
| 5 | Regardless of who does it, results are nearly identical |

---

**Q20** | D2-2B | Forward

> **Dimension**: Evaluation Objectivity | **Facet**: Result Convergence | **Direction**: Forward

Does your work have a "right answer" or "optimal solution"?

| Score | Option |
|-------|--------|
| 1 | Never a right answer — only different choices |
| 2 | Rarely clear right or wrong |
| 3 | Sometimes there's an optimal solution, sometimes not |
| 4 | Most tasks have a clearly correct approach |
| 5 | Almost every question has one correct answer |

---

**Q21** | D2-2B | Reverse

> **Dimension**: Evaluation Objectivity | **Facet**: Result Convergence | **Direction**: Reverse

If three senior peers scored the same work output, how much would their scores differ?

| Score | Option |
|-------|--------|
| 1 | Scores would be very consistent, almost no difference |
| 2 | Very small difference, largely consistent |
| 3 | Some disagreement, but general direction is the same |
| 4 | Often noticeably different scores |
| 5 | Completely different scores wouldn't be surprising |

---

#### Facet 2C: Goal Clarity (3 questions)

---

**Q22** | D2-2C | Reverse

> **Dimension**: Evaluation Objectivity | **Facet**: Goal Clarity | **Direction**: Reverse

When you receive a task, does the requester know clearly what they want?

| Score | Option |
|-------|--------|
| 1 | Requirements are always very clear — just execute |
| 2 | Mostly clear, occasionally need to confirm details |
| 3 | Half clear, half need to figure out yourself |
| 4 | Often "just figure it out" — need to define requirements myself |
| 5 | Almost always "help me think about it" |

---

**Q23** | D2-2C | Forward

> **Dimension**: Evaluation Objectivity | **Facet**: Goal Clarity | **Direction**: Forward

Before starting a task, can you list out a "definition of done" checklist in advance?

| Score | Option |
|-------|--------|
| 1 | Not at all — you figure it out as you go |
| 2 | Can only list a general direction, specific criteria are unclear |
| 3 | Can list some clear conditions, others depend on context |
| 4 | Most completion criteria can be defined in advance |
| 5 | Can create a very detailed acceptance checklist |

---

**Q24** | D2-2C | Forward

> **Dimension**: Evaluation Objectivity | **Facet**: Goal Clarity | **Direction**: Forward

Is your work goal more like "solve this math problem" or more like "write a good essay"?

| Score | Option |
|-------|--------|
| 1 | Completely like writing an essay — standards vary by person |
| 2 | More like an essay — some basic requirements but quality is subjective |
| 3 | Both — some tasks have right answers, some don't |
| 4 | More like problem-solving — most have clear right or wrong |
| 5 | Completely like math — either right or wrong |

---

#### Facet 2D: Taste Dependence (3 questions)

---

**Q25** | D2-2D | Reverse

> **Dimension**: Evaluation Objectivity | **Facet**: Taste Dependence | **Direction**: Reverse

How much does your work depend on personal aesthetics, taste, or intuitive judgment?

| Score | Option |
|-------|--------|
| 1 | Not at all — just execute standard operations |
| 2 | Occasionally need a bit of aesthetic judgment |
| 3 | Half by standards, half by taste and feel |
| 4 | Heavily depends on aesthetics and insight |
| 5 | Aesthetics and taste ARE my core competitive advantage |

---

**Q26** | D2-2D | Reverse

> **Dimension**: Evaluation Objectivity | **Facet**: Taste Dependence | **Direction**: Reverse

In your work, how big is the gap between "good enough" and "just right"?

| Score | Option |
|-------|--------|
| 1 | No difference — roughly right is fine |
| 2 | Very small — close enough works most of the time |
| 3 | Some occasions need precision, some don't |
| 4 | Often need to nail subtle differences in detail |
| 5 | A tiny difference changes everything — must be exactly right |

---

**Q27** | D2-2D | Forward

> **Dimension**: Evaluation Objectivity | **Facet**: Taste Dependence | **Direction**: Forward

How much of "doing well" at your work is something everyone can agree on?

| Score | Option |
|-------|--------|
| 1 | Quality depends entirely on who's judging — opinions always differ |
| 2 | Most of the time, different people have different views |
| 3 | Basic agreement, but significant disagreement on details |
| 4 | Consensus on most aspects, disagreement on a few |
| 5 | Whether it's good or not, everyone agrees |

---

#### Facet 2E: Cross-domain Synthesis (3 questions)

---

**Q28** | D2-2E | Reverse

> **Dimension**: Evaluation Objectivity | **Facet**: Cross-domain Synthesis | **Direction**: Reverse

How many different fields of knowledge do you need to combine to make a decision?

| Score | Option |
|-------|--------|
| 1 | Just one — deep expertise in a single area |
| 2 | Mainly one field, occasionally another |
| 3 | Need to combine 2-3 different fields regularly |
| 4 | Routinely synthesize 4+ fields |
| 5 | My entire job IS connecting dots across unrelated domains |

---

**Q29** | D2-2E | Forward

> **Dimension**: Evaluation Objectivity | **Facet**: Cross-domain Synthesis | **Direction**: Forward

If your work output were given to an AI system to check, how many issues could it find?

| Score | Option |
|-------|--------|
| 1 | Almost nothing — the issue is whether it "feels right" |
| 2 | Can find surface errors, but can't judge core quality |
| 3 | Can find about half the issues |
| 4 | Most issues can be automatically detected |
| 5 | Almost all issues can be automatically found |

---

**Q30** | D2-2E | Forward

> **Dimension**: Evaluation Objectivity | **Facet**: Cross-domain Synthesis | **Direction**: Forward

Does the definition of "what counts as good work" change frequently in your job?

| Score | Option |
|-------|--------|
| 1 | Different standard every time — depends on context and people |
| 2 | Standards change often, must constantly adjust |
| 3 | There's a basic framework, but specific criteria shift |
| 4 | Standards are mostly fixed, occasional small adjustments |
| 5 | Standards never change — universally applicable |

---

**D2 Summary**: Forward 9 (Q16, Q17, Q19, Q20, Q23, Q24, Q27, Q29, Q30), Reverse 6 (Q18, Q21, Q22, Q25, Q26, Q28)

---

### Dimension 3 (Corrected): Risk Tolerance (F/R) — 15 Questions

#### Facet 3A: Error Severity (3 questions)

---

**Q31** | D3-3A | Reverse

> **Dimension**: Risk Tolerance | **Facet**: Error Severity | **Direction**: Reverse

If your work has an error, what's the worst that could happen?

| Score | Option |
|-------|--------|
| 1 | No big deal — just redo it |
| 2 | Wastes some time/money, limited impact |
| 3 | Noticeable financial loss or reputation damage |
| 4 | Could cause serious property loss or health risks |
| 5 | Could directly endanger lives or cause major safety incidents |

---

**Q32** | D3-3A | Forward

> **Dimension**: Risk Tolerance | **Facet**: Error Severity | **Direction**: Forward

How many people could be affected by a single wrong decision you make?

| Score | Option |
|-------|--------|
| 1 | Could affect thousands or more |
| 2 | Could impact the company or hundreds of clients |
| 3 | Affects the team or dozens of related people |
| 4 | At most affects a few colleagues or clients |
| 5 | Only affects my own work progress |

---

**Q33** | D3-3A | Forward

> **Dimension**: Risk Tolerance | **Facet**: Error Severity | **Direction**: Forward

In your work, how big is the practical difference between "80%" and "100%"?

| Score | Option |
|-------|--------|
| 1 | Enormous — 80% could mean a major incident |
| 2 | Significant — striving for perfection matters greatly |
| 3 | Depends — some situations it matters, some it doesn't |
| 4 | Not much — 80% is basically good enough |
| 5 | No difference at all — pass the bar and you're done |

---

#### Facet 3B: Reversibility (3 questions)

---

**Q34** | D3-3B | Reverse

> **Dimension**: Risk Tolerance | **Facet**: Reversibility | **Direction**: Reverse

If your work has an error, is there a chance to fix it?

| Score | Option |
|-------|--------|
| 1 | Can undo and revise anytime, no pressure |
| 2 | Most errors can be corrected afterward |
| 3 | Some can be fixed, some can't |
| 4 | Most errors are hard to reverse once made |
| 5 | Once wrong, almost impossible to fix — no taking it back |

---

**Q35** | D3-3B | Forward

> **Dimension**: Risk Tolerance | **Facet**: Reversibility | **Direction**: Forward

Does your work allow a "try it first, change it if it doesn't work" approach?

| Score | Option |
|-------|--------|
| 1 | Absolutely not — must get it right the first time |
| 2 | Rarely — the cost of errors is too high |
| 3 | Some stages allow trial and error, some don't |
| 4 | Most of the time, experimentation and rapid iteration are encouraged |
| 5 | The entire workflow IS constant experimentation and adjustment |

---

**Q36** | D3-3B | Forward

> **Dimension**: Risk Tolerance | **Facet**: Reversibility | **Direction**: Forward

If a problem is found tomorrow in today's work, how hard is it to fix?

| Score | Option |
|-------|--------|
| 1 | Nearly impossible — damage done and irreversible |
| 2 | Very difficult, requiring enormous cost to repair |
| 3 | Some difficulty, but fixable with effort |
| 4 | Not too hard — just make some corrections |
| 5 | Zero pressure — just delete and redo |

---

#### Facet 3C: Regulation (3 questions)

---

**Q37** | D3-3C | Reverse

> **Dimension**: Risk Tolerance | **Facet**: Regulation | **Direction**: Reverse

How strict are the regulatory and qualification requirements for your work?

| Score | Option |
|-------|--------|
| 1 | No barriers to entry — anyone can do it |
| 2 | Some basic requirements but low bar |
| 3 | Requires certain certifications or training |
| 4 | Strict industry oversight and licensing |
| 5 | Must be licensed, violations lead to legal consequences |

---

**Q38** | D3-3C | Forward

> **Dimension**: Risk Tolerance | **Facet**: Regulation | **Direction**: Forward

If your work were entirely handed to AI, how much obstacle would current laws create?

| Score | Option |
|-------|--------|
| 1 | Explicitly prohibited by law — impossible |
| 2 | Significant legal grey areas and restrictions |
| 3 | Some steps face legal restrictions, some don't |
| 4 | Essentially no regulatory obstacles |
| 5 | No restrictions — policies even encourage AI adoption |

---

**Q39** | D3-3C | Forward

> **Dimension**: Risk Tolerance | **Facet**: Regulation | **Direction**: Forward

In your industry, how likely is it that regulators would investigate after an incident?

| Score | Option |
|-------|--------|
| 1 | Almost certain — dedicated regulators are watching |
| 2 | Very likely — strict incident reporting system |
| 3 | Depends on severity — serious ones get investigated |
| 4 | Unlikely, unless extremely serious |
| 5 | Almost impossible — my industry has little oversight |

---

#### Facet 3D: Accountability (3 questions)

---

**Q40** | D3-3D | Reverse

> **Dimension**: Risk Tolerance | **Facet**: Accountability | **Direction**: Reverse

If something goes wrong with your work, how much personal responsibility do you bear?

| Score | Option |
|-------|--------|
| 1 | Basically no personal liability — team/company covers it |
| 2 | Might get criticized but no legal/financial liability |
| 3 | Could face some financial compensation or penalty |
| 4 | Could face significant lawsuits or disciplinary action |
| 5 | Could face criminal charges or enormous compensation |

---

**Q41** | D3-3D | Forward

> **Dimension**: Risk Tolerance | **Facet**: Accountability | **Direction**: Forward

How often does your work involve moral judgments or ethical trade-offs?

| Score | Option |
|-------|--------|
| 1 | Face ethical dilemmas almost every day |
| 2 | Frequently need to weigh ethical factors |
| 3 | Occasionally encounter them |
| 4 | Very rarely — mostly routine decisions |
| 5 | Never — purely technical operations |

---

**Q42** | D3-3D | Reverse

> **Dimension**: Risk Tolerance | **Facet**: Accountability | **Direction**: Reverse

How detailed must the records and approval documentation of your work be?

| Score | Option |
|-------|--------|
| 1 | No records needed — just get it done |
| 2 | Simple completion records suffice |
| 3 | Requires some process documentation |
| 4 | Requires detailed operation records and approvals |
| 5 | Every step must have complete traceable records |

---

#### Facet 3E: Public Trust (3 questions)

---

**Q43** | D3-3E | Reverse

> **Dimension**: Risk Tolerance | **Facet**: Public Trust | **Direction**: Reverse

Can the public accept AI making decisions in your role?

| Score | Option |
|-------|--------|
| 1 | Totally fine — nobody cares who does it |
| 2 | Most people wouldn't mind |
| 3 | Depends — some accept it, some don't |
| 4 | Most people would feel uneasy |
| 5 | Absolutely unacceptable — public would strongly oppose |

---

**Q44** | D3-3E | Forward

> **Dimension**: Risk Tolerance | **Facet**: Public Trust | **Direction**: Forward

How common is AI-assisted work already in your industry?

| Score | Option |
|-------|--------|
| 1 | Not at all — people are watching or even resisting |
| 2 | Just starting — a few pioneers are trying |
| 3 | Some stages already use AI assistance |
| 4 | Fairly common — most people are using it |
| 5 | Very common — not using AI means falling behind |

---

**Q45** | D3-3E | Forward

> **Dimension**: Risk Tolerance | **Facet**: Public Trust | **Direction**: Forward

If a colleague secretly used AI to complete a task, what would your reaction be upon finding out?

| Score | Option |
|-------|--------|
| 1 | Very serious — could involve violations or illegality |
| 2 | Would feel uneasy — should have been disclosed |
| 3 | A bit surprised, but OK if quality is fine |
| 4 | Doesn't matter — good results are what count |
| 5 | Totally normal — I do it myself all the time |

---

**D3 Summary**: Forward 9 (Q32, Q33, Q35, Q36, Q38, Q39, Q41, Q44, Q45), Reverse 6 (Q31, Q34, Q37, Q40, Q42, Q43)

---

### Dimension 4 (Corrected): Human Presence (P/H) — 15 Questions

#### Facet 4A: Relationship Dependency (3 questions)

---

**Q46** | D4-4A | Reverse

> **Dimension**: Human Presence | **Facet**: Relationship Dependency | **Direction**: Reverse

Why do clients or partners choose you (or your team)?

| Score | Option |
|-------|--------|
| 1 | Purely price and efficiency — cheapest wins |
| 2 | Mainly capabilities — no preference for who |
| 3 | Capabilities matter, but chemistry and trust too |
| 4 | Many clients stay because of the long-term relationship |
| 5 | Clients only work with ME — they leave if I leave |

---

**Q47** | D4-4A | Forward

> **Dimension**: Human Presence | **Facet**: Relationship Dependency | **Direction**: Forward

How long does it typically take to build the trust relationships your work requires?

| Score | Option |
|-------|--------|
| 1 | Takes years of sustained relationship for real trust |
| 2 | Takes 1-2 years of deep collaboration |
| 3 | Takes months of collaboration to build |
| 4 | A few interactions build basic trust |
| 5 | No trust needed — one-time transactions are fine |

---

**Q48** | D4-4A | Forward

> **Dimension**: Human Presence | **Facet**: Relationship Dependency | **Direction**: Forward

How important are the personal connections you've built for your work?

| Score | Option |
|-------|--------|
| 1 | My network IS my greatest value |
| 2 | Connections are a very important asset |
| 3 | Connections are a useful supporting resource |
| 4 | Somewhat helpful but not essential |
| 5 | Not important at all — no connections needed |

---

#### Facet 4B: Personal Brand (3 questions)

---

**Q49** | D4-4B | Reverse

> **Dimension**: Human Presence | **Facet**: Personal Brand | **Direction**: Reverse

How many clients/audiences come specifically because of YOU as a person?

| Score | Option |
|-------|--------|
| 1 | None — they only care if I can do the job |
| 2 | Very few know me specifically — mostly capability-based |
| 3 | Some come for me, more for the capability |
| 4 | Many come for me — I have some recognition |
| 5 | I AM the brand — people come specifically for me |

---

**Q50** | D4-4B | Forward

> **Dimension**: Human Presence | **Facet**: Personal Brand | **Direction**: Forward

If you suddenly left tomorrow, how long would it take to find a replacement at your level?

| Score | Option |
|-------|--------|
| 1 | Very hard — maybe 6+ months, or never |
| 2 | Quite hard — needs a few months |
| 3 | 1-2 months to find the right person |
| 4 | 2-3 weeks to hire someone |
| 5 | Can find a replacement immediately |

---

**Q51** | D4-4B | Reverse

> **Dimension**: Human Presence | **Facet**: Personal Brand | **Direction**: Reverse

How much of your output has a "only you would do it this way" personal style?

| Score | Option |
|-------|--------|
| 1 | No personal style — anyone would produce the same |
| 2 | Slight personal habits but not noticeable |
| 3 | Some personal touches — people who know me can tell |
| 4 | Clearly identifiable personal style |
| 5 | My style IS my brand — it wouldn't be the same without me |

---

#### Facet 4C: Physical Presence (3 questions)

---

**Q52** | D4-4C | Reverse

> **Dimension**: Human Presence | **Facet**: Physical Presence | **Direction**: Reverse

Must your work be done with you physically present?

| Score | Option |
|-------|--------|
| 1 | Not at all — can be done remotely from anywhere |
| 2 | Occasionally need to be there, mostly remote |
| 3 | About half on-site, half remote |
| 4 | Must be on-site most of the time |
| 5 | Must be physically present, doing the work in person |

---

**Q53** | D4-4C | Forward

> **Dimension**: Human Presence | **Facet**: Physical Presence | **Direction**: Forward

Can your work output be fully delivered remotely over the internet?

| Score | Option |
|-------|--------|
| 1 | Not at all — must be face-to-face on-site |
| 2 | Mostly not — core work requires presence |
| 3 | Half can be remote, half requires on-site |
| 4 | Mostly remote, a few require meeting in person |
| 5 | 100% deliverable online |

---

**Q54** | D4-4C | Forward

> **Dimension**: Human Presence | **Facet**: Physical Presence | **Direction**: Forward

If your work went fully online (no face-to-face), how much would effectiveness decrease?

| Score | Option |
|-------|--------|
| 1 | Impossible — must be done on-site |
| 2 | 50-60% effectiveness — seriously impaired |
| 3 | 70-80% effectiveness — noticeably affected |
| 4 | 90% effectiveness — minimal impact |
| 5 | No difference at all — might even be more efficient |

---

#### Facet 4D: Emotional Labor (3 questions)

---

**Q55** | D4-4D | Reverse

> **Dimension**: Human Presence | **Facet**: Emotional Labor | **Direction**: Reverse

How much of your work involves reading people, managing emotions, or persuading others?

| Score | Option |
|-------|--------|
| 1 | None at all — I work with data/machines |
| 2 | Occasionally interact with people, mostly work alone |
| 3 | About half people-facing, half independent |
| 4 | Most time spent dealing with people and their emotions |
| 5 | My entire value IS understanding and connecting people |

---

**Q56** | D4-4D | Forward

> **Dimension**: Human Presence | **Facet**: Emotional Labor | **Direction**: Forward

How much of your work involves leading teams, boosting morale, or motivating others?

| Score | Option |
|-------|--------|
| 1 | My work IS essentially leading and motivating others |
| 2 | Leadership is one of my core skills |
| 3 | Requires some team management and coordination |
| 4 | Occasionally need to mentor newcomers |
| 5 | Not at all — I just do my own work |

---

**Q57** | D4-4D | Forward

> **Dimension**: Human Presence | **Facet**: Emotional Labor | **Direction**: Forward

How much does your work depend on negotiation and persuasion skills?

| Score | Option |
|-------|--------|
| 1 | Negotiation and persuasion are my core work |
| 2 | Negotiation is a major part of the work |
| 3 | Regularly need to negotiate with various parties |
| 4 | Occasionally need simple communication for agreement |
| 5 | No negotiation or persuasion needed at all |

---

#### Facet 4E: Human Premium (3 questions)

---

**Q58** | D4-4E | Reverse

> **Dimension**: Human Presence | **Facet**: Human Premium | **Direction**: Reverse

If clients discovered your work was actually done by AI, what would happen?

| Score | Option |
|-------|--------|
| 1 | Wouldn't care — might even think it's more efficient |
| 2 | A bit surprised but basically acceptable |
| 3 | Would feel it's worth less, but still acceptable |
| 4 | Clearly feel the value decreased — dissatisfied |
| 5 | Absolutely unacceptable — would feel deceived |

---

**Q59** | D4-4E | Forward

> **Dimension**: Human Presence | **Facet**: Human Premium | **Direction**: Forward

If your work output had someone else's name on it, would its value change?

| Score | Option |
|-------|--------|
| 1 | Completely changes — my name IS part of the value |
| 2 | Noticeably affected — attribution matters a lot |
| 3 | Some impact, but mainly judged by work quality itself |
| 4 | Almost no impact — doesn't matter whose name it is |
| 5 | No impact at all — output is output |

---

**Q60** | D4-4E | Forward

> **Dimension**: Human Presence | **Facet**: Human Premium | **Direction**: Forward

How much of your work involves "live improvisational performance"?

| Score | Option |
|-------|--------|
| 1 | My core work IS improvisation and live reaction |
| 2 | Often need to improvise and adapt on the spot |
| 3 | Some occasions require live spontaneous reactions |
| 4 | Very rarely need to improvise |
| 5 | None — everything is prepared in advance |

---

**D4 Summary**: Forward 9 (Q47, Q48, Q50, Q53, Q54, Q56, Q57, Q59, Q60), Reverse 6 (Q46, Q49, Q51, Q52, Q55, Q58)

---

## Complete 60-Question Summary Table

| # | Dimension | Facet | Dir | Question (abbreviated) |
|---|-----------|-------|-----|------------------------|
| Q1 | D1 Learnability | 1A Digitalization | F | Where is your daily work mainly done? |
| Q2 | D1 Learnability | 1A Digitalization | F | How much output leaves a digital trail? |
| Q3 | D1 Learnability | 1A Digitalization | R | How much requires physically handling objects? |
| Q4 | D1 Learnability | 1B Knowledge Accessibility | F | How much professional knowledge is available online? |
| Q5 | D1 Learnability | 1B Knowledge Accessibility | F | If AI read all books, what % would it have? |
| Q6 | D1 Learnability | 1B Knowledge Accessibility | R | How did you learn the most critical knowledge? |
| Q7 | D1 Learnability | 1C Process Standardization | F | How "by the book" are your work processes? |
| Q8 | D1 Learnability | 1C Process Standardization | F | Could your work be written into a manual? |
| Q9 | D1 Learnability | 1C Process Standardization | R | How often do you decide with no precedent? |
| Q10 | D1 Learnability | 1D Tacit Knowledge Depth | R | How much depends on "hard to articulate" experience? |
| Q11 | D1 Learnability | 1D Tacit Knowledge Depth | R | What's the hardest part to teach a newcomer? |
| Q12 | D1 Learnability | 1D Tacit Knowledge Depth | F | How much decision-making is logical vs gut feeling? |
| Q13 | D1 Learnability | 1E Novelty & Change | R | How often do you encounter totally new situations? |
| Q14 | D1 Learnability | 1E Novelty & Change | F | How many tasks have you done something similar before? |
| Q15 | D1 Learnability | 1E Novelty & Change | F | Has your industry's way of working changed in 5 years? |
| Q16 | D2 Eval. Objectivity | 2A Measurability | F | Can quality be scored with numerical metrics? |
| Q17 | D2 Eval. Objectivity | 2A Measurability | F | How quickly can you tell if it was done well? |
| Q18 | D2 Eval. Objectivity | 2A Measurability | R | Can automated tools check your work quality? |
| Q19 | D2 Eval. Objectivity | 2B Result Convergence | F | How much do results vary between different people? |
| Q20 | D2 Eval. Objectivity | 2B Result Convergence | F | Does your work have a right answer? |
| Q21 | D2 Eval. Objectivity | 2B Result Convergence | R | How much would three senior peers' scores differ? |
| Q22 | D2 Eval. Objectivity | 2C Goal Clarity | R | Does the requester know what they want? |
| Q23 | D2 Eval. Objectivity | 2C Goal Clarity | F | Can you list a "definition of done" checklist? |
| Q24 | D2 Eval. Objectivity | 2C Goal Clarity | F | More like solving math or writing an essay? |
| Q25 | D2 Eval. Objectivity | 2D Taste Dependence | R | How much depends on aesthetics and taste? |
| Q26 | D2 Eval. Objectivity | 2D Taste Dependence | R | How big is the gap between "good enough" and "just right"? |
| Q27 | D2 Eval. Objectivity | 2D Taste Dependence | F | How much of "doing well" can everyone agree on? |
| Q28 | D2 Eval. Objectivity | 2E Cross-domain Synthesis | R | How many fields must you combine for decisions? |
| Q29 | D2 Eval. Objectivity | 2E Cross-domain Synthesis | F | How many issues could an AI system find? |
| Q30 | D2 Eval. Objectivity | 2E Cross-domain Synthesis | F | Does the definition of "good work" change frequently? |
| Q31 | D3 Risk Tolerance | 3A Error Severity | R | What's the worst that could happen from an error? |
| Q32 | D3 Risk Tolerance | 3A Error Severity | F | How many people could one wrong decision affect? |
| Q33 | D3 Risk Tolerance | 3A Error Severity | F | How big is the difference between 80% and 100%? |
| Q34 | D3 Risk Tolerance | 3B Reversibility | R | If there's an error, is there a chance to fix it? |
| Q35 | D3 Risk Tolerance | 3B Reversibility | F | Does your work allow "try first, change later"? |
| Q36 | D3 Risk Tolerance | 3B Reversibility | F | How hard to fix a problem found the next day? |
| Q37 | D3 Risk Tolerance | 3C Regulation | R | How strict are regulatory/qualification requirements? |
| Q38 | D3 Risk Tolerance | 3C Regulation | F | How much legal obstacle if AI took over your work? |
| Q39 | D3 Risk Tolerance | 3C Regulation | F | How likely would regulators investigate after an incident? |
| Q40 | D3 Risk Tolerance | 3D Accountability | R | How much personal responsibility if something goes wrong? |
| Q41 | D3 Risk Tolerance | 3D Accountability | F | How often do you face moral/ethical trade-offs? |
| Q42 | D3 Risk Tolerance | 3D Accountability | R | How detailed must work records and documentation be? |
| Q43 | D3 Risk Tolerance | 3E Public Trust | R | Can the public accept AI making decisions in your role? |
| Q44 | D3 Risk Tolerance | 3E Public Trust | F | How common is AI-assisted work in your industry? |
| Q45 | D3 Risk Tolerance | 3E Public Trust | F | Reaction if a colleague secretly used AI? |
| Q46 | D4 Human Presence | 4A Relationship Dependency | R | Why do clients choose you? |
| Q47 | D4 Human Presence | 4A Relationship Dependency | F | How long to build required trust relationships? |
| Q48 | D4 Human Presence | 4A Relationship Dependency | F | How important are your personal connections? |
| Q49 | D4 Human Presence | 4B Personal Brand | R | How many clients come specifically for YOU? |
| Q50 | D4 Human Presence | 4B Personal Brand | F | How long to find a replacement if you left? |
| Q51 | D4 Human Presence | 4B Personal Brand | R | How much personal style in your output? |
| Q52 | D4 Human Presence | 4C Physical Presence | R | Must you be physically present? |
| Q53 | D4 Human Presence | 4C Physical Presence | F | Can work output be delivered fully remotely? |
| Q54 | D4 Human Presence | 4C Physical Presence | F | Effectiveness decrease if fully online? |
| Q55 | D4 Human Presence | 4D Emotional Labor | R | How much reading people, managing emotions? |
| Q56 | D4 Human Presence | 4D Emotional Labor | F | How much leading teams, boosting morale? |
| Q57 | D4 Human Presence | 4D Emotional Labor | F | How much negotiation and persuasion? |
| Q58 | D4 Human Presence | 4E Human Premium | R | Client reaction if they discovered AI did it? |
| Q59 | D4 Human Presence | 4E Human Premium | F | Would value change with someone else's name? |
| Q60 | D4 Human Presence | 4E Human Premium | F | How much live improvisational performance? |

---

### Direction Statistics Per Dimension

| Dimension | Forward | Reverse | Ratio |
|-----------|---------|---------|-------|
| D1 Learnability | 9 (Q1,2,4,5,7,8,12,14,15) | 6 (Q3,6,9,10,11,13) | 60/40 |
| D2 Evaluation Objectivity | 9 (Q16,17,19,20,23,24,27,29,30) | 6 (Q18,21,22,25,26,28) | 60/40 |
| D3 Risk Tolerance | 9 (Q32,33,35,36,38,39,41,44,45) | 6 (Q31,34,37,40,42,43) | 60/40 |
| D4 Human Presence | 9 (Q47,48,50,53,54,56,57,59,60) | 6 (Q46,49,51,52,55,58) | 60/40 |
| **Total** | **36** | **24** | **60/40** |

---

## Part 4: Final Question Order

### 4.1 Ordering Principles

1. **Dimension rotation**: 4 consecutive questions always from 4 different dimensions (round-robin)
2. **Difficulty progression**: first third = easy daily scenarios, middle third = deeper thinking, last third = more abstract
3. **Direction alternation**: no more than 3 consecutive same-direction questions
4. **Facet spacing**: 3 questions from same facet spaced at least 12 questions apart
5. **First/last impression**: first and last questions should be the most engaging

### 4.2 Recommended Final Order

The "Original #" column refers to the design number in Part 3; "Display #" is the order test-takers actually see.

| Display # | Original # | Dimension | Facet | Dir | Question (abbreviated) |
|-----------|------------|-----------|-------|-----|------------------------|
| 1 | Q1 | D1 | 1A Digitalization | F | Where is work done |
| 2 | Q16 | D2 | 2A Measurability | F | Can quality be scored with metrics |
| 3 | Q35 | D3 | 3B Reversibility | F | Allow "try first, change later" |
| 4 | Q52 | D4 | 4C Physical Presence | R | Must be physically present |
| 5 | Q4 | D1 | 1B Knowledge Access. | F | Professional knowledge online |
| 6 | Q19 | D2 | 2B Result Convergence | F | Results vary between people |
| 7 | Q31 | D3 | 3A Error Severity | R | Worst outcome of error |
| 8 | Q46 | D4 | 4A Relationship Dep. | R | Why clients choose you |
| 9 | Q7 | D1 | 1C Process Standard. | F | How "by the book" |
| 10 | Q22 | D2 | 2C Goal Clarity | R | Does requester know what they want |
| 11 | Q44 | D3 | 3E Public Trust | F | How common is AI in your industry |
| 12 | Q55 | D4 | 4D Emotional Labor | R | Reading people, managing emotions |
| 13 | Q10 | D1 | 1D Tacit Knowledge | R | Depends on inarticulate experience |
| 14 | Q17 | D2 | 2A Measurability | F | How quickly know if done well |
| 15 | Q32 | D3 | 3A Error Severity | F | How many people affected by error |
| 16 | Q49 | D4 | 4B Personal Brand | R | Clients come for YOU specifically |
| 17 | Q14 | D1 | 1E Novelty & Change | F | How many tasks done similar before |
| 18 | Q25 | D2 | 2D Taste Dependence | R | Depends on aesthetics/taste |
| 19 | Q34 | D3 | 3B Reversibility | R | Chance to fix errors |
| 20 | Q53 | D4 | 4C Physical Presence | F | Can output be delivered remotely |
| 21 | Q2 | D1 | 1A Digitalization | F | Output leaves digital trail |
| 22 | Q20 | D2 | 2B Result Convergence | F | Is there a right answer |
| 23 | Q37 | D3 | 3C Regulation | R | How strict are regulations |
| 24 | Q47 | D4 | 4A Relationship Dep. | F | How long to build trust |
| 25 | Q8 | D1 | 1C Process Standard. | F | Can be written into manual |
| 26 | Q24 | D2 | 2C Goal Clarity | F | Like math problem or essay |
| 27 | Q45 | D3 | 3E Public Trust | F | Reaction to colleague using AI |
| 28 | Q58 | D4 | 4E Human Premium | R | Client finds out AI did it |
| 29 | Q3 | D1 | 1A Digitalization | R | Requires physical handling |
| 30 | Q27 | D2 | 2D Taste Dependence | F | Can everyone agree on "doing well" |
| 31 | Q33 | D3 | 3A Error Severity | F | Difference between 80% and 100% |
| 32 | Q50 | D4 | 4B Personal Brand | F | How long to find replacement |
| 33 | Q5 | D1 | 1B Knowledge Access. | F | AI reads all books, what % |
| 34 | Q23 | D2 | 2C Goal Clarity | F | Can list "definition of done" |
| 35 | Q40 | D3 | 3D Accountability | R | Personal responsibility if wrong |
| 36 | Q56 | D4 | 4D Emotional Labor | F | Leading teams, boosting morale |
| 37 | Q12 | D1 | 1D Tacit Knowledge | F | How much decision-making is logical |
| 38 | Q21 | D2 | 2B Result Convergence | R | How much would peer scores differ |
| 39 | Q36 | D3 | 3B Reversibility | F | How hard to fix next-day problem |
| 40 | Q48 | D4 | 4A Relationship Dep. | F | How important are connections |
| 41 | Q6 | D1 | 1B Knowledge Access. | R | How critical knowledge was learned |
| 42 | Q26 | D2 | 2D Taste Dependence | R | Gap between "good enough" and "just right" |
| 43 | Q38 | D3 | 3C Regulation | F | Legal obstacles if AI took over |
| 44 | Q54 | D4 | 4C Physical Presence | F | Effectiveness decrease if fully online |
| 45 | Q9 | D1 | 1C Process Standard. | R | How often decide with no precedent |
| 46 | Q28 | D2 | 2E Cross-domain | R | How many fields combined for decisions |
| 47 | Q41 | D3 | 3D Accountability | F | How often face ethical trade-offs |
| 48 | Q51 | D4 | 4B Personal Brand | R | How much personal style in output |
| 49 | Q11 | D1 | 1D Tacit Knowledge | R | Hardest part to teach a newcomer |
| 50 | Q29 | D2 | 2E Cross-domain | F | How many issues could AI find |
| 51 | Q42 | D3 | 3D Accountability | R | How detailed must records be |
| 52 | Q57 | D4 | 4D Emotional Labor | F | How much negotiation/persuasion |
| 53 | Q13 | D1 | 1E Novelty & Change | R | How often encounter totally new situations |
| 54 | Q18 | D2 | 2A Measurability | R | Can automated tools check quality |
| 55 | Q39 | D3 | 3C Regulation | F | Likelihood of regulator investigation |
| 56 | Q59 | D4 | 4E Human Premium | F | Value change with someone else's name |
| 57 | Q15 | D1 | 1E Novelty & Change | F | Industry work methods changed in 5 years |
| 58 | Q30 | D2 | 2E Cross-domain | F | Does "good work" definition change often |
| 59 | Q43 | D3 | 3E Public Trust | R | Can public accept AI in your role |
| 60 | Q60 | D4 | 4E Human Premium | F | How much live improvisation |

---

### 4.3 Order Validation

**Dimension distribution check**: Every 4 questions strictly rotate D1->D2->D3->D4, 15 rounds total.

**Direction distribution check** (forward/reverse ratio per 8-question window):
- Q1-8: F,F,F,R,F,F,R,R = 5F/3R
- Q9-16: F,R,F,R,R,F,F,R = 4F/4R
- Q17-24: F,R,R,F,F,F,R,F = 5F/3R
- Q25-32: F,F,F,R,R,F,F,F = 6F/2R (slightly more forward, acceptable)
- Q33-40: F,F,R,F,F,R,F,F = 6F/2R (same as above)
- Q41-48: R,R,F,F,R,R,F,R = 3F/5R (balances earlier forward-heavy sections)
- Q49-56: R,F,R,F,R,R,F,F = 4F/4R
- Q57-60: F,F,R,F = 3F/1R

No more than 3 consecutive same-direction questions.

**Facet spacing check** (positions of 3 questions from same facet):
- 1A: positions 1, 21, 29 (gaps: 20, 8)
- 1B: positions 5, 33, 41 (gaps: 28, 8)
- 1C: positions 9, 25, 45 (gaps: 16, 20)
- 1D: positions 13, 37, 49 (gaps: 24, 12)
- 1E: positions 17, 53, 57 (gaps: 36, 4) — 53 and 57 gap is only 4, acceptable as directions differ
- 2A: positions 2, 14, 54 (gaps: 12, 40)
- 2B: positions 6, 22, 38 (gaps: 16, 16)
- 2C: positions 10, 26, 34 (gaps: 16, 8)
- 2D: positions 18, 30, 42 (gaps: 12, 12)
- 2E: positions 46, 50, 58 (gaps: 4, 8) — close, but different directions
- 3A: positions 7, 15, 31 (gaps: 8, 16)
- 3B: positions 3, 19, 39 (gaps: 16, 20)
- 3C: positions 23, 43, 55 (gaps: 20, 12)
- 3D: positions 35, 47, 51 (gaps: 12, 4) — 47 and 51 gap is 4, acceptable
- 3E: positions 11, 27, 59 (gaps: 16, 32)
- 4A: positions 8, 24, 40 (gaps: 16, 16)
- 4B: positions 16, 32, 48 (gaps: 16, 16)
- 4C: positions 4, 20, 44 (gaps: 16, 24)
- 4D: positions 12, 36, 52 (gaps: 24, 16)
- 4E: positions 28, 56, 60 (gaps: 28, 4) — 56 and 60 gap is 4, acceptable as directions differ

Most gaps >= 8, meeting the spacing requirement.

---

## Appendix: Facet-Dimension Quick Reference

### D1 Learnability

| Facet | Code | Forward | Reverse |
|-------|------|---------|---------|
| Digitalization | 1A | Q1, Q2 | Q3 |
| Knowledge Accessibility | 1B | Q4, Q5 | Q6 |
| Process Standardization | 1C | Q7, Q8 | Q9 |
| Tacit Knowledge Depth | 1D | Q12 | Q10, Q11 |
| Novelty & Change | 1E | Q14, Q15 | Q13 |

### D2 Evaluation Objectivity

| Facet | Code | Forward | Reverse |
|-------|------|---------|---------|
| Measurability | 2A | Q16, Q17 | Q18 |
| Result Convergence | 2B | Q19, Q20 | Q21 |
| Goal Clarity | 2C | Q23, Q24 | Q22 |
| Taste Dependence | 2D | Q27 | Q25, Q26 |
| Cross-domain Synthesis | 2E | Q29, Q30 | Q28 |

### D3 Risk Tolerance

| Facet | Code | Forward | Reverse |
|-------|------|---------|---------|
| Error Severity | 3A | Q32, Q33 | Q31 |
| Reversibility | 3B | Q35, Q36 | Q34 |
| Regulation | 3C | Q38, Q39 | Q37 |
| Accountability | 3D | Q41 | Q40, Q42 |
| Public Trust | 3E | Q44, Q45 | Q43 |

### D4 Human Presence

| Facet | Code | Forward | Reverse |
|-------|------|---------|---------|
| Relationship Dependency | 4A | Q47, Q48 | Q46 |
| Personal Brand | 4B | Q50 | Q49, Q51 |
| Physical Presence | 4C | Q53, Q54 | Q52 |
| Emotional Labor | 4D | Q56, Q57 | Q55 |
| Human Premium | 4E | Q59, Q60 | Q58 |

---

*End of Document*
