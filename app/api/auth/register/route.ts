import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { User } from '@/lib/models';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    // Connect to database
    await connectToDatabase();

    // Get request body
    const { name, email, password, department, position, role = 'employee', secretKey } = await req.json();

    // Basic validation
    if (!name || !email || !password || !department || !position) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate email domain
    if (!email.endsWith('@reveeinfotech.com')) {
      return NextResponse.json(
        { error: 'Only reveeinfotech.com email addresses are allowed' },
        { status: 400 }
      );
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // For development: Allow super-admin creation with a secret key
    let userRole = role;
    
    // Secret key check for super admin creation (use "super-admin-secret-123" as the key)
    if (secretKey === "super-admin-secret-123" && role === 'super-admin') {
      userRole = 'super-admin';
      console.log('Super admin user created via secret key');
    } else {
      userRole = 'employee'; // Default to employee for regular registration
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password, // Will be hashed by the pre-save hook in User model
      department,
      position,
      role: userRole,
    });

    await newUser.save();

    // Return success message without exposing sensitive user data
    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          department: newUser.department,
          position: newUser.position,
          role: newUser.role
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
} 