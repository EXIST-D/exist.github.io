# 网页内编辑

这个项目当前以 Pages CMS 作为在线编辑入口，正文采用 Markdown 原文保存，并支持直接书写 LaTeX 公式。

## 推荐使用方式

1. 打开 [https://app.pagescms.org](https://app.pagescms.org)
2. 使用 GitHub 账号登录
3. 选择仓库 `EXIST-D/exist.github.io`
4. Pages CMS 会自动读取仓库根目录下的 `.pages.yml`
5. 直接在网页中编辑：
   - `学习笔记`
   - `项目作品`
   - `站点基础信息`
   - `首页文案`

## Markdown 和 LaTeX 写法

- 普通段落、标题、列表、链接都按 Markdown 写。
- 行内公式写成 `$E=mc^2$`。
- 块级公式写成：

```md
$$
\int_0^1 x^2 dx
$$
```

## 权限说明

- 只有 GitHub 仓库协作者可以提交修改。
- 如果你要给别人写权限，需要在 GitHub 仓库设置里单独授权。
- 建议同时把 `main` 分支设为受保护分支，避免未授权直写。

