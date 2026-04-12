# EXIST-D 个人博客与项目作品集

这是一个基于 Astro 的静态个人站点，部署在 GitHub Pages 上。

## 站点功能

- 首页个人介绍
- 学习笔记列表与详情页
- 项目作品列表与详情页
- 专题页
- RSS / sitemap / robots
- `/admin/` 在线编辑器

## 在线编辑

当前网站内置了一个自研的在线编辑器：

- 支持 Markdown
- 支持 LaTeX / KaTeX 公式
- 支持左侧文件列表、中间编辑、右侧实时预览
- 支持直接保存回 GitHub 仓库

### 权限规则

- 只有 GitHub 登录用户 `EXIST-D` 可以保存
- 其他人即使打开编辑器，也需要你授权后才能写入
- Token 只保存在本地浏览器中，不会上传到站点

### 打开方式

访问：

- `https://exist-d.github.io/exist.github.io/admin/`

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 主要可编辑内容

- `src/content/notes/`
- `src/content/projects/`
- `src/content/site/`
- `src/pages/`
- `src/components/`
- `src/styles/`

## 备注

- 这是一个项目页仓库，站点实际地址带有 `/exist.github.io/` 前缀。
- 如果你以后迁移到自定义域名，需要同步修改 `astro.config.mjs` 和站内链接。
