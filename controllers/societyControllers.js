const createSociety = async (req, res) => {
    try {
      const society = new req.models.Society(req.body);
      await society.save();
      res.status(201).json(society);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllSocieties = async (req, res) => {
    try {
      const societies = await req.models.Society.find();
      res.json(societies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getSocietyById = async (req, res) => {
    try {
      const society = await req.models.Society.findById(req.params.id);
      if (!society) {
        return res.status(404).json({ error: 'Society not found' });
      }
      res.json(society);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateSociety = async (req, res) => {
    try {
      const society = await req.models.Society.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!society) {
        return res.status(404).json({ error: 'Society not found' });
      }
      res.json(society);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteSociety = async (req, res) => {
    try {
      const society = await req.models.Society.findByIdAndDelete(req.params.id);
      if (!society) {
        return res.status(404).json({ error: 'Society not found' });
      }
      res.json({ message: 'Society deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createSociety,
    getAllSocieties,
    getSocietyById,
    updateSociety,
    deleteSociety
  };