import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';

// Get Task model
const Task = mongoose.models.Task;

// Get a single task
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await connectToDatabase();

    const taskId = params.id;
    
    // For employees, only return task if assigned to them
    if (session.user?.role === 'employee') {
      const task = await Task.findOne({
        _id: taskId,
        assignedTo: session.user.id,
      }).populate('assignedTo', 'name email department position');

      if (!task) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
      }

      return NextResponse.json({ task });
    }
    
    // For admins, return any task
    else if (['admin', 'super-admin'].includes(session.user?.role as string)) {
      const task = await Task.findById(taskId)
        .populate('assignedTo', 'name email department position');

      if (!task) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
      }

      return NextResponse.json({ task });
    } 
    
    else {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }
  } catch (error) {
    console.error('Error fetching task:', error);
    return NextResponse.json(
      { error: 'Failed to fetch task' },
      { status: 500 }
    );
  }
}

// Update a task
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await connectToDatabase();

    const taskId = params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // For employees, only allow updating status
    if (session.user?.role === 'employee') {
      // Check if task is assigned to the user
      if (task.assignedTo.toString() !== session.user.id) {
        return NextResponse.json(
          { error: 'You can only update tasks assigned to you' },
          { status: 403 }
        );
      }

      // Only allow updating status
      const { status } = await request.json();
      if (!status) {
        return NextResponse.json(
          { error: 'Missing status field' },
          { status: 400 }
        );
      }

      // Update task
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { $set: { status } },
        { new: true }
      ).populate('assignedTo', 'name email department position');

      return NextResponse.json({
        message: 'Task updated successfully',
        task: updatedTask,
      });
    }
    
    // For admins, allow updating all fields
    else if (['admin', 'super-admin'].includes(session.user?.role as string)) {
      const updates = await request.json();
      
      // Build update object
      const updateData: any = {};
      const allowedFields = ['title', 'description', 'assignedTo', 'priority', 'status', 'dueDate'];
      
      allowedFields.forEach(field => {
        if (updates[field] !== undefined) {
          updateData[field] = field === 'dueDate' ? new Date(updates[field]) : updates[field];
        }
      });
      
      // Update task
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { $set: updateData },
        { new: true }
      ).populate('assignedTo', 'name email department position');

      return NextResponse.json({
        message: 'Task updated successfully',
        task: updatedTask,
      });
    } 
    
    else {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// Delete a task
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user?.role !== 'admin' && session.user?.role !== 'super-admin') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    // Connect to database
    await connectToDatabase();

    const taskId = params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
} 