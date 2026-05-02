const repo = require('./user.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (data) => {
  const { name, email, password } = data;

  if (!email || !password) {
    throw new Error('Email and password required');
  }

  const existing = await repo.findByEmail(email);
  if (existing) {
    throw new Error('Email already exists');
  }

  

  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await repo.create({
    name,
    email,
    password: hashedPassword,
  });

  return userId;
};

exports.login = async (data) => {
  const { email, password } = data;

  const user = await repo.findByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { userId: user.id, role: user.role  },   
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return token;
};