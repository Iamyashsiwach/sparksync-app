import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import { LeaveRequest, ILeaveRequest } from '@/lib/models';
import mongoose from 'mongoose';

// Get a single leave request by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await connectToDatabase();

    const { id } = params;

    // Validate ID
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid leave request ID' }, { status: 400 });
    }

    // Find leave request
    const leaveRequest = await LeaveRequest.findById(id)
      .populate('user', 'name email department position')
      .populate('approvedBy', 'name email')
      .lean();

    if (!leaveRequest) {
      return NextResponse.json({ error: 'Leave request not found' }, { status: 404 });
    }

    // Type assertion for populated user object
    const populatedLeaveRequest = leaveRequest as any;

    // Check if user has permission to view this request
    if (
      session.user.role !== 'admin' && 
      session.user.role !== 'manager' && 
      populatedLeaveRequest.user._id.toString() !== session.user.id
    ) {
      return NextResponse.json({ error: 'Unauthorized to view this leave request' }, { status: 403 });
    }

    return NextResponse.json({ request: leaveRequest });
    
  } catch (error: any) {
    console.error('Error fetching leave request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leave request' },
      { status: 500 }
    );
  }
}

// Update a leave request
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has permission to update leave requests (admin or manager)
    if (session.user.role !== 'admin' && session.user.role !== 'manager') {
      return NextResponse.json({ error: 'Unauthorized to update leave requests' }, { status: 403 });
    }

    // Connect to database
    await connectToDatabase();

    const { id } = params;
    const { status } = await request.json();

    // Validate ID
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid leave request ID' }, { status: 400 });
    }

    // Validate status
    if (!status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // Find leave request
    const leaveRequest = await LeaveRequest.findById(id);

    if (!leaveRequest) {
      return NextResponse.json({ error: 'Leave request not found' }, { status: 404 });
    }

    if (leaveRequest.status !== 'pending') {
      return NextResponse.json({ 
        error: `Leave request already ${leaveRequest.status}` 
      }, { status: 400 });
    }

    // Update leave request
    leaveRequest.status = status;
    leaveRequest.approvedBy = session.user.id;
    leaveRequest.approvalDate = new Date();
    
    await leaveRequest.save();

    return NextResponse.json({
      message: `Leave request ${status} successfully`,
      request: leaveRequest
    });
    
  } catch (error: any) {
    console.error('Error updating leave request:', error);
    return NextResponse.json(
      { error: 'Failed to update leave request' },
      { status: 500 }
    );
  }
}

// Delete a leave request (only allowed for pending requests)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await connectToDatabase();

    const { id } = params;

    // Validate ID
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid leave request ID' }, { status: 400 });
    }

    // Find leave request
    const leaveRequest = await LeaveRequest.findById(id);

    if (!leaveRequest) {
      return NextResponse.json({ error: 'Leave request not found' }, { status: 404 });
    }

    // Check if user has permission to delete this request
    const isOwner = leaveRequest.user.toString() === session.user.id;
    const isAdmin = session.user.role === 'admin';
    
    if (!isOwner && !isAdmin) {
      return NextResponse.json({ 
        error: 'Unauthorized to delete this leave request' 
      }, { status: 403 });
    }

    // Only allow deletion of pending requests
    if (leaveRequest.status !== 'pending' && !isAdmin) {
      return NextResponse.json({ 
        error: 'Only pending leave requests can be deleted' 
      }, { status: 400 });
    }

    // Delete leave request
    await LeaveRequest.findByIdAndDelete(id);

    return NextResponse.json({ 
      message: 'Leave request deleted successfully' 
    });
    
  } catch (error: any) {
    console.error('Error deleting leave request:', error);
    return NextResponse.json(
      { error: 'Failed to delete leave request' },
      { status: 500 }
    );
  }
} 