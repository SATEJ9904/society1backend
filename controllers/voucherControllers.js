const createVoucher = async (req, res) => {
    try {
      const voucher = new req.models.Voucher(req.body);
      await voucher.save();
      res.status(201).json(voucher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllVouchers = async (req, res) => {
    try {
      const vouchers = await req.models.Voucher.find();
      res.json(vouchers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getVoucherById = async (req, res) => {
    try {
      const voucher = await req.models.Voucher.findById(req.params.id);
      if (!voucher) {
        return res.status(404).json({ error: 'Voucher not found' });
      }
      res.json(voucher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateVoucher = async (req, res) => {
    try {
      const voucher = await req.models.Voucher.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!voucher) {
        return res.status(404).json({ error: 'Voucher not found' });
      }
      res.json(voucher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteVoucher = async (req, res) => {
    try {
      const voucher = await req.models.Voucher.findByIdAndDelete(req.params.id);
      if (!voucher) {
        return res.status(404).json({ error: 'Voucher not found' });
      }
      res.json({ message: 'Voucher deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createVoucher,
    getAllVouchers,
    getVoucherById,
    updateVoucher,
    deleteVoucher
  };