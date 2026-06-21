const request = require('supertest');
const app = require('../src/app');
const StoreRepository = require('../src/repositories/store.repository');

jest.mock('../src/repositories/store.repository');

// Mock auth middleware to bypass authentication for tests
jest.mock('../src/middleware/auth.middleware', () => {
  return (req, res, next) => {
    req.user = { id: 1, role: 'ADMIN' };
    next();
  };
});

describe('Store API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/stores', () => {
    it('should return a list of stores', async () => {
      const mockStores = [
        { id: 1, name: 'Store A', averageRating: 4.5 },
        { id: 2, name: 'Store B', averageRating: 3.8 },
      ];

      StoreRepository.findAll.mockResolvedValue(mockStores);

      const response = await request(app).get('/api/stores');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.stores).toHaveLength(2);
      expect(response.body.stores[0].name).toBe('Store A');
    });
  });

  describe('POST /api/stores', () => {
    it('should create a new store successfully', async () => {
      const mockStoreData = {
        name: 'New Store',
        email: 'new@store.com',
        address: '123 Main St',
        ownerId: 2,
      };

      const createdStore = { id: 3, ...mockStoreData, averageRating: 0 };
      
      StoreRepository.create.mockResolvedValue(createdStore);

      const response = await request(app)
        .post('/api/stores')
        .send(mockStoreData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.store).toHaveProperty('id', 3);
    });
  });
});
