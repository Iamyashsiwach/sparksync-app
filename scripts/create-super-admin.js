/**
 * Script to create a super admin user for the attendance system
 * 
 * Run with: node scripts/create-super-admin.js
 */
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');
const readline = require('readline');

// Create interface for reading input from command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Connect to MongoDB
async function connectToDB() {
  try {
    // Use environment variable or fall back to hardcoded connection string for convenience
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://revee:mongo4revee@revee.38xwfdy.mongodb.net/";
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    return mongoose.connection.db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

// Create User schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  department: String,
  position: String,
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: String,
  isActive: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Check if model exists before defining it
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Function to create super admin user
async function createSuperAdmin() {
  try {
    await connectToDB();
    
    // Get user details from command line input
    const name = await askQuestion('Enter full name: ');
    const email = await askQuestion('Enter email: ');
    const password = await askQuestion('Enter password: ');
    const department = await askQuestion('Enter department: ');
    const position = await askQuestion('Enter position: ');

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      console.log(`\nUser with email ${email} already exists.`);
      
      // Prompt to update to super admin if not already
      if (existingUser.role !== 'super-admin') {
        const confirm = await askQuestion('Do you want to update this user to super-admin? (y/n): ');
        
        if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
          await User.updateOne({ email }, { role: 'super-admin' });
          console.log(`\nUser ${email} role updated to super-admin.`);
        } else {
          console.log('\nOperation cancelled.');
        }
      } else {
        console.log(`\nUser ${email} is already a super-admin.`);
      }
    } else {
      // Create new super admin user
      const newUser = new User({
        name,
        email,
        password,
        role: 'super-admin',
        department,
        position,
        joinedAt: new Date(),
        isActive: true
      });
      
      await newUser.save();
      console.log(`\nSuper admin user created successfully: ${email}`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating super admin:', error);
    process.exit(1);
  }
}

// Helper function for promisified readline
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Run the script
createSuperAdmin(); 