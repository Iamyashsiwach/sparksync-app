import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';
import { User } from '@/lib/models';

// Define Task schema for this API
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  dueDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

// Check if model exists before creating
const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

// GET all tasks
export async function GET(req: NextRequest) {
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

    // Get tasks with populated user data
    const tasks = await Task.find({})
      .populate('assignedTo', 'name email department position')
      .sort({ createdAt: -1 });

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST create a new task
export async function POST(req: NextRequest) {
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

    // Get request data
    const { title, description, assignedTo, priority, dueDate } = await req.json();

    // Validate data
    if (!title || !description || !assignedTo || !dueDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate assignedTo user exists
    const userExists = await User.findById(assignedTo);
    if (!userExists) {
      return NextResponse.json(
        { error: 'Assigned user not found' },
        { status: 404 }
      );
    }

    // Create task
    const task = new Task({
      title,
      description,
      assignedTo,
      priority,
      dueDate: new Date(dueDate),
      status: 'pending'
    });

    await task.save();
    
    // Populate user data for response
    const populatedTask = await Task.findById(task._id)
      .populate('assignedTo', 'name email department position');

    return NextResponse.json(
      { message: 'Task created successfully', task: populatedTask },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
} 