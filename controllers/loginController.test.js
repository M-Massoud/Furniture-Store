const jwt = require("jsonwebtoken");
const tokens = require('./loginController');
require('dotenv').config();

describe('Can sign and verify tokens', () => {
    test('Sign token with secrt key', () => {
        const data = { id: 1, role: "user" };
        const token = tokens.generateToken(data, process.env.secret_Key);
        const decoded = tokens.validateToken(token, process.env.secret_Key);
        // console.log(decoded);
        expect(decoded).toEqual({
            ...data,
            iat: expect.any(Number),
            exp: expect.any(Number)
        })
    });// test #1

    test('Sign token with secrt key and verfying token with incorrect key throws error', () => {
        const data = { id: 1, role: "user" };
        const token = tokens.generateToken(data, process.env.secret_Key);
        try {
            jwt.verify(token,"wrong_key")
        } catch (err) {
            expect(err instanceof jwt.JsonWebTokenError).toBeTruthy()
        }
       
    });// test #2
});

