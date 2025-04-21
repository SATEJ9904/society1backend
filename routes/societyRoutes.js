const express = require('express');
const router = express.Router();
const {
  createSociety,
  getAllSocieties,
  getSocietyById,
  updateSociety,
  deleteSociety
} = require('../controllers/societyControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createSociety);
router.get('/', getAllSocieties);
router.get('/:id', getSocietyById);
router.put('/:id', updateSociety);
router.delete('/:id', deleteSociety);

module.exports = router;