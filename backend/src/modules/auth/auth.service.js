const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./user.model');

const JWT_SECRET = process.env.JWT_SECRET || 'pethaven_secret_key';

const register = async ({ name, email, password }) => {
  if (!name || !email || !password) throw new Error('All fields are required');
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already registered');
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

const login = async ({ email, password }) => {
  if (!email || !password) throw new Error('Email and password are required');
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid email or password');
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

const getMe = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

module.exports = { register, login, getMe };