const express = require('express');
const router = express.Router();
const {
  createUnitType,
  getAllUnitTypes,
  getUnitTypeById,
  updateUnitType,
  deleteUnitType
} = require('../controllers/unitTypeControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createUnitType);
router.get('/', getAllUnitTypes);
router.get('/:id', getUnitTypeById);
router.put('/:id', updateUnitType);
router.delete('/:id', deleteUnitType);

module.exports = router;