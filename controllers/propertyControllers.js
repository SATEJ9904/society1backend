const createProperty = async (req, res) => {
    try {
      const property = new req.models.Property(req.body);
      await property.save();
      res.status(201).json(property);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllProperties = async (req, res) => {
    try {
      const properties = await req.models.Property.find();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getPropertyById = async (req, res) => {
    try {
      const property = await req.models.Property.findById(req.params.id);
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateProperty = async (req, res) => {
    try {
      const property = await req.models.Property.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      res.json(property);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteProperty = async (req, res) => {
    try {
      const property = await req.models.Property.findByIdAndDelete(req.params.id);
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      res.json({ message: 'Property deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createProperty,
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty
  };