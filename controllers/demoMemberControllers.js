const createDemoMember = async (req, res) => {
    try {
      const demoMember = new req.models.DemoMember(req.body);
      await demoMember.save();
      res.status(201).json(demoMember);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllDemoMembers = async (req, res) => {
    try {
      const demoMembers = await req.models.DemoMember.find();
      res.json(demoMembers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getDemoMemberById = async (req, res) => {
    try {
      const demoMember = await req.models.DemoMember.findById(req.params.id);
      if (!demoMember) {
        return res.status(404).json({ error: 'Demo member not found' });
      }
      res.json(demoMember);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateDemoMember = async (req, res) => {
    try {
      const demoMember = await req.models.DemoMember.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!demoMember) {
        return res.status(404).json({ error: 'Demo member not found' });
      }
      res.json(demoMember);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteDemoMember = async (req, res) => {
    try {
      const demoMember = await req.models.DemoMember.findByIdAndDelete(req.params.id);
      if (!demoMember) {
        return res.status(404).json({ error: 'Demo member not found' });
      }
      res.json({ message: 'Demo member deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createDemoMember,
    getAllDemoMembers,
    getDemoMemberById,
    updateDemoMember,
    deleteDemoMember
  };