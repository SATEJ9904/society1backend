const express = require('express');
const router = express.Router();
const {
  createVoucher,
  getAllVouchers,
  getVoucherById,
  updateVoucher,
  deleteVoucher
} = require('../controllers/voucherControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createVoucher);
router.get('/', getAllVouchers);
router.get('/:id', getVoucherById);
router.put('/:id', updateVoucher);
router.delete('/:id', deleteVoucher);

module.exports = router;