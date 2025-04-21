const createAccount = async (req, res) => {
    try {
      const account = new req.models.Account(req.body);
      await account.save();
      res.status(201).json(account);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllAccounts = async (req, res) => {
    try {
      const accounts = await req.models.Account.find();
      res.json(accounts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getAccountById = async (req, res) => {
    try {
      const account = await req.models.Account.findById(req.params.id);
      if (!account) {
        return res.status(404).json({ error: 'Account not found' });
      }
      res.json(account);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateAccount = async (req, res) => {
    try {
      const account = await req.models.Account.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!account) {
        return res.status(404).json({ error: 'Account not found' });
      }
      res.json(account);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteAccount = async (req, res) => {
    try {
      const account = await req.models.Account.findByIdAndDelete(req.params.id);
      if (!account) {
        return res.status(404).json({ error: 'Account not found' });
      }
      res.json({ message: 'Account deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createAccount,
    getAllAccounts,
    getAccountById,
    updateAccount,
    deleteAccount
  };