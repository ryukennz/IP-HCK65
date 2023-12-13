const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const axios = require('axios');
module.exports = class Controller {

    static async userLogin(req, res) {
        try {

            const { email, password } = req.body
            if (!email) throw ({ name: `BadRequest` })
            
            if (!password) throw ({ name: `BadRequest` })
            
            const user = await User.findOne({
                where: { email }
            })
            
            if (!user) throw ({ name: `BadRequest`, message: `You don't have an account` })
            
            const isComparePassword = comparePassword(password, user.password)

            if (!isComparePassword) throw ({ name: `BadRequest`, message: `Password is wrong`, status: 401 })

            const access_token = signToken({ id: user.id })
            console.log(access_token, "<< ini kita dapat akses token");
            res.status(200).json({ access_token })

        } catch (error) {

            console.log(error);

            if(error.name === `BadRequest`) {
                return res.status(400).json({message: error.message});
            }
            res.status(500).json({ message: `Internal Server Error` })
        }
    }

    static async userRegister(req, res) {

        try {
            const { username, email, password } = req.body
            const data = await User.create({
                username,
                email,
                password
            })
            res.status(201).json({ id: data.id, email: data.email })

        } catch (error) {

            console.log(error);

            res.status(500).json({ message: `Internal Server Error` })

        }
    }

    static async getCatsData(req, res) {
        try {
            // const data = await axios.get('/')
            let name = 'abyssinian';
            const data = await axios.get('https://api.api-ninjas.com/v1/cats?name=' + name, {
                headers: {
                    'X-Api-Key': process.env.API_NINJAS_KEY
                }
            })
            res.status(200).json({data: data})

        } catch (error) {

            console.log(error);
            
        }
    }
}