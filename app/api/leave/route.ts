import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import { LeaveRequest } from '@/lib/models';

// Get all leave requests (for admins/managers) or user's leave requests
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
    const userId = url.searchParams.get('userId');
    const status = url.searchParams.get('status');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');

    // Build query
    const query: any = {};
    
    // For non-admin/manager users, restrict to their own leave requests
    if (session.user.role !== 'admin' && session.user.role !== 'manager') {
      query.user = session.user.id;
    } else if (userId) {
      query.user = userId;
    }

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    // Fetch leave requests with pagination
    const skip = (page - 1) * limit;
    const leaveRequests = await LeaveRequest.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name email department position')
      .populate('approvedBy', 'name email')
      .lean();

    const total = await LeaveRequest.countDocuments(query);

    return NextResponse.json({
      requests: leaveRequests,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error: any) {
    console.error('Error fetching leave requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leave requests' },
      { status: 500 }
    );
  }
}

// Create a new leave request
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
    const { startDate, endDate, type, reason, attachmentUrl } = await req.json();

    // Validate required fields
    if (!startDate || !endDate || !type || !reason) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new leave request
    const leaveRequest = new LeaveRequest({
      user: session.user.id,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      type,
      reason,
      attachmentUrl
    });

    await leaveRequest.save();

    return NextResponse.json({
      message: 'Leave request submitted successfully',
      request: leaveRequest
    });

  } catch (error: any) {
    console.error('Error creating leave request:', error);
    return NextResponse.json(
      { error: 'Failed to submit leave request' },
      { status: 500 }
    );
  }
} 