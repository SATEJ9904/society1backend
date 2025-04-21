const createParking = async (req, res) => {
    try {
      const parking = new req.models.Parking(req.body);
      await parking.save();
      res.status(201).json(parking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllParkings = async (req, res) => {
    try {
      const parkings = await req.models.Parking.find();
      res.json(parkings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getParkingById = async (req, res) => {
    try {
      const parking = await req.models.Parking.findById(req.params.id);
      if (!parking) {
        return res.status(404).json({ error: 'Parking not found' });
      }
      res.json(parking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateParking = async (req, res) => {
    try {
      const parking = await req.models.Parking.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!parking) {
        return res.status(404).json({ error: 'Parking not found' });
      }
      res.json(parking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteParking = async (req, res) => {
    try {
      const parking = await req.models.Parking.findByIdAndDelete(req.params.id);
      if (!parking) {
        return res.status(404).json({ error: 'Parking not found' });
      }
      res.json({ message: 'Parking deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createParking,
    getAllParkings,
    getParkingById,
    updateParking,
    deleteParking
  };