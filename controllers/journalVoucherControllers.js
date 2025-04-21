const createJournalVoucher = async (req, res) => {
    try {
      const journalVoucher = new req.models.JournalVoucher(req.body);
      await journalVoucher.save();
      res.status(201).json(journalVoucher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllJournalVouchers = async (req, res) => {
    try {
      const journalVouchers = await req.models.JournalVoucher.find();
      res.json(journalVouchers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getJournalVoucherById = async (req, res) => {
    try {
      const journalVoucher = await req.models.JournalVoucher.findById(req.params.id);
      if (!journalVoucher) {
        return res.status(404).json({ error: 'Journal voucher not found' });
      }
      res.json(journalVoucher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateJournalVoucher = async (req, res) => {
    try {
      const journalVoucher = await req.models.JournalVoucher.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!journalVoucher) {
        return res.status(404).json({ error: 'Journal voucher not found' });
      }
      res.json(journalVoucher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteJournalVoucher = async (req, res) => {
    try {
      const journalVoucher = await req.models.JournalVoucher.findByIdAndDelete(req.params.id);
      if (!journalVoucher) {
        return res.status(404).json({ error: 'Journal voucher not found' });
      }
      res.json({ message: 'Journal voucher deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createJournalVoucher,
    getAllJournalVouchers,
    getJournalVoucherById,
    updateJournalVoucher,
    deleteJournalVoucher
  };