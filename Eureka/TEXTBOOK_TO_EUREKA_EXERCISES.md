# From textbook (المعاصر Math 1 — Term 1) to Eureka interactive exercises

This note is derived from **`المعاصر_ماث_1_ثانوي_ترم_1_ذاكرولي (1).pdf`** as surfaced in the workspace: **Unit 1, 42 pages** of English-side content covering quadratics, complex numbers introductory material, Vieta-related work, **sign of functions**, **quadratic inequalities**, and an **“enrichment”** section on **root-location conditions** (intervals between roots, \(f(k)\), vertex between bounds).

Extraction note: what we read looks like **OCR-derived text**, not flawless layout. Useful for planning exercise *types*, not guaranteed literal equation strings for copy-paste.

---

## Part A — Recommended exercise types (prioritized)

### Tier 1 — Strong fit **today** with Eureka primitives

These map cleanly onto **MCQ**, **exact label match**, optional **BAR_CHART** (only when the stem is inherently about comparing magnitudes/rates—not core for this algebra unit), and especially **MATH_GRAPH** (`PARAMETER_ADJUST` + **`NUMERIC_RANGE`** validation).

| Type ID (conceptual) | Learner interaction | Validates well? | Fits this textbook? |
|----------------------|---------------------|----------------|---------------------|
| **Discriminant classifier** | MCQ or tap-to-select classification | ✅ | Roots real distinct / equal / non-real (complex conjugate pairs). |
| **Parameter \(k\) / \(m\) conditions** | MCQ (“which interval for \(m\)?”) or constrained numeric multi-field | ⚠️ MCQ safest | “No real roots”, “equal roots”, “two distinct real roots” problems. |
| **Vieta: sum/product without solving** | MCQ or two numeric inputs with tolerance | ⚠️ inputs need schema | Repeated pattern: \(\sum\) and \(\prod\) from \(ax^2+bx+c\). |
| **One-root-given \(\rightarrow\) other root + parameter** | MCQ steps or bounded numeric fields | ⚠️ | Substitution / factorization drills. |
| **Form equation from transformed roots** | MCQ (“which quadratic?”) preferable to free-form | ⚠️ | Roots \(L^2,M^2\) or \(\frac{L}{M}\)-style constructions appear in lesson flow. |
| **Match parabola to root count / discriminant story** | **MATH_GRAPH** (slider \(\{a,b,c\}\) vs reference) | ✅ (range per param) | Aligns with “graphical quadratic solution” prerequisites and sign lessons. |

### Tier 2 — High pedagogical value, **needs new renderers**

The book’s later sections are dominated by **sign charts**, **intervals in \(\mathbb{R}\)**, and **inequalities**, which are awkward as pure MCQ at scale.

| Type ID | Interaction sketch | Notes |
|---------|-------------------|--------|
| **Quadratic sign table** | For roots \(r_1<r_2\), learner marks \((-\infty,r_1)\), \((r_1,r_2)\), \((r_2,\infty)\) as \(+\) / \(0\) / \(-\) | Validates against \(\mathrm{sign}(a)\) and ordered roots; great for formative feedback. |
| **Interval union answer** | Multi-select segments or simplified “pick solution set” from a curated list | Textbook notation uses unions like \(\mathbb{R}\setminus[a,b]\) style ideas; constrain options to reduce ambiguity. |
| **Number-line region picker** | Select interval(s) for \(f(x)>0\) | Same engine as inequalities; UX heavier but very faithful to the curriculum. |
| **Step scaffold (“First/Second/Third”)** | Fixed ordering for solving quadratic inequalities: \(f\) → sign study → intervals | Semi-interactive checklist + verify final interval set. |

### Tier 3 — Possible but weaker for auto-grading (use sparingly)

| Type | Reason |
|------|--------|
| **“Prove … for all \(a\)”** | Requires symbolic reasoning; brittle unless broken into graded lemmas or turned into structured MCQ. |
| **Long algebraic chains** | Error locations vary; MCQ checkpoints or Parsons-style reordering beats free text. |
| **Enrichment diagrams** (`f(k)>0`, `f(m)f(n)<0`, vertex between bounds) | Excellent content, needs **predicate templates** (“which conditions must hold?”) rather than proving in a box. |

