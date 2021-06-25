var fs = require('fs');
const { configureSitemap } = require('@sergeymyssak/nextjs-sitemap');

async function getDynamicPaths() {
  var dir = './writings'
  var data = fs.readdirSync(dir).filter(file => file.includes('.md'));
  data = data.map((item) => item.replace('.md', ''))
  return data.map((item) => `/posts/${item}`);
}

getDynamicPaths().then((paths) => {
  const Sitemap = configureSitemap({
    baseUrl: 'https://naveenhonestraj.in',
    include: paths,
    exclude: ['/posts/*'],
    excludeIndex: true,
    pagesConfig: {
      '/posts/*': {
        priority: '0.5',
        changefreq: 'daily',
      },
    },
    isTrailingSlashRequired: true,
    targetDirectory: __dirname + '/public',
    pagesDirectory: __dirname + '/pages',
  });
  Sitemap.generateSitemap();
});

