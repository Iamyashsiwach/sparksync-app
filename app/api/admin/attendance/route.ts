import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import { Attendance } from '@/lib/models';

// Get all attendance records (super admin only)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is a super admin
    if (!session || session.user.role !== 'super-admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    await connectToDatabase();
    
    // Query parameters for filtering
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    // Build query
    const query: any = {};
    
    if (userId) query.user = userId;
    if (status) query.status = status;
    
    // Date filtering
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    const attendanceRecords = await Attendance.find(query)
      .populate('user', 'name email department position')
      .sort({ date: -1 });
    
    return NextResponse.json({ attendanceRecords });
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attendance records' },
      { status: 500 }
    );
  }
}

// Update attendance record (super admin only)
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is a super admin
    if (!session || session.user.role !== 'super-admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { attendanceId, status, checkIn, checkOut, notes } = await req.json();
    
    if (!attendanceId) {
      return NextResponse.json(
        { error: 'Attendance ID is required' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    // Build update object
    const updateData: any = {};
    
    if (status) {
      // Validate status
      const validStatuses = ['present', 'absent', 'late', 'halfday', 'leave'];
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          { error: 'Invalid status' },
          { status: 400 }
        );
      }
      updateData.status = status;
    }
    
    if (checkIn) updateData.checkIn = new Date(checkIn);
    if (checkOut) updateData.checkOut = new Date(checkOut);
    if (notes) updateData.notes = notes;
    
    // Calculate working hours if both check-in and check-out are provided
    if (checkIn && checkOut) {
      const checkInTime = new Date(checkIn).getTime();
      const checkOutTime = new Date(checkOut).getTime();
      
      if (checkOutTime > checkInTime) {
        const diffInHours = (checkOutTime - checkInTime) / (1000 * 60 * 60);
        updateData.workingHours = Number(diffInHours.toFixed(2));
      }
    }
    
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      attendanceId,
      updateData,
      { new: true }
    ).populate('user', 'name email');
    
    if (!updatedAttendance) {
      return NextResponse.json(
        { error: 'Attendance record not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ attendance: updatedAttendance });
  } catch (error) {
    console.error('Error updating attendance record:', error);
    return NextResponse.json(
      { error: 'Failed to update attendance record' },
      { status: 500 }
    );
  }
}

// Create attendance record (super admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is a super admin
    if (!session || session.user.role !== 'super-admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const { userId, date, status, checkIn, checkOut, notes } = await req.json();
    
    if (!userId || !date || !status) {
      return NextResponse.json(
        { error: 'User ID, date, and status are required' },
        { status: 400 }
      );
    }
    
    // Validate status
    const validStatuses = ['present', 'absent', 'late', 'halfday', 'leave'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    // Calculate working hours if both check-in and check-out are provided
    let workingHours = null;
    if (checkIn && checkOut) {
      const checkInTime = new Date(checkIn).getTime();
      const checkOutTime = new Date(checkOut).getTime();
      
      if (checkOutTime > checkInTime) {
        const diffInHours = (checkOutTime - checkInTime) / (1000 * 60 * 60);
        workingHours = Number(diffInHours.toFixed(2));
      }
    }
    
    // Check if attendance record already exists for this user and date
    const existingRecord = await Attendance.findOne({
      user: userId,
      date: new Date(date)
    });
    
    if (existingRecord) {
      return NextResponse.json(
        { error: 'Attendance record already exists for this user and date' },
        { status: 409 }
      );
    }
    
    // Create new attendance record
    const newAttendance = new Attendance({
      user: userId,
      date: new Date(date),
      status,
      checkIn: checkIn ? new Date(checkIn) : null,
      checkOut: checkOut ? new Date(checkOut) : null,
      workingHours,
      notes
    });
    
    await newAttendance.save();
    
    const populatedAttendance = await Attendance.findById(newAttendance._id)
      .populate('user', 'name email');
    
    return NextResponse.json({ attendance: populatedAttendance }, { status: 201 });
  } catch (error) {
    console.error('Error creating attendance record:', error);
    return NextResponse.json(
      { error: 'Failed to create attendance record' },
      { status: 500 }
    );
  }
} 