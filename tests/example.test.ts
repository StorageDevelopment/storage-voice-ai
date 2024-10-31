import request from 'supertest';
import server from '../src/server'; // Adjust the path to your server file

const assert = require('assert');

describe('Example Test Suite', () => {
    it('should return true for 1 + 1 = 2', () => {
        assert.strictEqual(1 + 1, 2);
    });

    it('should return 200 OK', (done) => {
        request(server)
            .get('/api/example')
            .expect(200, done);
    });
});

