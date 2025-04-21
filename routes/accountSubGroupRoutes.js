const express = require('express');
const router = express.Router();
const {
  createAccountSubgroup,
  getAllAccountSubgroups,
  getAccountSubgroupById,
  updateAccountSubgroup,
  deleteAccountSubgroup
} = require('../controllers/accountSubGroupController');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createAccountSubgroup);
router.get('/', getAllAccountSubgroups);
router.get('/:id', getAccountSubgroupById);
router.put('/:id', updateAccountSubgroup);
router.delete('/:id', deleteAccountSubgroup);

module.exports = router;