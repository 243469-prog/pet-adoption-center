const authService = require('./auth.service');

const register = async (req, res) => {
  try {
    const data = await authService.register(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const data = await authService.login(req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await authService.getMe(req.user.id);
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
};

module.exports = { register, login, getMe };