const express = require('express');
const router = express.Router();
const {
  createReceiptVoucher,
  getAllReceiptVouchers,
  getReceiptVoucherById,
  updateReceiptVoucher,
  deleteReceiptVoucher
} = require('../controllers/receiptVoucherControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createReceiptVoucher);
router.get('/', getAllReceiptVouchers);
router.get('/:id', getReceiptVoucherById);
router.put('/:id', updateReceiptVoucher);
router.delete('/:id', deleteReceiptVoucher);

module.exports = router;