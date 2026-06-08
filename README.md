# EXIST-D 个人博客与项目作品集

这是一个基于 Astro 的静态个人博客，用来展示学习笔记、项目作品和个人信息。

线上地址：

- `https://exist-d.github.io/exist.github.io/`

## 当前维护方式

本项目不再提供站内在线编辑功能。

后续内容维护统一采用：

1. 在本地修改 Markdown / JSON 文件
2. 本地运行构建检查
3. 通过 Git 提交并推送到 GitHub
4. GitHub Actions 自动发布到 GitHub Pages

## 项目结构

- `src/content/notes/`：学习笔记 Markdown
- `src/content/projects/`：项目作品 Markdown
- `src/content/site/settings.json`：站点基础信息
- `src/content/site/home.json`：首页文案
- `src/pages/`：页面路由
- `src/components/`：通用组件
- `src/layouts/`：页面布局
- `src/styles/`：全站样式
- `public/uploads/`：图片和静态资源
- `.github/workflows/deploy.yml`：GitHub Pages 自动发布流程

## 本地开发

```bash
npm install
npm run dev
```

## 构建检查

```bash
npm run build
```

## 内容说明

笔记和项目正文使用 Markdown，站点渲染时仍支持 LaTeX 公式：

```md
行内公式：$E=mc^2$

块级公式：

$$
\int_0^1 x^2 \, dx
$$
```

## 相关文档

- `CONTENT-WORKFLOW.md`：如何新增或修改笔记、项目和页面内容
- `DEPLOY-GITHUB-PAGES.md`：GitHub Pages 发布流程说明
