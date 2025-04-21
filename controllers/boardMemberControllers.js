const createBoardMember = async (req, res) => {
    try {
      const boardMember = new req.models.BoardMember(req.body);
      await boardMember.save();
      res.status(201).json(boardMember);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllBoardMembers = async (req, res) => {
    try {
      const boardMembers = await req.models.BoardMember.find();
      res.json(boardMembers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getBoardMemberById = async (req, res) => {
    try {
      const boardMember = await req.models.BoardMember.findById(req.params.id);
      if (!boardMember) {
        return res.status(404).json({ error: 'Board member not found' });
      }
      res.json(boardMember);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateBoardMember = async (req, res) => {
    try {
      const boardMember = await req.models.BoardMember.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!boardMember) {
        return res.status(404).json({ error: 'Board member not found' });
      }
      res.json(boardMember);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteBoardMember = async (req, res) => {
    try {
      const boardMember = await req.models.BoardMember.findByIdAndDelete(req.params.id);
      if (!boardMember) {
        return res.status(404).json({ error: 'Board member not found' });
      }
      res.json({ message: 'Board member deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createBoardMember,
    getAllBoardMembers,
    getBoardMemberById,
    updateBoardMember,
    deleteBoardMember
  };