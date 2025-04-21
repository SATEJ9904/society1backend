const createService = async (req, res) => {
    try {
      const service = new req.models.Service(req.body);
      await service.save();
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllServices = async (req, res) => {
    try {
      const services = await req.models.Service.find();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getServiceById = async (req, res) => {
    try {
      const service = await req.models.Service.findById(req.params.id);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateService = async (req, res) => {
    try {
      const service = await req.models.Service.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      res.json(service);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteService = async (req, res) => {
    try {
      const service = await req.models.Service.findByIdAndDelete(req.params.id);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      res.json({ message: 'Service deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
  };