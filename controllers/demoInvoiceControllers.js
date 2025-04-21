const createDemoInvoice = async (req, res) => {
    try {
      const demoInvoice = new req.models.DemoInvoice(req.body);
      await demoInvoice.save();
      res.status(201).json(demoInvoice);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllDemoInvoices = async (req, res) => {
    try {
      const demoInvoices = await req.models.DemoInvoice.find();
      res.json(demoInvoices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getDemoInvoiceById = async (req, res) => {
    try {
      const demoInvoice = await req.models.DemoInvoice.findById(req.params.id);
      if (!demoInvoice) {
        return res.status(404).json({ error: 'Demo invoice not found' });
      }
      res.json(demoInvoice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateDemoInvoice = async (req, res) => {
    try {
      const demoInvoice = await req.models.DemoInvoice.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!demoInvoice) {
        return res.status(404).json({ error: 'Demo invoice not found' });
      }
      res.json(demoInvoice);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteDemoInvoice = async (req, res) => {
    try {
      const demoInvoice = await req.models.DemoInvoice.findByIdAndDelete(req.params.id);
      if (!demoInvoice) {
        return res.status(404).json({ error: 'Demo invoice not found' });
      }
      res.json({ message: 'Demo invoice deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createDemoInvoice,
    getAllDemoInvoices,
    getDemoInvoiceById,
    updateDemoInvoice,
    deleteDemoInvoice
  };