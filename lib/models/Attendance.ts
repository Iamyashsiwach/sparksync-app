import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IAttendance extends Document {
  user: IUser['_id'];
  date: Date;
  checkIn: Date | null;
  checkOut: Date | null;
  status: 'present' | 'absent' | 'late' | 'halfday' | 'leave';
  workingHours: number | null;
  notes?: string;
}

const AttendanceSchema = new Schema<IAttendance>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: () => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
  },
  checkIn: {
    type: Date,
    default: null,
  },
  checkOut: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'halfday', 'leave'],
    default: 'absent',
  },
  workingHours: {
    type: Number,
    default: null,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

// Indexes for faster queries
AttendanceSchema.index({ user: 1, date: 1 }, { unique: true });
AttendanceSchema.index({ date: 1 });
AttendanceSchema.index({ status: 1 });

// Calculate working hours when checking out
AttendanceSchema.pre('save', function(next) {
  if (this.checkIn && this.checkOut) {
    // Calculate hours between check-in and check-out
    this.workingHours = Number(
      ((this.checkOut.getTime() - this.checkIn.getTime()) / (1000 * 60 * 60)).toFixed(2)
    );
    
    // Set status based on working hours
    if (this.workingHours >= 8) {
      this.status = 'present';
    } else if (this.workingHours >= 4) {
      this.status = 'halfday';
    } else {
      this.status = 'late';
    }
  }
  next();
});

export default mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', AttendanceSchema); 