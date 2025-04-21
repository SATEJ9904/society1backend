const express = require('express');
const router = express.Router();
const {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember
} = require('../controllers/memberControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createMember);
router.get('/', getAllMembers);
router.get('/:id', getMemberById);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

module.exports = router;