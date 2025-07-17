import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface ILeaveRequest extends Document {
  user: IUser['_id'];
  startDate: Date;
  endDate: Date;
  type: 'sick' | 'vacation' | 'personal' | 'other';
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: IUser['_id'];
  approvalDate?: Date;
  attachmentUrl?: string;
}

const LeaveRequestSchema = new Schema<ILeaveRequest>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ['sick', 'vacation', 'personal', 'other'],
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  approvalDate: {
    type: Date,
  },
  attachmentUrl: {
    type: String,
  }
}, {
  timestamps: true,
});

// Validate that end date is after start date
LeaveRequestSchema.pre('validate', function(next) {
  if (this.startDate && this.endDate) {
    if (this.endDate < this.startDate) {
      this.invalidate('endDate', 'End date must be after start date');
    }
  }
  next();
});

// Add indexes for faster querying
LeaveRequestSchema.index({ user: 1, status: 1 });
LeaveRequestSchema.index({ startDate: 1, endDate: 1 });

export default mongoose.models.LeaveRequest || mongoose.model<ILeaveRequest>('LeaveRequest', LeaveRequestSchema); 