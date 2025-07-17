/**
 * Script to verify MongoDB connection and authentication credentials
 * Run with: node scripts/verify-auth.js
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB Connection URI from environment variable or use the production one
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://revee:mongo4revee@revee.38xwfdy.mongodb.net/';

console.log(`Connecting to MongoDB: ${MONGODB_URI}`);

// Create a simplified User schema with password comparison method
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create User model
const User = mongoose.model('User', UserSchema);

async function verifyCredentials(email, password) {
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
    console.error('Error during verification:', error);
    return false;
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
}

// Get email and password from command line arguments or use defaults
const email = process.argv[2] || 'yash.siwach@reveeinfotech.com';
const password = process.argv[3] || 'admin123';

console.log(`Verifying login for ${email} with password: ${password}`);
verifyCredentials(email, password)
  .then(result => {
    console.log(`Login verification result: ${result ? 'Success' : 'Failed'}`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Verification error:', err);
    process.exit(1);
  }); 