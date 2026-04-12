# 在线编辑说明

当前仓库使用站内自研编辑器作为在线写作入口。

## 入口

- `https://exist-d.github.io/exist.github.io/admin/`

## 能做什么

- 选择左侧文件
- 在中间区域直接编辑 Markdown
- 右侧实时查看渲染结果
- 使用 KaTeX 书写数学公式
- 新建笔记或项目
- 保存到 GitHub 仓库

## 语法

- 普通 Markdown：标题、列表、引用、链接、代码块都可用
- 行内公式：`$E=mc^2$`
- 块级公式：

```md
$$
\int_0^1 x^2 \, dx
$$
```

## 权限

- 只有登录为 `EXIST-D` 的 GitHub 账号可以保存
- 编辑器会要求你在浏览器里粘贴 GitHub Token
- Token 只保存在本地浏览器 `localStorage`
- 其他人需要你授权后，才能使用相同仓库写入权限

## 当前编辑范围

v1 先覆盖以下内容：

- `src/content/notes/*.md`
- `src/content/projects/*.md`

如果后续需要，还可以继续扩展到：

- `src/content/site/*.json`
- `src/pages/*.astro`
- `src/components/*.astro`

## 说明

这是一个 GitHub Pages 静态站点，编辑完成后会直接保存回仓库，并由 GitHub Actions 重新构建和发布。
