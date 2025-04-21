const createUnitType = async (req, res) => {
    try {
      const unitType = new req.models.UnitType(req.body);
      await unitType.save();
      res.status(201).json(unitType);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllUnitTypes = async (req, res) => {
    try {
      const unitTypes = await req.models.UnitType.find();
      res.json(unitTypes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getUnitTypeById = async (req, res) => {
    try {
      const unitType = await req.models.UnitType.findById(req.params.id);
      if (!unitType) {
        return res.status(404).json({ error: 'Unit type not found' });
      }
      res.json(unitType);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateUnitType = async (req, res) => {
    try {
      const unitType = await req.models.UnitType.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!unitType) {
        return res.status(404).json({ error: 'Unit type not found' });
      }
      res.json(unitType);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteUnitType = async (req, res) => {
    try {
      const unitType = await req.models.UnitType.findByIdAndDelete(req.params.id);
      if (!unitType) {
        return res.status(404).json({ error: 'Unit type not found' });
      }
      res.json({ message: 'Unit type deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createUnitType,
    getAllUnitTypes,
    getUnitTypeById,
    updateUnitType,
    deleteUnitType
  };