/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: require('./site.config.js').SITE_URL,
  generateRobotsTxt: true, // (optional) tạo robots.txt luôn
  outDir: 'public',
  // Nếu có route động, có thể custom thêm ở đây
};
