import matter from 'gray-matter';
import { BRANCH, canEditRepository, getAuthenticatedUser, listRepositoryTree, loadRepositoryFile, saveRepositoryFile } from '../lib/admin/github.mjs';
import { fileDisplayName, groupEditableFiles, inferCollectionFromPath, isEditablePath, templateForCollection } from '../lib/admin/files.mjs';
import { extractHeadingsFromHtml, renderMarkdownPreview } from '../lib/admin/markdown.mjs';

const STORAGE_KEY = 'exist.github.io.admin.token';
const LAST_FILE_KEY = 'exist.github.io.admin.lastFile';

function slugify(input) {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function setStatus(app, message, tone = 'info') {
  const status = app.querySelector('[data-status]');
  if (!status) return;
  status.textContent = message;
  status.dataset.tone = tone;
}

function setUserMeta(app, message) {
  const userMeta = app.querySelector('[data-user-meta]');
  if (userMeta) userMeta.textContent = message;
}

function setAuthPill(app, message, tone = 'muted') {
  const pill = app.querySelector('[data-auth-pill]');
  if (!pill) return;
  pill.textContent = message;
  pill.dataset.tone = tone;
}

function createEmptyState(text) {
  const div = document.createElement('div');
  div.className = 'preview-empty';
  div.textContent = text;
  return div;
}

function wrapSelection(textarea, before, after = before, fallback = '') {
  const start = textarea.selectionStart ?? 0;
  const end = textarea.selectionEnd ?? 0;
  const value = textarea.value;
  const selection = value.slice(start, end);
  const replacement = selection ? `${before}${selection}${after}` : fallback;
  const nextValue = `${value.slice(0, start)}${replacement}${value.slice(end)}`;
  textarea.value = nextValue;
  const cursor = start + replacement.length;
  textarea.setSelectionRange(cursor, cursor);
  textarea.dispatchEvent(new InputEvent('input', { bubbles: true }));
  textarea.focus();
}

function buildOutline(html, preview) {
  const headings = Array.from(preview.querySelectorAll('h2, h3, h4'));
  const outline = [];

  headings.forEach((heading, index) => {
    const id = heading.id || `section-${index + 1}`;
    heading.id = id;
    outline.push({
      id,
      level: Number(heading.tagName.slice(1)),
      text: heading.textContent?.trim() || `Section ${index + 1}`,
    });
  });

  return outline;
}

function renderPreview(app, markdownText) {
  const preview = app.querySelector('[data-preview]');
  const previewMeta = app.querySelector('[data-preview-meta]');
  const outline = app.querySelector('[data-outline]');

  if (!preview || !outline || !previewMeta) return;

  const parsed = matter(markdownText || '');
  const body = parsed.content || '';
  const html = renderMarkdownPreview(body);

  preview.innerHTML = html || '';
  if (!html.trim()) {
    preview.replaceChildren(createEmptyState('这里会实时显示 Markdown 与 LaTeX 的渲染结果。'));
    outline.replaceChildren(createEmptyState('目录会随着标题实时生成。'));
    previewMeta.textContent = '空文档';
    return;
  }

  const renderedHeadings = buildOutline(html, preview);
  outline.replaceChildren();

  if (!renderedHeadings.length) {
    outline.append(createEmptyState('当前内容没有 H2-H4 标题。'));
  } else {
    renderedHeadings.forEach((item) => {
      const li = document.createElement('li');
      li.dataset.level = String(item.level);

      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = item.text;
      button.addEventListener('click', () => {
        preview.querySelector(`#${CSS.escape(item.id)}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      li.append(button);
      outline.append(li);
    });
  }

  previewMeta.textContent = `${renderedHeadings.length} 个标题，${body.trim() ? body.trim().split(/\n+/).length : 0} 行正文`;
}

function renderMetadata(app, path, markdownText) {
  const meta = app.querySelector('[data-file-meta]');
  const title = app.querySelector('[data-file-title]');
  if (!meta || !title) return;

  const parsed = matter(markdownText || '');
  const frontmatter = parsed.data || {};
  const collection = inferCollectionFromPath(path);
  const pieces = [];

  if (frontmatter.title) pieces.push(`标题：${frontmatter.title}`);
  if (frontmatter.description) pieces.push(`摘要：${frontmatter.description}`);
  if (frontmatter.publishedAt) pieces.push(`发布时间：${frontmatter.publishedAt}`);
  if (frontmatter.period) pieces.push(`时间：${frontmatter.period}`);
  if (Array.isArray(frontmatter.tags) && frontmatter.tags.length) pieces.push(`标签：${frontmatter.tags.join(' / ')}`);
  if (Array.isArray(frontmatter.stack) && frontmatter.stack.length) pieces.push(`技术栈：${frontmatter.stack.join(' / ')}`);

  title.textContent = frontmatter.title || fileDisplayName(path);
  meta.textContent = [collection ? `集合：${collection}` : '集合：未知', `路径：${path}`, ...pieces].join(' · ');
}

function renderFileGroups(app, files, selectedPath, filterText = '') {
  const notesRoot = app.querySelector('[data-file-list-notes]');
  const projectsRoot = app.querySelector('[data-file-list-projects]');
  const fileCount = app.querySelector('[data-file-count]');
  if (!notesRoot || !projectsRoot || !fileCount) return;

  const filtered = {
    notes: files.notes.filter((item) => `${item.title} ${item.path}`.toLowerCase().includes(filterText.toLowerCase())),
    projects: files.projects.filter((item) => `${item.title} ${item.path}`.toLowerCase().includes(filterText.toLowerCase())),
  };

  const renderGroup = (root, collection) => {
    root.replaceChildren();
    const items = filtered[collection];
    if (!items.length) {
      root.append(createEmptyState('没有匹配的文件。'));
      return;
    }

    items.forEach((item) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `admin-file-item ${selectedPath === item.path ? 'is-active' : ''}`;
      button.innerHTML = `<strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.path)}</small>`;
      button.addEventListener('click', () => app.dispatchEvent(new CustomEvent('admin:select-file', { detail: item.path })));
      root.append(button);
    });
  };

  renderGroup(notesRoot, 'notes');
  renderGroup(projectsRoot, 'projects');
  fileCount.textContent = `${filtered.notes.length + filtered.projects.length} 个文件`;
}

function setDirty(app, dirty) {
  app.dataset.dirty = dirty ? 'true' : 'false';
  const saveButton = app.querySelector('[data-action="save"]');
  if (saveButton) saveButton.textContent = dirty ? '保存到 GitHub*' : '保存到 GitHub';
}

function readConfig(app) {
  return JSON.parse(app.dataset.config || '{}');
}

function getToken(app) {
  const input = app.querySelector('[data-token-input]');
  return input?.value?.trim() || localStorage.getItem(STORAGE_KEY) || '';
}

async function refreshAuthorization(app) {
  const token = getToken(app);
  const owner = readConfig(app).owner;
  const connectButton = app.querySelector('[data-action="connect"]');

  if (!token) {
    setAuthPill(app, '未连接');
    setUserMeta(app, '请粘贴 GitHub Token 后连接。');
    if (connectButton) connectButton.disabled = false;
    app.dataset.authorized = 'false';
    return null;
  }

  setAuthPill(app, '验证中…', 'pending');
  setUserMeta(app, '正在验证 GitHub 身份...');
  const user = await getAuthenticatedUser(token);
  if (!canEditRepository(user, owner)) {
    app.dataset.authorized = 'false';
    setAuthPill(app, '无权限', 'error');
    setUserMeta(app, `当前登录为 ${user.login}，只有 ${owner} 可以保存。`);
    throw new Error(`当前登录为 ${user.login}，只有 ${owner} 可以保存。`);
  }

  localStorage.setItem(STORAGE_KEY, token);
  app.dataset.authorized = 'true';
  setAuthPill(app, '已授权', 'success');
  setUserMeta(app, `已连接为 ${user.login}。`);
  if (connectButton) connectButton.disabled = false;
  return user;
}

async function loadTree(app) {
  setStatus(app, '正在读取仓库文件…');
  const token = localStorage.getItem(STORAGE_KEY);
  const tree = await listRepositoryTree(token || null);
  const paths = tree.filter((entry) => entry.type === 'blob' && isEditablePath(entry.path)).map((entry) => entry.path);
  const grouped = groupEditableFiles(paths);
  app.__adminState.files = grouped;
  renderFileGroups(app, grouped, app.__adminState.currentPath, app.__adminState.fileSearch);
  setStatus(app, `已加载 ${paths.length} 个可编辑文件。`);
  return grouped;
}

async function selectFile(app, path) {
  const token = localStorage.getItem(STORAGE_KEY);
  if (app.__adminState.dirty && !confirm('当前内容还没保存，切换文件会丢失修改。继续吗？')) {
    return;
  }

  setStatus(app, `正在加载 ${path}…`);
  const file = await loadRepositoryFile(path, token || null);
  app.__adminState.currentPath = path;
  app.__adminState.currentSha = file.sha;
  app.__adminState.dirty = false;
  app.__adminState.currentContent = file.content;
  const editor = app.querySelector('[data-editor]');
  if (editor) editor.value = file.content;
  renderMetadata(app, path, file.content);
  renderPreview(app, file.content);
  renderFileGroups(app, app.__adminState.files, path, app.__adminState.fileSearch);
  setDirty(app, false);
  localStorage.setItem(LAST_FILE_KEY, path);
  setStatus(app, `已打开 ${path}`);
}

async function createNewFile(app, collection) {
  const title = prompt(collection === 'notes' ? '请输入笔记标题' : '请输入项目标题');
  if (!title?.trim()) return;
  const slugInput = prompt('请输入文件 slug（留空则自动生成）', slugify(title));
  const slug = slugInput?.trim() || slugify(title);
  const path = collection === 'notes'
    ? `src/content/notes/${slug}.md`
    : `src/content/projects/${slug}.md`;

  const template = templateForCollection(collection, title, slug);
  await saveCurrentContent(app, {
    path,
    content: template,
    sha: undefined,
    isNewFile: true,
    message: `feat: create ${collection} ${slug}`,
  });
  await loadTree(app);
  await selectFile(app, path);
}

async function saveCurrentContent(app, options = {}) {
  const token = getToken(app);
  if (!token) {
    throw new Error('请先连接 GitHub Token。');
  }

  const user = await refreshAuthorization(app);
  if (!user) return;

  const editor = app.querySelector('[data-editor]');
  const path = options.path || app.__adminState.currentPath;
  const content = options.content ?? editor?.value ?? '';
  const sha = options.sha ?? app.__adminState.currentSha;
  const message = options.message || `update ${path}`;

  if (!path) {
    throw new Error('没有选中文件。');
  }

  setStatus(app, `正在保存 ${path}…`);
  const result = await saveRepositoryFile({
    path,
    content,
    sha: options.isNewFile ? undefined : sha,
    message,
    token,
  });

  app.__adminState.currentSha = result?.content?.sha || sha;
  app.__adminState.currentContent = content;
  app.__adminState.dirty = false;
  setDirty(app, false);
  setStatus(app, `已保存到 ${BRANCH} / ${path}`);
}

function bindToolbar(app) {
  const editor = app.querySelector('[data-editor]');
  if (!editor) return;

  app.querySelectorAll('[data-format]').forEach((button) => {
    button.addEventListener('click', () => {
      const type = button.dataset.format;
      if (type === 'bold') wrapSelection(editor, '**', '**', '**粗体**');
      if (type === 'italic') wrapSelection(editor, '*', '*', '*斜体*');
      if (type === 'heading2') wrapSelection(editor, '\n## ', '', '\n## 标题\n');
      if (type === 'quote') wrapSelection(editor, '\n> ', '', '\n> 引用\n');
      if (type === 'code') wrapSelection(editor, '\n```markdown\n', '\n```\n', '\n```markdown\n代码\n```\n');
      if (type === 'list') wrapSelection(editor, '\n- ', '', '\n- 列表项\n');
    });
  });

  editor.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
      event.preventDefault();
      app.dispatchEvent(new CustomEvent('admin:save'));
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b') {
      event.preventDefault();
      wrapSelection(editor, '**', '**', '**粗体**');
    }
  });
}

export function initializeAdminEditor(app) {
  if (!app) return;

  app.__adminState = {
    files: { notes: [], projects: [] },
    currentPath: '',
    currentSha: '',
    currentContent: '',
    dirty: false,
    fileSearch: '',
  };

  const tokenInput = app.querySelector('[data-token-input]');
  const editor = app.querySelector('[data-editor]');
  const fileSearch = app.querySelector('[data-file-search]');

  const wireEvents = () => {
    app.addEventListener('admin:select-file', async (event) => {
      await selectFile(app, event.detail);
    });

    app.addEventListener('admin:save', async () => {
      try {
        await saveCurrentContent(app);
      } catch (error) {
        setStatus(app, error.message || '保存失败', 'error');
      }
    });

    app.querySelector('[data-action="save"]')?.addEventListener('click', async () => {
      try {
        await saveCurrentContent(app);
      } catch (error) {
        setStatus(app, error.message || '保存失败', 'error');
      }
    });

    app.querySelector('[data-action="reload-tree"]')?.addEventListener('click', async () => {
      try {
        await loadTree(app);
        if (app.__adminState.currentPath) {
          renderFileGroups(app, app.__adminState.files, app.__adminState.currentPath, app.__adminState.fileSearch);
        }
      } catch (error) {
        setStatus(app, error.message || '刷新失败', 'error');
      }
    });

    app.querySelector('[data-action="connect"]')?.addEventListener('click', async () => {
      try {
        await refreshAuthorization(app);
        await loadTree(app);
      } catch (error) {
        setStatus(app, error.message || '授权失败', 'error');
      }
    });

    app.querySelector('[data-action="clear-token"]')?.addEventListener('click', () => {
      localStorage.removeItem(STORAGE_KEY);
      if (tokenInput) tokenInput.value = '';
      app.dataset.authorized = 'false';
      setAuthPill(app, '未连接');
      setUserMeta(app, '请粘贴 GitHub Token 后连接。');
      setStatus(app, 'Token 已清除。');
    });

    app.querySelector('[data-action="new-note"]')?.addEventListener('click', async () => {
      try {
        await createNewFile(app, 'notes');
      } catch (error) {
        setStatus(app, error.message || '创建失败', 'error');
      }
    });

    app.querySelector('[data-action="new-project"]')?.addEventListener('click', async () => {
      try {
        await createNewFile(app, 'projects');
      } catch (error) {
        setStatus(app, error.message || '创建失败', 'error');
      }
    });

    editor?.addEventListener('input', () => {
      app.__adminState.dirty = true;
      setDirty(app, true);
      const currentPath = app.__adminState.currentPath;
      if (currentPath) {
        renderMetadata(app, currentPath, editor.value);
        renderPreview(app, editor.value);
      }
    });

    fileSearch?.addEventListener('input', (event) => {
      app.__adminState.fileSearch = event.target.value;
      renderFileGroups(app, app.__adminState.files, app.__adminState.currentPath, app.__adminState.fileSearch);
    });
  };

  const boot = async () => {
    bindToolbar(app);
    wireEvents();

    if (tokenInput) {
      tokenInput.value = localStorage.getItem(STORAGE_KEY) || '';
      tokenInput.addEventListener('change', () => {
        localStorage.setItem(STORAGE_KEY, tokenInput.value.trim());
      });
    }

    try {
      await refreshAuthorization(app).catch(() => null);
      await loadTree(app);
      const lastFile = localStorage.getItem(LAST_FILE_KEY);
      if (lastFile && isEditablePath(lastFile)) {
        await selectFile(app, lastFile);
      } else if (app.__adminState.files.notes[0]) {
        await selectFile(app, app.__adminState.files.notes[0].path);
      } else if (app.__adminState.files.projects[0]) {
        await selectFile(app, app.__adminState.files.projects[0].path);
      } else {
        setStatus(app, '仓库里还没有可编辑的 Markdown 文件。', 'warn');
      }
    } catch (error) {
      setStatus(app, error.message || '初始化失败', 'error');
      setUserMeta(app, '请确认网络和 GitHub Token 权限。');
    }
  };

  void boot();
}
