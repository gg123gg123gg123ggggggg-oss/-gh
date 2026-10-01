// BACK Shop - 路由映射表
// 路径 -> 页面内容
// 想加新页面？1) 在 lib/pages/ 新建 xxx.js  2) 在这里 import 并加一行  3) 完事。

import { homeHtml } from './pages/home.js';
import { aboutHtml } from './pages/about.js';
import { contactHtml } from './pages/contact.js';
import { projectsHtml } from './pages/projects.js';
import { statsHtml } from './pages/stats.js';
import { notFoundHtml } from './pages/notFound.js';

export const PAGE_MAP = {
  '/': homeHtml,
  '/about': aboutHtml,
  '/contact': contactHtml,
  '/projects': projectsHtml,
  '/stats': statsHtml
};

export const NOT_FOUND_PAGE = notFoundHtml;

export const PAGE_TITLE = {
  '/': '主页',
  '/about': '关于',
  '/contact': '联系',
  '/projects': '项目',
  '/stats': '统计'
};