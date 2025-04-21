const createInvoiceTemplate = async (req, res) => {
    try {
      const invoiceTemplate = new req.models.InvoiceTemplate(req.body);
      await invoiceTemplate.save();
      res.status(201).json(invoiceTemplate);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllInvoiceTemplates = async (req, res) => {
    try {
      const invoiceTemplates = await req.models.InvoiceTemplate.find();
      res.json(invoiceTemplates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getInvoiceTemplateById = async (req, res) => {
    try {
      const invoiceTemplate = await req.models.InvoiceTemplate.findById(req.params.id);
      if (!invoiceTemplate) {
        return res.status(404).json({ error: 'Invoice template not found' });
      }
      res.json(invoiceTemplate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateInvoiceTemplate = async (req, res) => {
    try {
      const invoiceTemplate = await req.models.InvoiceTemplate.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!invoiceTemplate) {
        return res.status(404).json({ error: 'Invoice template not found' });
      }
      res.json(invoiceTemplate);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteInvoiceTemplate = async (req, res) => {
    try {
      const invoiceTemplate = await req.models.InvoiceTemplate.findByIdAndDelete(req.params.id);
      if (!invoiceTemplate) {
        return res.status(404).json({ error: 'Invoice template not found' });
      }
      res.json({ message: 'Invoice template deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createInvoiceTemplate,
    getAllInvoiceTemplates,
    getInvoiceTemplateById,
    updateInvoiceTemplate,
    deleteInvoiceTemplate
  };