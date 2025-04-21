const express = require('express');
const router = express.Router();
const {
  createInvoiceDetail,
  getAllInvoiceDetails,
  getInvoiceDetailById,
  updateInvoiceDetail,
  deleteInvoiceDetail
} = require('../controllers/invoiceDetailControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createInvoiceDetail);
router.get('/', getAllInvoiceDetails);
router.get('/:id', getInvoiceDetailById);
router.put('/:id', updateInvoiceDetail);
router.delete('/:id', deleteInvoiceDetail);

module.exports = router;