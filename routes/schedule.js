import { Router } from 'express';
import MedicineSchedule from '../models/MedicineSchedule.js';

const router = Router();

// Get all schedules for a user
router.get('/:userId', async (req, res) => {
  try {
    const schedules = await MedicineSchedule.find({ userId: req.params.userId });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve schedules' });
  }
});

// Add a new medicine schedule
router.post('/', async (req, res) => {
  const { userId, medicineName, intakeTime } = req.body;
  try {
    const schedule = new MedicineSchedule({ userId, medicineName, intakeTime });
    await schedule.save();
    res.status(201).json({ message: 'Schedule added' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to add schedule' });
  }
});

// Update a medicine schedule by ID
router.put('/:scheduleId', async (req, res) => {
  const { medicineName, intakeTime } = req.body;
  try {
    const schedule = await MedicineSchedule.findByIdAndUpdate(
      req.params.scheduleId,
      { medicineName, intakeTime },
      { new: true }
    );
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    res.json({ message: 'Schedule updated', schedule });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update schedule' });
  }
});

// Delete a medicine schedule by ID
router.delete('/:scheduleId', async (req, res) => {
  try {
    const schedule = await MedicineSchedule.findByIdAndDelete(req.params.scheduleId);
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    res.json({ message: 'Schedule deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete schedule' });
  }
});

// Update medicine intake status
router.patch('/status/:scheduleId', async (req, res) => {
  const { status } = req.body;
  if (!['pending', 'taken', 'missed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const schedule = await MedicineSchedule.findByIdAndUpdate(
      req.params.scheduleId,
      { status },
      { new: true }
    );
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    res.json({ message: 'Status updated', schedule });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update status' });
  }
});

export default router;
