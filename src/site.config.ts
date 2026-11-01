import siteData from './content/site/settings.json';

export const siteConfig = {
  site: siteData.site,
  name: siteData.name,
  role: siteData.role,
  headline: siteData.headline,
  title: siteData.title,
  description: siteData.description,
  intro: siteData.intro,
  email: siteData.email,
  github: siteData.github,
  resumeUrl: siteData.resumeUrl,
  location: siteData.location,
  availability: siteData.availability,
};

export const navLinks = [
  { href: '/', label: '首页' },
  { href: '/projects', label: '项目' },
  { href: '/notes', label: '笔记' },
  { href: '/topics', label: '专题' },
  { href: '/about', label: '关于' },
];

export const techHighlights = siteData.techHighlights;
export const projectCategories = [
  { id: 'agent', label: 'Agent 与 RAG' },
  { id: 'skills', label: 'Agent Skills' },
  { id: 'data', label: '数据采集' },
  { id: 'tools', label: '桌面工具' },
] as const;
export const skillGroups = siteData.skillGroups;
export const principles = siteData.principles;
export const timeline = siteData.timeline;
export const contactLinks = siteData.contactLinks;
