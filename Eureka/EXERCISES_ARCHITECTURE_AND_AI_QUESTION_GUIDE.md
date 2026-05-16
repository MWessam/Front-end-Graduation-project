# Exercises Architecture and AI Question Authoring Guide

This document explains how the current exercises feature works, how admin users edit and preview exercises, and what is required to add new question types. It also includes guidance for AI-generated questions and notes about using scanned PDF books with Cursor.

## 1) Current Exercises Architecture

The system is built around three independent dimensions:

- `questionType` (what the question is)
- `interactionMode` (how the learner answers)
- `answerValidationType` (how correctness is judged)

Core enums are in `src/exercises/types.js`.

Each question record includes:

- `questionId`, `lessonId`, `questionHead`
- `questionType`
- `questionBody`:
  - `interactionMode`
  - `context`
  - `domainData`
  - `interactionData`
- `answerValidationType`
- `expectedAnswer`

Persistence is localStorage-based:

- Platform/admin catalog: `src/services/contentService.js`
- Per-class curriculum: `src/services/classCurriculumService.js`
- Unified access layer: `src/services/curriculumApi.js` (`resolveCurriculumApi`)

## 2) Rendering and Validation Flow

### Rendering

- Renderer registry: `src/exercises/renderers/index.js`
- Each renderer declares:
  - supported interaction modes
  - `DomainData` class
  - `InteractionDataMap`
- Runtime pages call `getQuestionRenderer(questionType)` and pass `questionBody` and current answer `value`.

### Validation

- Validator registry: `src/exercises/validators/index.js`
- Runtime calls `getValidator(answerValidationType)`
- Validation compares learner answer against `expectedAnswer`

Main runtime page: `src/pages/Exercises.jsx`.

## 3) Admin View/Edit/Preview

The editor is centered around `src/components/admin/EmbeddedQuestionBuilder.jsx`.

Features:

- select question type
- select interaction mode (scoped by renderer capabilities)
- configure domain data via dynamic schema forms
- configure interaction data via dynamic schema forms
- select validation strategy
- configure expected answer via validator schema
- live renderer preview (same renderer used by learners)

### Where admin accesses this

1. Lesson question bank editor:
   - `src/pages/admin/LessonQuestionsEditor.jsx`
   - route: `/admin/lessons/:lessonId/questions` (and class-scoped teacher route)

2. Embedded question block inside lesson cards:
   - `src/components/admin/BlockNoteEditor.jsx`
   - custom BlockNote block type `question`
   - serialized through `src/exercises/embeddedQuestion.js`

### Student preview/use of embedded questions

- Lesson blocks are rendered in `src/components/lesson/lessonBlockRender.jsx`
- `question` block goes to `src/components/lesson/LessonEmbeddedQuestion.jsx`
- payload is normalized by `parseEmbeddedQuestion`

## 4) Data Modeling for Question Types

Question authoring is schema-driven.

- Domain DTOs: `src/exercises/data/domains/*Domain.js`
- Interaction DTOs: `src/exercises/data/interactions/*.js`
- Shared form renderer: `src/exercises/components/DynamicForm.jsx`

Each DTO provides a static `schema` that controls generated editor fields.

This makes adding types easier and keeps admin UI generic.

## 5) How to Create a New Question Type

Use this checklist.

### Step 1: Add enum values

Update `src/exercises/types.js`:

- add new `QuestionType`
- add new `InteractionMode` if needed
- add new `AnswerValidationType` if needed

### Step 2: Create data classes

Add:

- `src/exercises/data/domains/NewTypeDomain.js`
- `src/exercises/data/interactions/NewModeInteraction.js` (if needed)

Each class should:

- accept `data` in constructor
- set safe defaults
- define static `schema` for dynamic editor

### Step 3: Create renderer

Add file:

- `src/exercises/renderers/NewTypeQuestionRenderer.jsx`

Renderer should:

- define strategy map by interaction mode
- instantiate `DomainData` and interaction class
- read from `questionBody`
- emit learner state through `onChange`

Expose metadata on the component:

- `.questionType`
- `.availableInteractionModes`
- `.DomainData`
- `.InteractionDataMap`

### Step 4: Register renderer

Update `src/exercises/renderers/index.js` to map new question type to the renderer.

### Step 5: Add validator (if needed)

Add file in `src/exercises/validators/` and register in `index.js`.

Important:

- include `validator.schema` so admin can configure expected answers in dynamic form

### Step 6: Extend embedded payload normalization

Update `src/exercises/embeddedQuestion.js`:

- ensure `parseEmbeddedQuestion` can normalize your new type from both modern and legacy/raw payloads

### Step 7: Authoring defaults

Ensure default question data is valid when type is selected:

- sensible `domainData`
- sensible `interactionData`
- sensible `expectedAnswer` shape

### Step 8: Test quickly

At minimum verify:

- appears in admin type dropdown
- renders in live preview
- saves/loads in question bank
- works inside BlockNote embedded question block
- validates correctly in student runtime

## 6) AI-Generated Questions: Recommended Contract

For AI generation, enforce a strict JSON output contract matching your runtime.

Recommended required fields:

- `questionHead`
- `questionType`
- `questionBody.interactionMode`
- `questionBody.context`
- `questionBody.domainData`
- `questionBody.interactionData`
- `answerValidationType`
- `expectedAnswer`

Generation pipeline recommendation:

1. AI produces JSON only (no prose around it)
2. Validate shape before saving (runtime schema validation suggested)
3. Normalize with `parseEmbeddedQuestion`-style logic
4. Reject or repair incompatible payloads
5. Save via curriculum API

Suggested hardening for AI use:

- add explicit version field (for migrations)
- add runtime schema validation (Zod/Yup)
- add type-specific test fixtures
- keep a small set of approved templates per `questionType`

## 7) Cursor + Scanned PDF Books (image-based pages)

Short answer: usable, but quality depends on OCR quality.

- If a PDF is mostly scanned images (not embedded text), extraction is weaker than text-native PDFs.
- Cursor can still work with the content, but you usually need OCR first for best results.
- For high accuracy, run OCR preprocessing (or use a PDF tool that exports text) before feeding long scanned books.

Practical guidance:

- Best case: OCRed PDF with selectable text -> much better summarization and retrieval.
- Medium case: mixed PDF (some text, some scans) -> partial quality.
- Worst case: low-quality scans, skewed pages, handwritten notes -> expect misses and hallucination risk.

Recommended workflow:

1. OCR the book first (language-aware OCR if possible)
2. spot-check extraction quality on sample pages
3. chunk by chapter/topic before prompting
4. ask the model to cite exact snippets and uncertainty when extraction is noisy

## 8) Architecture Opinion (Current State)

Strengths:

- scalable separation of renderer/interaction/validator
- reusable editor with dynamic schema forms
- shared component for standalone and embedded questions

Main risks as project grows:

- weak runtime contract enforcement for JSON payloads
- no versioned migrations on question payload shape
- localStorage mock persistence can hide production data issues

High-value next improvements:

- add schema validation at save/load boundaries
- add payload version + migration strategy
- separate draft edits from persisted saves for cleaner authoring workflow

