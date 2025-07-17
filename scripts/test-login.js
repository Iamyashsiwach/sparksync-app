/**
 * Test script to verify login credentials against the database directly
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB Connection URI from your .env file
const MONGODB_URI = 'mongodb+srv://revee:mongo4revee@revee.38xwfdy.mongodb.net/';

// Create a simplified User schema for testing
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String,
  department: String,
  position: String
});

// Add the comparePassword method
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create User model
const User = mongoose.model('User', UserSchema);

async function testLogin(email, password) {
  try {
    console.log(`Connecting to MongoDB: ${MONGODB_URI}`);
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');

    // Find the user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`No user found with email: ${email}`);
      return false;
    }
    
    console.log(`User found: ${user.email}`);
    console.log(`User details: Name: ${user.name}, Role: ${user.role}`);
    console.log(`Password hash: ${user.password.substring(0, 20)}...`);
    
    // Check password
    const isValid = await user.comparePassword(password);
    console.log(`Password comparison result: ${isValid ? 'Valid' : 'Invalid'}`);
    
    return isValid;
  } catch (error) {
    console.error('Error during test login:', error);
    return false;
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
}

// Get email and password from command line arguments or use defaults
const email = process.argv[2] || 'yash.siwach@reveeinfotech.com';
const password = process.argv[3] || 'reveeinfotech'; // Trying another password

console.log(`Testing login for ${email} with password: ${password}`);
testLogin(email, password)
  .then(result => {
    console.log(`Login test result: ${result ? 'Success' : 'Failed'}`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Test error:', err);
    process.exit(1);
  }); 