---

## Part B — Chapter → exercise mapping (Unit 1 from this PDF)

| Textbook thrust (approx.) | Good Eureka exercise ideas |
|---------------------------|----------------------------|
| General formula / nature of roots | MCQ discriminate cases; numeric MCQ computing \(\Delta\) classification (not always the numeric value unless you sanitize OCR). |
| Graphical quadratic solutions | **MATH_GRAPH** match reference curve vs x-intercepts storyline; MCQ interpreting “touch / cut / miss” diagrams. |
| Intro complex numbers \(i\) | Definitions MCQ; “which equality is invalid?” \(\sqrt{ab}\neq\sqrt a\sqrt b\) for negatives (trap items from the textbook warning). |
| Parameterized quadratics | MCQ parameterized solution sets for \(m,k\); numeric fields only with tolerance + normalization. |
| Vieta identities | Dedicated **pair-input** items for sum/product; MCQ deriving \(k\) from \(\sum\) or \(\prod\) constraints. |
| Transformed-root equations | MCQ picking correct reconstructed quadratic among distractors computed from OCR-clean coefficients. |
| Sign of constants / linear / quadratic | Tier-2 **sign table** exercises; fallback MCQ for “where is \(f\) positive?” with 3–4 interval choices. |
| Quadratic inequalities | Tier-2 interval union MCQ → later upgrade to number-line UX. |
| Enrichment root locations | Multiple-MCQ decomposition: classify which *conditions* belong to which configuration (rather than heavy calculation). |

---

## Part C — What to reuse from existing Eureka versus what to add

### Already aligned

- **`MCQ`** + **`EXACT_MATCH_LABEL`**: classifications, conceptual traps, reconstructed equations as label choices (careful OCR).
- **`MATH_GRAPH`** + **`PARAMETER_ADJUST`** + **`NUMERIC_RANGE`**: “adjust \(a,b,c\) to match target parabola / roots behavior” storyline.
- **Dynamic schemas** (`DomainData` / validators): good for authoring generated items if you constrain random generation.

### Gaps revealed by **this textbook**

1. **`NUMERIC_TOLERANCE` or vector numeric validation** — many answers are irrational or pairs \((Re,Im)\); range checks per component help more than lexicographic string compares.
2. **Interval / set validators** — union of bounded intervals matching mathematically equivalent forms.
3. **Sign-table renderer** — largest missing piece vs the PDF’s Lesson 5–6 sequence.
4. **Multi-step scaffolding block** — not a flashy widget, reduces wrong partial credit explosions for AI-authored items.

---

## Part D — AI-generated questions from this PDF: practical constraints

Because the source PDF is OCR-noisy:

- Prefer **structures** generators know reliably: discriminate sign; count real roots; “if \(\Delta<0\) then …”; ordering steps for inequalities.
- For numeric coefficients, prefer **canonical parameters** authored by you inside ranges, letting AI vary *wording/context* rather than scraping messy digits verbatim.
- Every generated payload should conform to **`EXERCISES_ARCHITECTURE_AND_AI_QUESTION_GUIDE.md`**: strict JSON envelope with `questionType`, `interactionMode`, `answerValidationType`, `expectedAnswer`.

Prompting pattern suggestion:

```text
Output ONLY JSON. questionType ∈ { MCQ | MATH_GRAPH } unless told otherwise.
For MCQ: domainData.options must be coherent distractors grounded in quadratic theory.
Avoid copying coefficients from OCR; derive new integers in [-12,12] unless given.
```

Escalate to new types only after you freeze **validators**—sign tables demand a dedicated grading function.

---

## Part E — Suggested phased roadmap

**Phase 1 (ship)**  
MCQ-heavy bank + **MATH_GRAPH** discriminants/visual reasoning + parameterized MCQ drills.

**Phase 2**  
Sign-table + curated interval unions (reuse MCQ at first).

**Phase 3**  
Number-line UX + enrichment root-placement as structured multi-MCQ predicates.

---

*Document maintained for Eureka curriculum ↔ interactive exercise alignment.*
