const express = require('express');
const router = express.Router();

// Password strength evaluation logic
const evaluatePassword = (password) => {
  let score = 0;

  // Length checks
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 2;

  // Content checks
  if (/\d/.test(password)) score += 1; // Contains digit
  if (/[A-Z]/.test(password)) score += 1; // Contains uppercase
  if (/[a-z]/.test(password)) score += 1; // Contains lowercase
  if (/[@#$&!%*?]/.test(password)) score += 2; // Contains special character

  // Categorize password
  if (score >= 8) return 'Excellent';
  if (score >= 6) return 'Strong';
  if (score >= 4) return 'Very Good';
  return 'Good';
};

// POST API for password validation
router.post('/validate', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'Password is required.' });
  }

  const strength = evaluatePassword(password);
  res.status(200).json({ strength });
});

module.exports = router;
