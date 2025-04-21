const express = require('express');
const router = express.Router();
const {
  createInvoiceTemplate,
  getAllInvoiceTemplates,
  getInvoiceTemplateById,
  updateInvoiceTemplate,
  deleteInvoiceTemplate
} = require('../controllers/invoiceTemplateControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createInvoiceTemplate);
router.get('/', getAllInvoiceTemplates);
router.get('/:id', getInvoiceTemplateById);
router.put('/:id', updateInvoiceTemplate);
router.delete('/:id', deleteInvoiceTemplate);

module.exports = router;