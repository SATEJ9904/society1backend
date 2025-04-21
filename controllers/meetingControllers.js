const createMeeting = async (req, res) => {
    try {
      const meeting = new req.models.Meeting(req.body);
      await meeting.save();
      res.status(201).json(meeting);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const getAllMeetings = async (req, res) => {
    try {
      const meetings = await req.models.Meeting.find();
      res.json(meetings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getMeetingById = async (req, res) => {
    try {
      const meeting = await req.models.Meeting.findById(req.params.id);
      if (!meeting) {
        return res.status(404).json({ error: 'Meeting not found' });
      }
      res.json(meeting);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateMeeting = async (req, res) => {
    try {
      const meeting = await req.models.Meeting.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!meeting) {
        return res.status(404).json({ error: 'Meeting not found' });
      }
      res.json(meeting);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteMeeting = async (req, res) => {
    try {
      const meeting = await req.models.Meeting.findByIdAndDelete(req.params.id);
      if (!meeting) {
        return res.status(404).json({ error: 'Meeting not found' });
      }
      res.json({ message: 'Meeting deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createMeeting,
    getAllMeetings,
    getMeetingById,
    updateMeeting,
    deleteMeeting
  };