import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import AuthService from './auth.service.js';

describe('AuthService', () => {
	it('login returns a string token', () => {
		const svc = new AuthService();
		const token = svc.login('alice', 'alice@example.com');
		assert.equal(typeof token, 'string');
	});

	it('login returns expected placeholder token', () => {
		const svc = new AuthService();
		const token = svc.login('bob', 'bob@example.com');
		assert.equal(token, 'yourToken');
	});

	it('login ignores inputs currently (future behavior)', () => {
		const svc = new AuthService();
		const token1 = svc.login('user1', 'u1@mail');
		const token2 = svc.login('user2', 'u2@mail');
		assert.equal(token1, token2, 'Placeholder implementation should be deterministic');
	});
});
