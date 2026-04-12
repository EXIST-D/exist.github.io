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
  { href: '/admin/', label: '编辑' },
];

export const focusAreas = siteData.focusAreas;
export const skillGroups = siteData.skillGroups;
export const principles = siteData.principles;
export const timeline = siteData.timeline;
export const contactLinks = siteData.contactLinks;
