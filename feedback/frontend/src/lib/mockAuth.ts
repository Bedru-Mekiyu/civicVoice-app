// Mock authentication for development without backend
// This allows the app to work immediately while backend is being set up

interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string; // In real app, never store passwords in plain text!
  isAdmin: boolean;
  createdAt: string;
}

const USERS_KEY = 'mock_users';
const CURRENT_USER_KEY = 'mock_current_user';

// Initialize with some demo users
const initializeUsers = () => {
  const existingUsers = localStorage.getItem(USERS_KEY);
  if (!existingUsers) {
    const demoUsers: MockUser[] = [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@civicvoice.et',
        password: 'admin123',
        isAdmin: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Demo User',
        email: 'demo@civicvoice.et',
        password: 'demo123',
        isAdmin: false,
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));
  }
};

const getUsers = (): MockUser[] => {
  initializeUsers();
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users: MockUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Create a mock JWT token
const createMockToken = (user: MockUser): string => {
  const payload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  };
  // Simple base64 encoding (not secure, just for demo)
  const header = btoa(JSON.stringify({ alg: 'mock', typ: 'JWT' }));
  const payloadStr = btoa(JSON.stringify(payload));
  const signature = btoa('mock-signature');
  return `${header}.${payloadStr}.${signature}`;
};

export const mockAuth = {
  // Register new user
  register: (name: string, email: string, password: string): { success: boolean; token?: string; error?: string; otp?: string } => {
    const users = getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'User with this email already exists' };
    }

    // Create new user
    const newUser: MockUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      isAdmin: false,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    // Generate mock OTP for verification
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Mock OTP for', email, ':', otp);

    // Store pending user
    localStorage.setItem('mock_pending_user', JSON.stringify({ ...newUser, otp }));

    return { success: true, otp };
  },

  // Activate account with OTP
  activate: (email: string, otp: string): { success: boolean; token?: string; error?: string } => {
    const pendingUser = localStorage.getItem('mock_pending_user');
    if (!pendingUser) {
      return { success: false, error: 'No pending registration found' };
    }

    const userData = JSON.parse(pendingUser);
    if (userData.email !== email || userData.otp !== otp) {
      return { success: false, error: 'Invalid OTP or email' };
    }

    // User is already saved from registration, just activate
    const token = createMockToken(userData);
    localStorage.removeItem('mock_pending_user');
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));

    return { success: true, token };
  },

  // Sign in
  signin: (email: string, password: string): { success: boolean; token?: string; user?: any; error?: string } => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    const token = createMockToken(user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    return { 
      success: true, 
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    };
  },

  // Get current user
  me: (token: string): { success: boolean; user?: any; error?: string } => {
    const currentUser = localStorage.getItem(CURRENT_USER_KEY);
    if (!currentUser) {
      return { success: false, error: 'No user logged in' };
    }

    const user = JSON.parse(currentUser);
    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    };
  },

  // Logout
  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    return { success: true };
  }
};
