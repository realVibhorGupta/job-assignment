const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

// Mock database connection
beforeAll(async () => {
    const mongoURI = process.env.TEST_MONGO_URI;
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// Clean up after each test
afterEach(async () => {
    await User.deleteMany();
});

// Close database connection after tests
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Auth API Tests', () => {
    test('POST /api/signup - should register a new user', async () => {
        const res = await request(app)
            .post('/api/signup')
            .send({
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'password123',
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('token');
    });

    test('POST /api/auth/register - should not register with existing email', async () => {
        await User.create({
            name: 'Existing User',
            email: 'existing@example.com',
            password: 'password123',
        });

        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'New User',
                email: 'existing@example.com',
                password: 'newpassword123',
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('User already exists');
    });

    test('POST /api/auth/login - should login an existing user', async () => {
        const user = await User.create({
            name: 'Login User',
            email: 'login@example.com',
            password: await require('bcrypt').hash('password123', 10),
        });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'login@example.com',
                password: 'password123',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('token');
    });

    test('POST /api/auth/login - should not login with invalid credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'invalid@example.com',
                password: 'wrongpassword',
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Invalid credentials');
    });
});
