const express = require('express');
const router = express.Router();
const {
  createDemoMember,
  getAllDemoMembers,
  getDemoMemberById,
  updateDemoMember,
  deleteDemoMember
} = require('../controllers/demoMemberControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createDemoMember);
router.get('/', getAllDemoMembers);
router.get('/:id', getDemoMemberById);
router.put('/:id', updateDemoMember);
router.delete('/:id', deleteDemoMember);

module.exports = router;