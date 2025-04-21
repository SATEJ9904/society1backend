const createReceiptVoucher = async (req, res) => {
    try {
      const receiptVoucher = new req.models.ReceiptVoucher(req.body);
      await receiptVoucher.save();
      res.status(201).json(receiptVoucher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllReceiptVouchers = async (req, res) => {
    try {
      const receiptVouchers = await req.models.ReceiptVoucher.find();
      res.json(receiptVouchers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getReceiptVoucherById = async (req, res) => {
    try {
      const receiptVoucher = await req.models.ReceiptVoucher.findById(req.params.id);
      if (!receiptVoucher) {
        return res.status(404).json({ error: 'Receipt voucher not found' });
      }
      res.json(receiptVoucher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateReceiptVoucher = async (req, res) => {
    try {
      const receiptVoucher = await req.models.ReceiptVoucher.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!receiptVoucher) {
        return res.status(404).json({ error: 'Receipt voucher not found' });
      }
      res.json(receiptVoucher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteReceiptVoucher = async (req, res) => {
    try {
      const receiptVoucher = await req.models.ReceiptVoucher.findByIdAndDelete(req.params.id);
      if (!receiptVoucher) {
        return res.status(404).json({ error: 'Receipt voucher not found' });
      }
      res.json({ message: 'Receipt voucher deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createReceiptVoucher,
    getAllReceiptVouchers,
    getReceiptVoucherById,
    updateReceiptVoucher,
    deleteReceiptVoucher
  };