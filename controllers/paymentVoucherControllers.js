const createPaymentVoucher = async (req, res) => {
    try {
      const paymentVoucher = new req.models.PaymentVoucher(req.body);
      await paymentVoucher.save();
      res.status(201).json(paymentVoucher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllPaymentVouchers = async (req, res) => {
    try {
      const paymentVouchers = await req.models.PaymentVoucher.find();
      res.json(paymentVouchers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getPaymentVoucherById = async (req, res) => {
    try {
      const paymentVoucher = await req.models.PaymentVoucher.findById(req.params.id);
      if (!paymentVoucher) {
        return res.status(404).json({ error: 'Payment voucher not found' });
      }
      res.json(paymentVoucher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updatePaymentVoucher = async (req, res) => {
    try {
      const paymentVoucher = await req.models.PaymentVoucher.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!paymentVoucher) {
        return res.status(404).json({ error: 'Payment voucher not found' });
      }
      res.json(paymentVoucher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deletePaymentVoucher = async (req, res) => {
    try {
      const paymentVoucher = await req.models.PaymentVoucher.findByIdAndDelete(req.params.id);
      if (!paymentVoucher) {
        return res.status(404).json({ error: 'Payment voucher not found' });
      }
      res.json({ message: 'Payment voucher deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createPaymentVoucher,
    getAllPaymentVouchers,
    getPaymentVoucherById,
    updatePaymentVoucher,
    deletePaymentVoucher
  };