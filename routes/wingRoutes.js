const express = require('express');
const router = express.Router();
const {
  createWing,
  getAllWings,
  getWingById,
  updateWing,
  deleteWing
} = require('../controllers/wingControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createWing);
router.get('/', getAllWings);
router.get('/:id', getWingById);
router.put('/:id', updateWing);
router.delete('/:id', deleteWing);

module.exports = router;