# 在线编辑器 V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a first-party `/admin/` editor with a left file list, center Markdown editor, right live preview, and GitHub Contents API save flow.

**Architecture:** Keep the editor as a static Astro page with browser-side modules. Use a small GitHub API client for file listing/loading/saving, a Markdown renderer with KaTeX for live preview, and a lightweight state controller that synchronizes file selection, text edits, preview rendering, and save status.

**Tech Stack:** Astro, TypeScript, vanilla browser DOM, GitHub Contents API, `markdown-it`, `markdown-it-katex`, `katex`, `gray-matter`.

---

### Task 1: Add editor helper tests

**Files:**
- Create: `tests/admin/editor-helpers.test.mjs`
- Create: `src/lib/admin/files.mjs`
- Create: `src/lib/admin/markdown.mjs`

- [ ] **Step 1: Write the failing test**

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { groupEditableFiles } from '../../src/lib/admin/files.mjs';
import { renderMarkdownPreview } from '../../src/lib/admin/markdown.mjs';

test('groupEditableFiles separates notes and projects', () => {
  const grouped = groupEditableFiles([
    'src/content/notes/a.md',
    'src/content/projects/b.md',
    'src/content/site/home.json',
  ]);

  assert.equal(grouped.notes.length, 1);
  assert.equal(grouped.projects.length, 1);
});

test('renderMarkdownPreview supports bold and katex', () => {
  const html = renderMarkdownPreview('**bold**\\n\\n$E=mc^2$');

  assert.match(html, /<strong>bold<\\/strong>/);
  assert.match(html, /katex/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/admin/editor-helpers.test.mjs`
Expected: FAIL because modules do not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create the helper modules so the test passes with the simplest useful behavior.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/admin/editor-helpers.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/admin/editor-helpers.test.mjs src/lib/admin/files.mjs src/lib/admin/markdown.mjs
git commit -m "test: add admin editor helper coverage"
```

### Task 2: Build GitHub file access client

**Files:**
- Create: `src/lib/admin/github.mjs`
- Modify: `src/pages/admin/index.astro`
- Modify: `package.json`

- [ ] **Step 1: Write the failing test**

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { canEditRepository } from '../../src/lib/admin/github.mjs';

test('canEditRepository only allows the configured owner login', () => {
  assert.equal(canEditRepository({ login: 'EXIST-D' }, 'EXIST-D'), true);
  assert.equal(canEditRepository({ login: 'someone-else' }, 'EXIST-D'), false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/admin/editor-helpers.test.mjs`
Expected: FAIL because `canEditRepository` is not implemented yet.

- [ ] **Step 3: Write minimal implementation**

Add GitHub Contents API wrappers for list/load/save plus owner-check logic.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/admin/editor-helpers.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/admin/github.mjs src/pages/admin/index.astro package.json
git commit -m "feat: add github api client for admin editor"
```

### Task 3: Replace `/admin` with the live editor UI

**Files:**
- Modify: `src/pages/admin/index.astro`
- Create: `src/scripts/admin-editor.mjs`
- Create: `src/styles/admin.css`

- [ ] **Step 1: Write the failing test**

```javascript
// This task is verified by building the app and opening /admin in a browser.
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build`
Expected: FAIL until the editor page and client script are wired up.

- [ ] **Step 3: Write minimal implementation**

Create the three-pane editor shell, live preview, outline, save actions, and file selection.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/admin/index.astro src/scripts/admin-editor.mjs src/styles/admin.css
git commit -m "feat: add live markdown admin editor"
```

### Task 4: Verify browser flow and publish

**Files:**
- Modify: `README.md`
- Modify: `CMS-EDITING.md`

- [ ] **Step 1: Write the failing test**

```javascript
// Verify by opening the deployed /admin page and saving a note.
```

- [ ] **Step 2: Run test to verify it fails**

Run: open `/admin` in the browser and try file load + save.
Expected: editor is not yet wired.

- [ ] **Step 3: Write minimal implementation**

Smoke-test the real site, then push all changes.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build` and browser QA against `/admin`.
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add README.md CMS-EDITING.md
git commit -m "docs: document the live admin editor"
```
