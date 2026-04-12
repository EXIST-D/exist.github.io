# 网页内编辑（推荐 Pages CMS）

这个项目已经补充了 Pages CMS 配置。相比 Netlify Identity + Decap 的邀请制登录，Pages CMS 更适合直接使用 GitHub 账号在浏览器里编辑仓库内容。

## 推荐使用方式

1. 打开 [https://app.pagescms.org](https://app.pagescms.org)
2. 使用 GitHub 账号登录
3. 选择仓库 `hsq20030518/repository`
4. Pages CMS 会自动读取仓库根目录下的 `.pages.yml`
5. 直接在网页中编辑：
   - `学习笔记`
   - `项目作品`
   - `站点基础信息`
   - `首页文案`

## 文件位置

- 笔记内容：`src/content/notes`
- 项目内容：`src/content/projects`
- 站点信息：`src/content/site`

## 已保留的旧方案

仓库中仍保留了 Decap CMS 相关文件，但当前更推荐直接使用 Pages CMS，不再依赖 `/admin` 登录链路。
