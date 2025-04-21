const express = require('express');
const router = express.Router();
const {
  createJournalVoucher,
  getAllJournalVouchers,
  getJournalVoucherById,
  updateJournalVoucher,
  deleteJournalVoucher
} = require('../controllers/journalVoucherControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createJournalVoucher);
router.get('/', getAllJournalVouchers);
router.get('/:id', getJournalVoucherById);
router.put('/:id', updateJournalVoucher);
router.delete('/:id', deleteJournalVoucher);

module.exports = router;