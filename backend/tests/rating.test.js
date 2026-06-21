const request = require('supertest');
const app = require('../src/app');
const RatingRepository = require('../src/repositories/rating.repository');
const StoreRepository = require('../src/repositories/store.repository');

jest.mock('../src/repositories/rating.repository');
jest.mock('../src/repositories/store.repository');

// Mock auth middleware to bypass authentication for tests
jest.mock('../src/middleware/auth.middleware', () => {
  return (req, res, next) => {
    req.user = { id: 1, role: 'USER' };
    next();
  };
});

describe('Rating API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/ratings', () => {
    it('should submit a rating successfully', async () => {
      const mockRatingData = {
        storeId: 10,
        score: 5,
      };

      RatingRepository.findByUserAndStore.mockResolvedValue(null);
      RatingRepository.create.mockResolvedValue({ id: 1, userId: 1, ...mockRatingData });
      StoreRepository.findById.mockResolvedValue({ id: 10, name: 'Test Store' });
      RatingRepository.averageByStore.mockResolvedValue(5);
      StoreRepository.update.mockResolvedValue();

      const response = await request(app)
        .post('/api/ratings')
        .send(mockRatingData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.rating).toHaveProperty('score', 5);
      expect(RatingRepository.create).toHaveBeenCalledWith({ userId: 1, storeId: 10, score: 5 });
      expect(StoreRepository.update).toHaveBeenCalledWith(10, { averageRating: 5 });
    });

    it('should return 400 if rating is invalid (out of bounds)', async () => {
      const response = await request(app)
        .post('/api/ratings')
        .send({ storeId: 10, score: 6 });

      expect(response.status).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });

    it('should return 409 if user has already rated the store', async () => {
      const mockRatingData = {
        storeId: 10,
        score: 5,
      };

      StoreRepository.findById.mockResolvedValue({ id: 10, name: 'Test Store' });
      RatingRepository.findByUserAndStore.mockResolvedValue({ id: 1, userId: 1, storeId: 10, score: 4 });

      const response = await request(app)
        .post('/api/ratings')
        .send(mockRatingData);

      expect(response.status).toBe(409);
      expect(response.body.message).toBe('You have already rated this store. Please edit your existing rating.');
    });
  });
});
