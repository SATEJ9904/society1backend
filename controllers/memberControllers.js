const createMember = async (req, res) => {
    try {
      const member = new req.models.Member(req.body);
      await member.save();
      res.status(201).json(member);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllMembers = async (req, res) => {
    try {
      const members = await req.models.Member.find();
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getMemberById = async (req, res) => {
    try {
      const member = await req.models.Member.findById(req.params.id);
      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }
      res.json(member);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateMember = async (req, res) => {
    try {
      const member = await req.models.Member.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }
      res.json(member);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteMember = async (req, res) => {
    try {
      const member = await req.models.Member.findByIdAndDelete(req.params.id);
      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }
      res.json({ message: 'Member deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember
  };