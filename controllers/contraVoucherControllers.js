const createContraVoucher = async (req, res) => {
    try {
      const contraVoucher = new req.models.ContraVoucher(req.body);
      await contraVoucher.save();
      res.status(201).json(contraVoucher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllContraVouchers = async (req, res) => {
    try {
      const contraVouchers = await req.models.ContraVoucher.find();
      res.json(contraVouchers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getContraVoucherById = async (req, res) => {
    try {
      const contraVoucher = await req.models.ContraVoucher.findById(req.params.id);
      if (!contraVoucher) {
        return res.status(404).json({ error: 'Contra voucher not found' });
      }
      res.json(contraVoucher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateContraVoucher = async (req, res) => {
    try {
      const contraVoucher = await req.models.ContraVoucher.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!contraVoucher) {
        return res.status(404).json({ error: 'Contra voucher not found' });
      }
      res.json(contraVoucher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteContraVoucher = async (req, res) => {
    try {
      const contraVoucher = await req.models.ContraVoucher.findByIdAndDelete(req.params.id);
      if (!contraVoucher) {
        return res.status(404).json({ error: 'Contra voucher not found' });
      }
      res.json({ message: 'Contra voucher deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createContraVoucher,
    getAllContraVouchers,
    getContraVoucherById,
    updateContraVoucher,
    deleteContraVoucher
  };