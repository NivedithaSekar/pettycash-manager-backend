const User = require('../Model/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User with this email already exists.' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = new User({
        name,
        email,
        password: hashedPassword 
      });
  
      await user.save();
      res.status(201).json({ message: "User registered successfully. Please Login"});
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.', error });
    }
  };

  exports.login = async(req,res) => {
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Authentication failed. Invalid password.' });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
        user.jwtToken=token;
        await user.save();
        const userName = user.name;
        res.status(200).json({ message: 'User Successfully Authenticated!', token, userId: user._id, userName,});
      } catch (error) {
        res.status(500).json({ message: `Authentication failed. ${error.message}` });
      }
  }

  exports.getUserInfo = async(req,res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
      } catch (error) {
        res.status(500).json({ message: 'Something went wrong.', error });
      }
  }