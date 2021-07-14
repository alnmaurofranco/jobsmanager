const withPWA = require('next-pwa')

module.exports = withPWA({
  webpack5: true,
  pwa: {
    dest: 'public',
    fallbacks: {
      image: '/images/offline-fallback.jpg',
      //document: '/other-offline',  // if you want to fallback to a custom page other than /_offline
      // font: '/static/font/fallback.woff2',
      // audio: ...,
      // video: ...,
    },
    //disable: process.env.NODE_ENV === 'development',
    // register: true,
    // scope: '/app',
    // sw: 'service-worker.js',
    //...
  },
  i18n: {
    locales: ['pt-BR','en-US'],
    defaultLocale: 'pt-BR',
  },
  images: {
    domains: [
      'ui-avatars.com',
      'avatars.githubusercontent.com',
      'avatars1.githubusercontent.com',
      'avatars2.githubusercontent.com',
      'avatars3.githubusercontent.com',
      'avatars4.githubusercontent.com',
      'avatars5.githubusercontent.com',
      'avatars6.githubusercontent.com',
      'avatars7.githubusercontent.com',
      'avatars8.githubusercontent.com',
    ]
  }
})
