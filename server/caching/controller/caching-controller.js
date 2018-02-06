'use strict';
/**
 * Require our modules
 */
const config = require('../../../config/config');
const cacheManager = require('cache-manager');
const memoryCache = cacheManager.caching({ 
    store: config.caching.store, 
    max: config.caching.max, 
    ttl: config.caching.ttl
});

module.exports = {
    // Reset the Cache
	clearCache: () => {
		return memoryCache.reset();
    },
    // Get the Cache
	getMemoryCache: () => {
		return memoryCache;
	}
};