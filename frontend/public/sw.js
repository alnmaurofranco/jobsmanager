if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise((async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]}))},s=(s,a)=>{Promise.all(s.map(e)).then((e=>a(1===e.length?e[0]:e)))},a={require:Promise.resolve(s)};self.define=(s,i,r)=>{a[s]||(a[s]=Promise.resolve().then((()=>{let a={};const n={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return a;case"module":return n;default:return e(s)}}))).then((e=>{const s=r(...e);return a.default||(a.default=s),a}))})))}}define("./sw.js",["./workbox-04f19e8b"],(function(e){"use strict";importScripts("fallback-W6PIwpSXStM8jZQt6amHq.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/W6PIwpSXStM8jZQt6amHq/_buildManifest.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/W6PIwpSXStM8jZQt6amHq/_ssgManifest.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/0c428ae2-10f4dbee4adf280b2e59.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/675-95cc0f48f010d3cce1c5.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/876-44305f3571e4e0b1a6e6.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/893-bbad78fc60ca0163ba32.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/996-00b4c4d5f8d80ac92fd3.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/ae51ba48-6b2bde54eefe55d91394.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/d7eeaac4-729c66916a2491383aa5.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/framework-c5113a73163ba9a6512c.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/main-8c6dca79728b9430023e.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/pages/404-d158aa5fa08ffaebc563.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/pages/500-4f07438da1a117e40f64.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/pages/_app-9b6c8effe9b47f9f3910.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/pages/_error-9faf4177fb4e528b4124.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/pages/_offline-e7fe9d1d5f3c892db224.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/pages/account/reset/%5B...password%5D-202ca914e2e1b5bae2c0.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/pages/dashboard-d0b70faceabf2e1267fb.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/pages/dashboard/job-e78cc17bc259084a3151.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/pages/dashboard/job/edit/%5Bid%5D-04fa77d6c8907c3a3f97.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/pages/dashboard/profile-2de842699847ed131aa7.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/pages/dashboard/profile/changepassword-5a925fe41c75a8a8a53b.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/pages/email/%5B...confirmation%5D-cc48edd4272b7801903a.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/pages/forgot-password-1131a416b0da13e90437.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/pages/index-eb0eda88695accdfcbd0.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/pages/login-d5ece9d940c2f418b2f0.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/pages/register-665c3fb81907a8a78580.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/chunks/webpack-6d72c6ed51d58793f029.js",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_next/static/css/f9b498b7deacf46ea189.css",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/_offline",revision:"W6PIwpSXStM8jZQt6amHq"},{url:"/check.gif",revision:"d058ce4c550462dee3251ed6ee4409bb"},{url:"/images/404.svg",revision:"d7652ed1455ca16d9ce9fe2231d8e2c3"},{url:"/images/500.svg",revision:"e121a69bbefdce3df34ac3a3e933f7c6"},{url:"/images/alert-octagon.svg",revision:"6ff89a7b7e7e967e9f7e09809c2edcce"},{url:"/images/apple-touch-icon.png",revision:"8e559990785722e57e3a6ecf7654e341"},{url:"/images/back.svg",revision:"d9d8f6a46c3e27d8e9213b0c1d500c56"},{url:"/images/confirmed.svg",revision:"5f973188c84da7be8cbe6d3c20cd3c8e"},{url:"/images/edit-24.svg",revision:"fe5ac73ff9b80d52fc0ead32803df371"},{url:"/images/favicon.ico",revision:"f35d252c1e4ce3ba2ec237c9f541e49f"},{url:"/images/favicon.png:Zone.Identifier",revision:"70289be2409625d523643b997ee803a1"},{url:"/images/icons/android-chrome-192x192.png",revision:"9451e264d3176f4ad28898693628b688"},{url:"/images/icons/android-chrome-512x512.png",revision:"ed9fc2ccc8690e8bced8b9495108fd4e"},{url:"/images/icons/android-icon-128x128.png",revision:"7ec090828144935a33d74db31c8dd4ed"},{url:"/images/icons/android-icon-144x144.png",revision:"c0f2a9516ed079010845cf554ca2f6e6"},{url:"/images/icons/android-icon-152x152.png",revision:"72d71949e6ccae19093ad0fbff0e7032"},{url:"/images/icons/android-icon-36x36.png",revision:"033697a12d47d82589eba504465e044d"},{url:"/images/icons/android-icon-384x384.png",revision:"06e7a4f9ded5456da96e1605a92346fd"},{url:"/images/icons/android-icon-48x48.png",revision:"0be21bb5f199c8f9ff2bcbcd2b82a553"},{url:"/images/icons/android-icon-72x72.png",revision:"7c09c339bcad1125c4aca8ed657721b5"},{url:"/images/icons/android-icon-96x96.png",revision:"0ce4f31be11477a16104871c6e806ae0"},{url:"/images/icons/apple-icon-120x120.png",revision:"035a0bab56e3a5a2ca5c9e2d0962ac9b"},{url:"/images/icons/apple-icon-152x152.png",revision:"ce1f55372dcfc75edc23f7efb517381c"},{url:"/images/icons/apple-icon-180x180.png",revision:"fe77a6e1cb308a77b90e41c0eb6b8167"},{url:"/images/icons/apple-icon-76x76.png",revision:"310be73cb3bdf406cc06f02a8abf8d41"},{url:"/images/icons/apple-icon.png",revision:"177748e6428772627764206f4a9b248f"},{url:"/images/icons/browserconfig.xml",revision:"d6327aa082ff4d68560afe16b62c31ce"},{url:"/images/icons/favicon-16x16.png",revision:"9f421e99fa7691929cadfee55ae0f308"},{url:"/images/icons/favicon-32x32.png",revision:"280bc5b808de809acbe53d276ec75231"},{url:"/images/icons/favicon-96x96.png",revision:"c5a53dc477fd0071fd98f88358555eaf"},{url:"/images/icons/favicon.png",revision:"0b0016166722191b3b16f0ea6c5a183a"},{url:"/images/icons/ms-icon-144x144.png",revision:"06bd755a0c12d42e48cfa2bfd95f786f"},{url:"/images/icons/safari-pinned-tab.svg",revision:"08c63ab97683ac818261d78ded7d8bab"},{url:"/images/logo.png",revision:"2d17e8473f499689f69a775f46e784e1"},{url:"/images/logo.svg",revision:"1608be37dfc7c2794550c8015b70bd37"},{url:"/images/logo@black.svg",revision:"6ec42600cf74d3eddcad6ef72d852540"},{url:"/images/money-color.svg",revision:"43fb5e9a18a1ccc1188a28f743ce0b7f"},{url:"/images/money-gray.svg",revision:"68883c32bc12672c0e963ce9cd9d96ab"},{url:"/images/mstile-150x150.png",revision:"7ca0bdd6bd863fd38ad4bed4438d78e3"},{url:"/images/mstile-310x310.png",revision:"3f0ed2e34891b01fc2d52ee9b98bd4bc"},{url:"/images/no-jobs.svg",revision:"5a0cfbdbe7f2faf0cbd5827a663fb96e"},{url:"/images/offline-fallback.jpg",revision:"78bfaa1c3bc084b3150de34edede2e2a"},{url:"/images/offline-fallback.svg",revision:"cba80094fd30fabdae815ae9fb2e9726"},{url:"/images/play.svg",revision:"9175c8a3941b826e363ff534e4ee18ce"},{url:"/images/plus-24.svg",revision:"065ce1e8b4ef558b5d25ebaa70a20247"},{url:"/images/plus-orange.svg",revision:"dd8b06592098515b881096eeaf55bef6"},{url:"/images/rede-social.jpg",revision:"536a2a27fd4b3e9e74a571a5ac22efae"},{url:"/images/stop.svg",revision:"a01f7f4ccaf5aa80be6dd22a4a9837b7"},{url:"/images/trash-24.svg",revision:"fc73681ed8c29e9c1ff2a7979350815d"},{url:"/images/trash-48.svg",revision:"b790540fd94d04a70871086be92df991"},{url:"/manifest.json",revision:"bc2124af964f78df42834a034773d66b"},{url:"/styles/Home.module.css",revision:"beedf1de9bff01e07ce4b58e8ee391cd"},{url:"/styles/globals.css",revision:"6b6bb9bbb610226450e8d3f2d870112f"},{url:"/styles/main.css",revision:"b95b22ef491fea0cc83024f7c142fd52"},{url:"/styles/pages/index.css",revision:"e34eb718098f5c7418551b7cca380c65"},{url:"/styles/pages/job.css",revision:"2424190002293022ae9823a6c271cc18"},{url:"/styles/pages/profile.css",revision:"a25badf0229b257d13bde6a946f092a8"},{url:"/styles/pages/sign.css",revision:"4ecb549c70b75bff51183238a2bfe3b1"},{url:"/styles/pages/signup.css",revision:"6ea2d2df2efc65d549092ec97e572bc3"},{url:"/styles/partials/animations.css",revision:"275375f46581926ff5daf3cd747d1a84"},{url:"/styles/partials/buttons.css",revision:"b9f0c544d926b2e8cda6d56e67e083dd"},{url:"/styles/partials/cards.css",revision:"5e917d830fc0710a1f6466a84abc4840"},{url:"/styles/partials/forms.css",revision:"35bcf03cbcdb0603efa4c52eebc03082"},{url:"/styles/partials/modal.css",revision:"4ee93dbeebef010484236a339cc0d1e5"},{url:"/styles/partials/page-header.css",revision:"73b42036597c5b33d031eb98cfba2a4a"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[{handlerDidError:async({request:e})=>self.fallback(e)},new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600,purgeOnQuotaError:!0})]}),"GET")}));
