import mongoose from 'mongoose';

const medicineScheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicineName: { type: String, required: true },
  dosage: { type: String, default: '' }, // ✅ New
  intakeTime: { type: Date, required: true },
  repeat: { type: String, default: '' }, // ✅ New
  status: { type: String, default: 'scheduled' }
});

const MedicineSchedule = mongoose.model('MedicineSchedule', medicineScheduleSchema);

export default MedicineSchedule;
