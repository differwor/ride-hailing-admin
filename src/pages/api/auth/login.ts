import type { NextApiRequest, NextApiResponse } from 'next'
import _omit from 'lodash/omit'
import { User } from '@/types/auth';
import { users } from '@/mockData/user';
import { permissions } from '@/mockData/permission';
import { createToken } from '@/lib/02.jose';
import { AUTH_COOKIE_NAME } from '@/const/01.auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      data: null
    })
  }
  
  try {
    const { email, password } = req.body;

    // Simulate query user info
    const user: User | undefined = users.find(u => u.email === email);

    if (!user) {
      return res.status(200).json({
        success: false,
        message: 'User not found',
        data: null
      })
    }

    if (user.password !== password) {
      return res.status(200).json({ success: false, message: 'Invalid password', data: null });
    }

    // Simulate query permissions by role
    const permissionsByRole = permissions.find(p => p.role === user.role);
    user.permissions = permissionsByRole?.actions || [];

    // Remove password from user data
    const userWithoutPassword = _omit(user, 'password');

    // Generate JWT token
    const token = await createToken(userWithoutPassword);

    // Set HTTP-only cookie
    res.setHeader("Set-Cookie", `${AUTH_COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; Max-Age=86400`); // 24 hours

    // Return user data without password
    return res.status(200).json({ success: true, message: "Login successfully", data: userWithoutPassword });
  } catch (error: unknown) {
    res.status(500).json({ error })
  }
}