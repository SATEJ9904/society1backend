const createAccountSubgroup = async (req, res) => {
    try {
      const accountSubgroup = new req.models.AccountSubgroup(req.body);
      await accountSubgroup.save();
      res.status(201).json(accountSubgroup);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllAccountSubgroups = async (req, res) => {
    try {
      const accountSubgroups = await req.models.AccountSubgroup.find();
      res.json(accountSubgroups);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getAccountSubgroupById = async (req, res) => {
    try {
      const accountSubgroup = await req.models.AccountSubgroup.findById(req.params.id);
      if (!accountSubgroup) {
        return res.status(404).json({ error: 'Account subgroup not found' });
      }
      res.json(accountSubgroup);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateAccountSubgroup = async (req, res) => {
    try {
      const accountSubgroup = await req.models.AccountSubgroup.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!accountSubgroup) {
        return res.status(404).json({ error: 'Account subgroup not found' });
      }
      res.json(accountSubgroup);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteAccountSubgroup = async (req, res) => {
    try {
      const accountSubgroup = await req.models.AccountSubgroup.findByIdAndDelete(req.params.id);
      if (!accountSubgroup) {
        return res.status(404).json({ error: 'Account subgroup not found' });
      }
      res.json({ message: 'Account subgroup deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createAccountSubgroup,
    getAllAccountSubgroups,
    getAccountSubgroupById,
    updateAccountSubgroup,
    deleteAccountSubgroup
  };