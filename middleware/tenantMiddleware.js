const mongoose = require('mongoose');
const getTenantModels = require('../models/tenantModels');

// Cache for tenant-specific models
const tenantModelCache = new Map();

module.exports = async (req, res, next) => {
  const dbName = req.headers['x-tenant-id'] || req.user?.dbName;
  
  if (!dbName) {
    return res.status(400).json({ error: 'Tenant database not specified' });
  }

  try {
    // Check if we already have models for this tenant
    if (tenantModelCache.has(dbName)) {
      req.models = tenantModelCache.get(dbName);
      return next();
    }

    // Create new connection
    const tenantDb = mongoose.connection.useDb(dbName, {
      useCache: true,
      noListener: true,
    });

    // Get models for this tenant
    const models = getTenantModels(tenantDb);
    
    // Cache the models
    tenantModelCache.set(dbName, models);
    req.models = models;
    
    next();
  } catch (error) {
    console.error('Tenant middleware error:', error);
    
    // Clear cache if error occurred
    if (dbName && tenantModelCache.has(dbName)) {
      tenantModelCache.delete(dbName);
    }

    res.status(500).json({ 
      error: 'Failed to initialize tenant models',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};