import mongoose from 'mongoose';

const medicineScheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicineName: { type: String, required: true },
  intakeTime: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'taken', 'missed'],
    default: 'pending'
  }
});

const MedicineSchedule = mongoose.model('MedicineSchedule', medicineScheduleSchema);

export default MedicineSchedule;
