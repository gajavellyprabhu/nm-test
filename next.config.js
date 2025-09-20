const jssConfig = require('./src/temp/config');
const { getPublicUrl } = require('@sitecore-jss/sitecore-jss-nextjs/utils');
const plugins = require('./src/temp/next-config-plugins') || {};
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
// const nrExternals = require('newrelic/load-externals');

const publicUrl = getPublicUrl();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Set assetPrefix to our public URL
  assetPrefix: publicUrl,
  images: {
    domains: [
      'new-murabba.mirummea.com',
      'node.new-murabba.mirummea.com',
      'newmurabbasc.dev.local',
      '10.150.18.83',
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/webp'],
  },
  // swcMinify: false,
  // Allow specifying a distinct distDir when concurrently running app in a container
  distDir: process.env.NEXTJS_DIST_DIR || '.next',

  // Make the same PUBLIC_URL available as an environment variable on the client bundle
  env: {
    PUBLIC_URL: publicUrl,
    // nextImageExportOptimizer_imageFolderPath: "public/pictures",
    // nextImageExportOptimizer_exportFolderPath: "out",
    // nextImageExportOptimizer_quality: "100",
    // nextImageExportOptimizer_storePicturesInWEBP: "true",
    // nextImageExportOptimizer_exportFolderName: "nextImageExportOptimizer",
    // nextImageExportOptimizer_generateAndUseBlurImages: "true",
  },

  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: ['en', 'ar'],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: jssConfig.defaultLanguage,
    // localeDetection: false,
  },
  // trailingSlash: true,
  // Enable React Strict Mode
  reactStrictMode: true,

  output: 'standalone',

  async rewrites() {
    // When in connected mode we want to proxy Sitecore paths off to Sitecore
    return [
      // API endpoints
      {
        source: '/sitecore/api/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/api/:path*`,
      },
      // media items
      {
        source: '/-/:path*',
        destination: `${jssConfig.sitecoreApiHost}/-/:path*`,
      },
      // healthz check
      {
        source: '/healthz',
        destination: '/api/healthz',
      },
      // rewrite for Sitecore service pages
      {
        source: '/sitecore/service/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/service/:path*`,
      },
      {
        source: '/api/jss/:path*',
        destination: `${jssConfig.sitecoreApiHost}/api/jss/:path*`,
      },
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.output.publicPath = publicUrl;
    // Apply New Relic externalization to prevent mangling of instrumented modules
    // nrExternals(config);
    return config;
  },
};

module.exports = () => {
  // Run the base config through any configured plugins
  return Object.values(plugins).reduce(
    (acc, plugin) => plugin(acc),
    withBundleAnalyzer(nextConfig)
  );
};