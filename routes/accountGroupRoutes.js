const express = require('express');
const router = express.Router();
const {
  createAccountGroup,
  getAllAccountGroups,
  getAccountGroupById,
  updateAccountGroup,
  deleteAccountGroup
} = require('../controllers/accountGroupControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createAccountGroup);
router.get('/', getAllAccountGroups);
router.get('/:id', getAccountGroupById);
router.patch('/:id', updateAccountGroup);
router.delete('/:id', deleteAccountGroup);

module.exports = router;