const express = require('express');
const router = express.Router();
const {
  createDemoInvoice,
  getAllDemoInvoices,
  getDemoInvoiceById,
  updateDemoInvoice,
  deleteDemoInvoice
} = require('../controllers/demoInvoiceControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createDemoInvoice);
router.get('/', getAllDemoInvoices);
router.get('/:id', getDemoInvoiceById);
router.put('/:id', updateDemoInvoice);
router.delete('/:id', deleteDemoInvoice);

module.exports = router;