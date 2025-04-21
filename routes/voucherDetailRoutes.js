const express = require('express');
const router = express.Router();
const {
  createVoucherDetail,
  getAllVoucherDetails,
  getVoucherDetailById,
  updateVoucherDetail,
  deleteVoucherDetail
} = require('../controllers/voucherDetailControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createVoucherDetail);
router.get('/', getAllVoucherDetails);
router.get('/:id', getVoucherDetailById);
router.put('/:id', updateVoucherDetail);
router.delete('/:id', deleteVoucherDetail);

module.exports = router;