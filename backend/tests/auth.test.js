const request = require('supertest');
const app = require('../src/app');
const UserRepository = require('../src/repositories/user.repository');
const bcrypt = require('bcryptjs');

// Mock the UserRepository
jest.mock('../src/repositories/user.repository');

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/login', () => {
    it('should return a token for valid credentials', async () => {
      const mockPassword = 'Password123!';
      const hashedPassword = await bcrypt.hash(mockPassword, 10);
      
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: hashedPassword,
        name: 'Test User',
        role: 'USER',
      };

      UserRepository.findByEmail.mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: mockPassword,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
    });

    it('should return 401 for invalid password', async () => {
      const hashedPassword = await bcrypt.hash('Password123!', 10);
      
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: hashedPassword,
        name: 'Test User',
        role: 'USER',
      };

      UserRepository.findByEmail.mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'WrongPassword!',
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
    });

    it('should return 404 for non-existent user', async () => {
      UserRepository.findByEmail.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'notfound@example.com',
          password: 'Password123!',
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
    });
  });
});
