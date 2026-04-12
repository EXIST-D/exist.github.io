# 个人博客与项目作品集

一个适合放在简历里的个人站，基于 Astro，支持：

- 首页个人介绍与精选项目
- 学习笔记列表与详情
- 项目案例列表与详情
- RSS、sitemap、robots
- 可继续扩展为作品集或技术博客

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 最先需要改的地方

1. 修改 `src/site.config.ts`
   这里放你的名字、求职方向、GitHub、邮箱、地点、是否开放求职、简历链接。
2. 替换 `src/content/projects`
   每个 Markdown 文件就是一个项目案例。
3. 替换 `src/content/notes`
   每个 Markdown 文件就是一篇学习笔记。
4. 修改 `astro.config.mjs`
   把 `site` 改成你自己的正式域名。

## 推荐上线方式

- Vercel
- Netlify
- GitHub Pages

如果你后面要接真实域名，建议先完成：

- 把 `siteConfig.site` 改成真实地址
- 把 `siteConfig.resumeUrl` 换成在线简历或 PDF 地址
- 把示例内容替换成真实项目与笔记
