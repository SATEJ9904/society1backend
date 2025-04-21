const express = require('express');
const router = express.Router();
const {
  createPurchaseVoucher,
  getAllPurchaseVouchers,
  getPurchaseVoucherById,
  updatePurchaseVoucher,
  deletePurchaseVoucher
} = require('../controllers/purchaseVoucherControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createPurchaseVoucher);
router.get('/', getAllPurchaseVouchers);
router.get('/:id', getPurchaseVoucherById);
router.put('/:id', updatePurchaseVoucher);
router.delete('/:id', deletePurchaseVoucher);

module.exports = router;