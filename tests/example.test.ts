import request from 'supertest';
import app from '../src/app'; 

const assert = require('assert');

describe('Example Test Suite', () => {
    it('should return true for 1 + 1 = 2', () => {
        assert.strictEqual(1 + 1, 2);
    });

    it('should return 200 OK', (done) => {
        request(app)
            .get('/api/example')
            .expect(200, done);
    });
});

