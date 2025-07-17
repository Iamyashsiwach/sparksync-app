import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import { LeaveRequest } from '@/lib/models';

// Get all leave requests (super admin only)
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
    const status = searchParams.get('status');
    const userId = searchParams.get('userId');
    
    // Build query
    const query: any = {};
    if (status) query.status = status;
    if (userId) query.user = userId;
    
    const leaveRequests = await LeaveRequest.find(query)
      .populate('user', 'name email department position')
      .populate('approvedBy', 'name')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ leaveRequests });
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leave requests' },
      { status: 500 }
    );
  }
}

// Update leave request status (super admin only)
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

    const { leaveRequestId, status } = await req.json();
    
    if (!leaveRequestId || !status) {
      return NextResponse.json(
        { error: 'Leave request ID and status are required' },
        { status: 400 }
      );
    }
    
    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    const updatedLeaveRequest = await LeaveRequest.findByIdAndUpdate(
      leaveRequestId,
      { 
        status, 
        approvedBy: status !== 'pending' ? session.user.id : undefined,
        approvalDate: status !== 'pending' ? new Date() : undefined
      },
      { new: true }
    ).populate('user', 'name email');
    
    if (!updatedLeaveRequest) {
      return NextResponse.json(
        { error: 'Leave request not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ leaveRequest: updatedLeaveRequest });
  } catch (error) {
    console.error('Error updating leave request:', error);
    return NextResponse.json(
      { error: 'Failed to update leave request' },
      { status: 500 }
    );
  }
} 