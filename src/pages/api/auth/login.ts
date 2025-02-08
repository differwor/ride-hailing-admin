import type { NextApiRequest, NextApiResponse } from 'next'
import _omit from 'lodash/omit'

// Mock user database
const mockUsers = [
  {
    id: 1,
    username: 'admin1',
    password: '1234' // In real app, this would be hashed
  },
  {
    id: 1,
    username: 'operator1',
    password: '1234' 
  }
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(500).json({
      success: false,
      message: 'Method not allowed'
    })
  }
  
  try {
    const { username, password } = req.body;

    // Simulate query user info
    const user = mockUsers.find(u => u.username === username);
    if (!user || user.password !== password) {
      return res.status(200).json({ success: false, message: 'Invalid credentials' });
    }

    // Mock JWT token creation
    const mockToken = `mock_token_${user.id}_${Date.now()}`;

    // Set mock session cookie
    res.setHeader('Set-Cookie', `session=${mockToken}; Path=/; HttpOnly`);

    // return user data without password
    return res.status(200).json({ success: true, user: _omit(user, 'password') });
  } catch (error: unknown) {
    res.status(500).json({ error })
  }
}