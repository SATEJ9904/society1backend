const express = require('express');
const router = express.Router();
const {
  createPaymentVoucher,
  getAllPaymentVouchers,
  getPaymentVoucherById,
  updatePaymentVoucher,
  deletePaymentVoucher
} = require('../controllers/paymentVoucherControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createPaymentVoucher);
router.get('/', getAllPaymentVouchers);
router.get('/:id', getPaymentVoucherById);
router.put('/:id', updatePaymentVoucher);
router.delete('/:id', deletePaymentVoucher);

module.exports = router;