const express = require('express');
const router = express.Router();
const {
  createParking,
  getAllParkings,
  getParkingById,
  updateParking,
  deleteParking
} = require('../controllers/parkingControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createParking);
router.get('/', getAllParkings);
router.get('/:id', getParkingById);
router.put('/:id', updateParking);
router.delete('/:id', deleteParking);

module.exports = router;