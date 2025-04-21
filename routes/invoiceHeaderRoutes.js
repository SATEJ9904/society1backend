const express = require('express');
const router = express.Router();
const {
  createInvoiceHeader,
  getAllInvoiceHeaders,
  getInvoiceHeaderById,
  updateInvoiceHeader,
  deleteInvoiceHeader
} = require('../controllers/invoiceHeaderControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createInvoiceHeader);
router.get('/', getAllInvoiceHeaders);
router.get('/:id', getInvoiceHeaderById);
router.put('/:id', updateInvoiceHeader);
router.delete('/:id', deleteInvoiceHeader);

module.exports = router;