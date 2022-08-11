const request = require('supertest');
const server = require('./app');
const express = require('express');
const usersRoute = require('./routes/usersRoute');
const baseURL = "http://localhost:8080";


describe('Test Not foun page', () => {
    test('Not found for site 404', async () => {
        const response = await request(server).get('/wrong')
        expect(response.statusCode).toEqual(404)
    });

    test('Check route returns valid response ', async () => {
        const response = await request(server).get('/home')
        console.log(express.Router())
        expect(response.statusCode).toEqual(200)
    });
    test('Check route returns valid response ', async () => {
        const response = await request(baseURL).get('/home')
        console.log(express.Router())
        expect(response.statusCode).toBe(200)
    });
});
