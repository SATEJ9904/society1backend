const createInvoiceHeader = async (req, res) => {
    try {
      const invoiceHeader = new req.models.InvoiceHeader(req.body);
      await invoiceHeader.save();
      res.status(201).json(invoiceHeader);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllInvoiceHeaders = async (req, res) => {
    try {
      const invoiceHeaders = await req.models.InvoiceHeader.find();
      res.json(invoiceHeaders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getInvoiceHeaderById = async (req, res) => {
    try {
      const invoiceHeader = await req.models.InvoiceHeader.findById(req.params.id);
      if (!invoiceHeader) {
        return res.status(404).json({ error: 'Invoice header not found' });
      }
      res.json(invoiceHeader);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateInvoiceHeader = async (req, res) => {
    try {
      const invoiceHeader = await req.models.InvoiceHeader.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!invoiceHeader) {
        return res.status(404).json({ error: 'Invoice header not found' });
      }
      res.json(invoiceHeader);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteInvoiceHeader = async (req, res) => {
    try {
      const invoiceHeader = await req.models.InvoiceHeader.findByIdAndDelete(req.params.id);
      if (!invoiceHeader) {
        return res.status(404).json({ error: 'Invoice header not found' });
      }
      res.json({ message: 'Invoice header deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createInvoiceHeader,
    getAllInvoiceHeaders,
    getInvoiceHeaderById,
    updateInvoiceHeader,
    deleteInvoiceHeader
  };