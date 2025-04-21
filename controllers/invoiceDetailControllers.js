const createInvoiceDetail = async (req, res) => {
    try {
      const invoiceDetail = new req.models.InvoiceDetail(req.body);
      await invoiceDetail.save();
      res.status(201).json(invoiceDetail);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllInvoiceDetails = async (req, res) => {
    try {
      const invoiceDetails = await req.models.InvoiceDetail.find();
      res.json(invoiceDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getInvoiceDetailById = async (req, res) => {
    try {
      const invoiceDetail = await req.models.InvoiceDetail.findById(req.params.id);
      if (!invoiceDetail) {
        return res.status(404).json({ error: 'Invoice detail not found' });
      }
      res.json(invoiceDetail);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateInvoiceDetail = async (req, res) => {
    try {
      const invoiceDetail = await req.models.InvoiceDetail.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!invoiceDetail) {
        return res.status(404).json({ error: 'Invoice detail not found' });
      }
      res.json(invoiceDetail);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteInvoiceDetail = async (req, res) => {
    try {
      const invoiceDetail = await req.models.InvoiceDetail.findByIdAndDelete(req.params.id);
      if (!invoiceDetail) {
        return res.status(404).json({ error: 'Invoice detail not found' });
      }
      res.json({ message: 'Invoice detail deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createInvoiceDetail,
    getAllInvoiceDetails,
    getInvoiceDetailById,
    updateInvoiceDetail,
    deleteInvoiceDetail
  };