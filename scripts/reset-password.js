/**
 * Script to reset a user's password in the database
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB Connection URI from your .env file
const MONGODB_URI = 'mongodb+srv://revee:mongo4revee@revee.38xwfdy.mongodb.net/';

// Create a simplified User schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String
});

// Create User model
const User = mongoose.model('User', UserSchema);

async function resetPassword(email, newPassword) {
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
    
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update the user's password
    user.password = hashedPassword;
    await user.save();
    
    console.log('Password updated successfully');
    return true;
  } catch (error) {
    console.error('Error during password reset:', error);
    return false;
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
}

// Get email and new password from command line arguments or use defaults
const email = process.argv[2] || 'yash.siwach@reveeinfotech.com';
const newPassword = process.argv[3] || 'admin123';

console.log(`Resetting password for ${email} to "${newPassword}"`);
resetPassword(email, newPassword)
  .then(result => {
    console.log(`Password reset ${result ? 'successful' : 'failed'}`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Reset error:', err);
    process.exit(1);
  }); 