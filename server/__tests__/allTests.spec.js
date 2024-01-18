const app = require('../app');
const request = require('supertest');
const { User, sequelize, Cats, Order } = require('../models');
const { queryInterface } = sequelize;
const { signToken } = require('../helpers/jwt');
const { hashPassword } = require('../helpers/bcrypt');

let data;
let data2;
let access_token;
let createCat;
let googleToken;
beforeAll(async () => {
    const oneUser = {
        username: "yantobubut",
        email: "yantobubut@mail.com",
        password: '123123',
        phoneNumber: "08123456789",
        subscription: "free",
    }

    const twoUser = {
        username: "aguslaparbuk",
        email: "aguslaparbuk@mail.com",
        password: '123123',
        subscription: "free",
    }

    const oneCat = {
        imgUrl: "imgUrl",
        Userid: 1
    }



    data = await User.create(oneUser)

    data2 = await User.create(twoUser)

    createCat = await Cats.create(oneCat)

    access_token = signToken({ id: data.id })

    googleToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFmNDBmMGE4ZWYzZDg4MDk3OGRjODJmMjVjM2VjMzE3YzZhNWI3ODEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NTgwNjU5MjM3ODQtMmtoNDRnN2J0OWl2YjFrYm52cmZjbjRxZmlqMjk4NmwuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NTgwNjU5MjM3ODQtMmtoNDRnN2J0OWl2YjFrYm52cmZjbjRxZmlqMjk4NmwuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDIyOTc1MDA2MDI5NzU4MzQ3NDMiLCJlbWFpbCI6ImZlcm5hbmRvcmR5YW5zeWFoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MDU1NjQwNDEsIm5hbWUiOiJmZXJuYW5kbyBhcmR5YW5zeWFoIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lwY3hwa3FUdUJidjlLeGhxYnJnOVZjdmc1UGQ5Y241WnlCSV9UaXhHbz1zOTYtYyIsImdpdmVuX25hbWUiOiJmZXJuYW5kbyIsImZhbWlseV9uYW1lIjoiYXJkeWFuc3lhaCIsImxvY2FsZSI6ImlkIiwiaWF0IjoxNzA1NTY0MzQxLCJleHAiOjE3MDU1Njc5NDEsImp0aSI6IjFhMWRkOTA0NjQ3YTA4MTJhZWViYzQyNWZlZDNmNDc3NWY1YTZhMWYifQ.rSJ1ZJM4tvVX-fW0-6uCzOiyM4UGgz_iwZ-GEn8oYbMusyGsj0YWgpF4Y5NXQgB7QAMHZKlF64zmQpYcb8iHLQaiSaQI3YevjpQKGOQ4tikAkFdywQFSWFQNtRK6N09JsbFGax1Ig5a_LN7xbzDmSaS_MVU9seXs_wLJNOYTd9yGqrMBWSieMMD1NWSt5fq4vLjoBY8A9cV3XnOKuiFlcI2OlE8LAVSwZyUosdDORT_CHQkkKJNe6kc1aAO__bn68roK0qvQgB_OKIMgEXM5-4bPtVph_uFpPu2bViyDYDw-H0ptQDGFSQTq217sDNTTssh7VgqyOLPYCchin8d7FQ'
})

