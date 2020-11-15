const withPWA = require('next-pwa');
// const runtimeCaching = require('next-pwa/cache');
const cacheConfig = require('./constants/cacheConfig');

module.exports = withPWA({
    pwa: {
        disable: process.env.NODE_ENV === 'development',
        dest: 'public',
        runtimeCaching: cacheConfig,
    },
});
