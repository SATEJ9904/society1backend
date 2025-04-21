const express = require('express');
const router = express.Router();
const {
  createContraVoucher,
  getAllContraVouchers,
  getContraVoucherById,
  updateContraVoucher,
  deleteContraVoucher
} = require('../controllers/contraVoucherControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createContraVoucher);
router.get('/', getAllContraVouchers);
router.get('/:id', getContraVoucherById);
router.put('/:id', updateContraVoucher);
router.delete('/:id', deleteContraVoucher);

module.exports = router;