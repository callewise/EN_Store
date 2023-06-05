const User = require('../models/User');

// Controller action to handle user registration
async function registerUser(req, res) {
  const { username, password, email } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }]
    });

    if (existingUser) {
      res.status(409).json({ message: 'Username or email already exists' });
      return;
    }

    // Create a new user
    const newUser = new User({
      username: username,
      password: password,
      email: email
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Controller action to handle user login
async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    // Find the user in the database by username
    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Check if the provided password matches the stored password
    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    // Set the user ID in the session
    req.session.userId = user._id;

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  registerUser,
  loginUser
};
