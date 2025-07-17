import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import { Attendance } from '@/lib/models';

// Handler for GET attendance records
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await connectToDatabase();

    // Get query parameters
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId') || session.user.id;
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    const status = url.searchParams.get('status');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');

    // Build query
    const query: any = { user: userId };
    
    if (startDate && endDate) {
      query.date = { 
        $gte: new Date(startDate), 
        $lte: new Date(endDate) 
      };
    } else if (startDate) {
      query.date = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.date = { $lte: new Date(endDate) };
    }

    if (status) {
      query.status = status;
    }

    // For non-admin users, restrict to viewing only their own records
    if (session.user.role !== 'admin' && session.user.role !== 'manager' && userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized to view other users attendance' }, { status: 403 });
    }

    // Fetch attendance records with pagination
    const skip = (page - 1) * limit;
    const attendanceRecords = await Attendance.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Attendance.countDocuments(query);

    return NextResponse.json({
      records: attendanceRecords,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error: any) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attendance records' },
      { status: 500 }
    );
  }
}

// Handler for POST attendance (check-in or check-out)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await connectToDatabase();

    // Get request body
    const { action, notes } = await req.json();
    
    if (!action || !['check-in', 'check-out'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const userId = session.user.id;
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    // Find existing attendance record for today
    let attendanceRecord = await Attendance.findOne({
      user: userId,
      date: { $gte: startOfDay, $lt: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000) }
    });

    // If no record exists, create one
    if (!attendanceRecord && action === 'check-in') {
      attendanceRecord = new Attendance({
        user: userId,
        date: startOfDay,
        checkIn: new Date(),
        status: 'present',
        notes
      });
      
      await attendanceRecord.save();
      
      return NextResponse.json({
        message: 'Checked in successfully',
        record: attendanceRecord
      });
    }
    
    // If record exists but trying to check in again
    if (attendanceRecord && action === 'check-in' && attendanceRecord.checkIn) {
      return NextResponse.json({ error: 'Already checked in today' }, { status: 400 });
    }
    
    // Update check-in time if it doesn't exist
    if (attendanceRecord && action === 'check-in' && !attendanceRecord.checkIn) {
      attendanceRecord.checkIn = new Date();
      attendanceRecord.status = 'present';
      if (notes) attendanceRecord.notes = notes;
      
      await attendanceRecord.save();
      
      return NextResponse.json({
        message: 'Checked in successfully',
        record: attendanceRecord
      });
    }
    
    // Handle check-out
    if (action === 'check-out') {
      if (!attendanceRecord || !attendanceRecord.checkIn) {
        return NextResponse.json({ error: 'Must check in before checking out' }, { status: 400 });
      }
      
      if (attendanceRecord.checkOut) {
        return NextResponse.json({ error: 'Already checked out today' }, { status: 400 });
      }
      
      attendanceRecord.checkOut = new Date();
      if (notes) attendanceRecord.notes += `\n${notes}`;
      
      await attendanceRecord.save();
      
      return NextResponse.json({
        message: 'Checked out successfully',
        record: attendanceRecord
      });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    
  } catch (error: any) {
    console.error('Error processing attendance action:', error);
    return NextResponse.json(
      { error: 'Failed to process attendance action' },
      { status: 500 }
    );
  }
} 