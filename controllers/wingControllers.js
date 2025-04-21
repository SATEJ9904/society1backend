const createWing = async (req, res) => {
    try {
      const wing = new req.models.Wing(req.body);
      await wing.save();
      res.status(201).json(wing);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllWings = async (req, res) => {
    try {
      const wings = await req.models.Wing.find();
      res.json(wings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getWingById = async (req, res) => {
    try {
      const wing = await req.models.Wing.findById(req.params.id);
      if (!wing) {
        return res.status(404).json({ error: 'Wing not found' });
      }
      res.json(wing);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateWing = async (req, res) => {
    try {
      const wing = await req.models.Wing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!wing) {
        return res.status(404).json({ error: 'Wing not found' });
      }
      res.json(wing);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteWing = async (req, res) => {
    try {
      const wing = await req.models.Wing.findByIdAndDelete(req.params.id);
      if (!wing) {
        return res.status(404).json({ error: 'Wing not found' });
      }
      res.json({ message: 'Wing deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createWing,
    getAllWings,
    getWingById,
    updateWing,
    deleteWing
  };