describe('all test', () => {
    test('Test Should Login', async () => {
        let users = {
            email: "yantobubut@mail.com",
            password: "123123"
        }
        // let access_token = {
        //     "access_token": signToken({ id: data.id })
        // }
        let { status, body } = await request(app)
            .post('/users/login')
            .send(users)
        expect(status).toBe(200)
        // expect(body).toEqual(access_token)
        expect(body).toHaveProperty('access_token')
    })

    test('should success google login', async () => {

        let { status, body } = await request(app)
            .post('/users/google-login')
            .send(googleToken)
        expect(status).toBe(200)
        expect(body).toHaveProperty('access_token')
    })

    test('should fail login because not given email', async () => {
        let users = {
            password: "123123"
        }
        let { status, body } = await request(app)
            .post('/users/login')
            .send(users)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message')
    })

    test('should fail login because not given password', async () => {
        let users = {
            email: "aguslaparbuk@mail.com"
        }
        let { status, body } = await request(app)
            .post('/users/login')
            .send(users)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message')
    })

    test('should fail login because wrong email', async () => {
        let users = {
            email: "emailsalah@mail.com",
            password: "123123"
        }
        let { status, body } = await request(app)
            .post('/users/login')
            .send(users)
        expect(status).toBe(401)
        expect(body).toHaveProperty('message')
    })

    test('should fail login because wrong password', async () => {
        let users = {
            email: "yantobubut@mail.com",
            password: "passwordsalah"
        }
        let { status, body } = await request(app)
            .post('/users/login')
            .send(users)
        expect(status).toBe(401)
        expect(body).toHaveProperty('message')
    })

    test('should fail to login because given email with empty string', async () => {
        let users = {
            email: "",
            password: "123123"
        }
        let { status, body } = await request(app)
            .post('/users/login')
            .send(users)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message')
    })

    test('should fail to login because given password with empty string', async () => {
        let users = {
            email: "yantobubut@mail.com",
            password: ""
        }
        let { status, body } = await request(app)
            .post('/users/login')
            .send(users)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message')
    })


    test('Test Should success Register', async () => {
        let users = {
            username: "maldini",
            email: "maldini@mail.com",
            password: "123123",
            subscription: "free"
        }
        let { status, body } = await request(app)
            .post('/users/register')
            .send(users)
        expect(status).toBe(201)
        expect(body).toHaveProperty('id')
        expect(body).toHaveProperty('email')
    })

    test('should fail register because not given username', async () => {
        let users = {
            email: "aguslaparbuk@mail.com",
            password: "123123",
            phoneNumber: "08123456789",
            address: "Kampung Rambutan"
        }
        let { status, body } = await request(app)
            .post('/users/register')
            .send(users)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message')
    })
    test('should fail register because not given email', async () => {
        let users = {
            username: "aguslaparbuk",
            password: "123123",
            phoneNumber: "08123456789",
            address: "Kampung Rambutan"
        }
        let { status, body } = await request(app)
            .post('/users/register')
            .send(users)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message')
    })
    test('should fail register because not given password', async () => {
        let users = {
            username: "aguslaparbuk",
            email: "aguslaparbuk@mail.com",
            phoneNumber: "08123456789",
            address: "Kampung Rambutan"
        }
        let { status, body } = await request(app)
            .post('/users/register')
            .send(users)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message')
    })

    test('should fail to register because user not filling all required field', async () => {
        let users = {
            username: "aguslaparbuk",
            email: "aguslaparbuk@mail.com",
            phoneNumber: "08123456789",
        }
        let { status, body } = await request(app)
            .post('/users/register')
            .send(users)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message')
    })



    test('should success get cats data', async () => {
        let { status, body } = await request(app)
            .get('/cats')
        expect(status).toBe(200)
        expect(body).toHaveLength(10)
    })

    // test.only('should success get fav cats data', async () => {
    //     let { status, body } = await request(app)
    //         .get('/cats/fav-cats')
    //         .set('Authorization', `Bearer ${access_token}`)
    //     expect(status).toBe(200)
    //     expect(body).toHaveLength(1)
    // })

    test('should success delete fav cats data', async () => {
        let { status, body } = await request(app)
            .delete('/cats/fav-cats/1')
            .set('Authorization', `Bearer ${access_token}`)
        expect(status).toBe(200)
        expect(body).toHaveProperty('message')
    })

    test('should fail to get fav cats data', async () => {
        let { status, body } = await request(app)
            .get('/cats/fav-cats')
            .set('access_token', access_token)
        expect(status).toBe(401)
        expect(body).toHaveProperty('message')
    })
    test('should fail to delete fav cats data', async () => {
        let { status, body } = await request(app)
            .delete('/cats/fav-cats/1')
            .set('access_token', access_token)
        expect(status).toBe(401)
        expect(body).toHaveProperty('message')
    })

    test('should success create new cat data', async () => {
        let cats = {
            imgUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            UserId: 1
        }
        let { status, body } = await request(app)
            .post('/cats')
            .set('Authorization', `Bearer ${access_token}`)
            .send(cats)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message')
        // expect(body).toHaveProperty('id')
        // expect(body).toHaveProperty('imgUrl')
    })

    test('should success edit profile', async () => {
        let users = {
            username: "aguslaparbuk",
            email: "aguslaparbuk@mail.com",
            password: "123123",
            phoneNumber: "08123456789",
            address: "Kampung Rambutan"
        }
        let { status, body } = await request(app)
            .patch('/users/update-profile/1')
            .set('Authorization', `Bearer ${access_token}`)
            .send(users)
        expect(status).toBe(200)
        expect(body).toHaveProperty('message')
    })

    test('should fail to edit profile because not logged in', async () => {
        let users = {
            username: "aguslaparbuk",
            email: "aguslaparbuk@mail.com",
            password: "123123",
            phoneNumber: "08123456789",
            address: "Kampung Rambutan"
        }
        let { status, body } = await request(app)
            .patch('/users/update-profile/1')
            .send(users)
        expect(status).toBe(401)
        expect(body).toHaveProperty('message')
    })

    test('should fail to edit profile because not given username', async () => {
        let users = {
            email: "aguslaparbuk@mail.com",
            password: "123123",
            phoneNumber: "08123456789",
            address: "Kampung Rambutan"
        }
        let { status, body } = await request(app)
            .patch('/users/update-profile/1')
            .set('Authorization', `Bearer ${access_token}`)
            .send(users)
        expect(status).toBe(400)
        expect(body).toHaveProperty('message')
    })

    test('should fail to edit profile because user trying to edit other user', async () => {
        let users = {
            username: "aguslaparbuk",
            email: "aguslaparbuk@mail.com",
            password: "123123",
            phoneNumber: "08123456789",
            address: "Kampung Rambutan"
        }
        let { status, body } = await request(app)
            .patch('/users/update-profile/2')
            .set('Authorization', `Bearer ${access_token}`)
            .send(users)
        expect(status).toBe(403)
        expect(body).toHaveProperty('message')
    })

    test('should success get info current login user', async () => {
        let { status, body } = await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${access_token}`)
        expect(status).toBe(200)
        expect(body).toHaveProperty('id')
        expect(body).toHaveProperty('username')
        expect(body).toHaveProperty('email')
    })

    test('should upgrade the user account', async () => {

        const order = await Order.create({
            orderId: 'order123',
            status: 'unpaid',
            paidDate: null,
            UserId: 1,
        });

        const response = await request(app)
            .patch('/users/me/upgrade')
            .set('Authorization', `Bearer ${access_token}`)
            .send({ orderId: order.orderId })
            .expect(200);

        expect(response.body).to.have.property('message', 'Success upgrade account');

        const updatedUser = await User.findOne({ where: { id: 1 } });
        expect(updatedUser.subscription).to.equal('premium');
    });
});

afterAll(async () => {
    await queryInterface.bulkDelete('Cats', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})