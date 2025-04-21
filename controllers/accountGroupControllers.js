const createAccountGroup = async (req, res) => {
    try {
      const accountGroup = new req.models.AccountGroup(req.body);
      await accountGroup.save();
      res.status(201).json(accountGroup);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllAccountGroups = async (req, res) => {
    try {
      const accountGroups = await req.models.AccountGroup.find();
      res.json(accountGroups);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getAccountGroupById = async (req, res) => {
    try {
      const accountGroup = await req.models.AccountGroup.findById(req.params.id);
      if (!accountGroup) {
        return res.status(404).json({ error: 'Account group not found' });
      }
      res.json(accountGroup);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateAccountGroup = async (req, res) => {
    try {
      const accountGroup = await req.models.AccountGroup.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!accountGroup) {
        return res.status(404).json({ error: 'Account group not found' });
      }
      res.json(accountGroup);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteAccountGroup = async (req, res) => {
    try {
      const accountGroup = await req.models.AccountGroup.findByIdAndDelete(req.params.id);
      if (!accountGroup) {
        return res.status(404).json({ error: 'Account group not found' });
      }
      res.json({ message: 'Account group deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createAccountGroup,
    getAllAccountGroups,
    getAccountGroupById,
    updateAccountGroup,
    deleteAccountGroup
  };