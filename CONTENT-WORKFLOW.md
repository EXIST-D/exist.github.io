# 内容维护流程

这份文档记录当前博客的日常维护方式。项目已经移除站内在线编辑器，所有内容都在本地文件中维护。

## 修改站点基础信息

主要文件：

- `src/content/site/settings.json`
- `src/content/site/home.json`

适合修改：

- 姓名、邮箱、GitHub 链接
- 首页标题和介绍
- 技能、时间线、联系信息
- SEO 标题和描述

## 新增一篇笔记

在 `src/content/notes/` 下新建一个 `.md` 文件，例如：

```text
src/content/notes/my-new-note.md
```

基础模板：

```md
---
title: 新笔记标题
description: 用一句话说明这篇笔记写什么
publishedAt: 2026-06-08
updatedAt: 2026-06-08
tags:
  - 学习笔记
featured: false
minutes: 5
draft: false
---

# 新笔记标题

这里写正文。
```

## 新增一个项目

在 `src/content/projects/` 下新建一个 `.md` 文件，例如：

```text
src/content/projects/my-project.md
```

基础模板：

```md
---
title: 项目名称
description: 用一句话说明项目价值
period: 2026
stack:
  - Astro
featured: false
order: 99
category: agent
status: 持续开发
draft: false
image: /images/example.png
imageAlt: 项目界面说明
highlights:
  - 一条可验证的核心能力
role: 作者
outcome: 项目结果
demo:
repo:
---

# 项目名称

这里写项目背景、实现过程、难点和结果。
```

## 图片资源

项目方向 `category` 支持 `agent`、`skills`、`data`、`tools`。`draft: true` 的项目不会出现在列表、详情路由或站点地图中；原始文件仍保留。`demo` 与 `repo` 为可选 URL，没有时直接省略该字段。

首页近期项目固定展示 WeiJin、Interview Bank、Gleaner，其余已发布项目位于“研究、统计与日常工具”。在线产品入口统一在 `src/content/site/home.json` 维护。

图片建议放在：

```text
public/images/
```

Markdown 中引用：

```md
![图片说明](/exist.github.io/uploads/example.png)
```

## 发布前检查

每次修改后先运行：

```bash
npm run build
```

构建通过后再提交：

```bash
git add .
git commit -m "Update blog content"
git push origin main
```
