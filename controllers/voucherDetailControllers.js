const createVoucherDetail = async (req, res) => {
    try {
      const voucherDetail = new req.models.VoucherDetail(req.body);
      await voucherDetail.save();
      res.status(201).json(voucherDetail);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllVoucherDetails = async (req, res) => {
    try {
      const voucherDetails = await req.models.VoucherDetail.find();
      res.json(voucherDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getVoucherDetailById = async (req, res) => {
    try {
      const voucherDetail = await req.models.VoucherDetail.findById(req.params.id);
      if (!voucherDetail) {
        return res.status(404).json({ error: 'Voucher detail not found' });
      }
      res.json(voucherDetail);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateVoucherDetail = async (req, res) => {
    try {
      const voucherDetail = await req.models.VoucherDetail.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!voucherDetail) {
        return res.status(404).json({ error: 'Voucher detail not found' });
      }
      res.json(voucherDetail);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteVoucherDetail = async (req, res) => {
    try {
      const voucherDetail = await req.models.VoucherDetail.findByIdAndDelete(req.params.id);
      if (!voucherDetail) {
        return res.status(404).json({ error: 'Voucher detail not found' });
      }
      res.json({ message: 'Voucher detail deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createVoucherDetail,
    getAllVoucherDetails,
    getVoucherDetailById,
    updateVoucherDetail,
    deleteVoucherDetail
  };