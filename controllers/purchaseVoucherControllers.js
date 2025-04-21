const createPurchaseVoucher = async (req, res) => {
    try {
      const purchaseVoucher = new req.models.PurchaseVoucher(req.body);
      await purchaseVoucher.save();
      res.status(201).json(purchaseVoucher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllPurchaseVouchers = async (req, res) => {
    try {
      const purchaseVouchers = await req.models.PurchaseVoucher.find();
      res.json(purchaseVouchers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getPurchaseVoucherById = async (req, res) => {
    try {
      const purchaseVoucher = await req.models.PurchaseVoucher.findById(req.params.id);
      if (!purchaseVoucher) {
        return res.status(404).json({ error: 'Purchase voucher not found' });
      }
      res.json(purchaseVoucher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updatePurchaseVoucher = async (req, res) => {
    try {
      const purchaseVoucher = await req.models.PurchaseVoucher.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!purchaseVoucher) {
        return res.status(404).json({ error: 'Purchase voucher not found' });
      }
      res.json(purchaseVoucher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deletePurchaseVoucher = async (req, res) => {
    try {
      const purchaseVoucher = await req.models.PurchaseVoucher.findByIdAndDelete(req.params.id);
      if (!purchaseVoucher) {
        return res.status(404).json({ error: 'Purchase voucher not found' });
      }
      res.json({ message: 'Purchase voucher deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createPurchaseVoucher,
    getAllPurchaseVouchers,
    getPurchaseVoucherById,
    updatePurchaseVoucher,
    deletePurchaseVoucher
  };