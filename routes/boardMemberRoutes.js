const express = require('express');
const router = express.Router();
const {
  createBoardMember,
  getAllBoardMembers,
  getBoardMemberById,
  updateBoardMember,
  deleteBoardMember
} = require('../controllers/boardMemberControllers');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.use(tenantMiddleware);

router.post('/', createBoardMember);
router.get('/', getAllBoardMembers);
router.get('/:id', getBoardMemberById);
router.put('/:id', updateBoardMember);
router.delete('/:id', deleteBoardMember);

module.exports = router;