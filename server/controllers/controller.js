const { User, Cats } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const axios = require('axios');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client()

module.exports = class Controller {

    // USER CONTROLLER

    static async googleLogin(req, res) {
        try {
            const { google_token } = req.body

            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const payload = ticket.getPayload()

            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: Math.random().toString()
                }
            })
            const access_token = signToken({ id: user.id })

            res.status(created ? 201 : 200).json({
                "message": `User ${user.email} found`,
                "access_token": access_token,
                "user": {
                    "name": user.name
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async userLogin(req, res) {
        try {
            const { email, password } = req.body
            // console.log(req.body, "<<<< req body");
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

            if (error.name === `BadRequest`) {
                return res.status(400).json({ message: error.message });
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

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'fernandordyansyah@gmail.com',
                    pass: 'rfgb svzp utas fnrd'
                }
            });


            // async..await is not allowed in global scope, must use a wrapper
            async function main() {
                // send mail with defined transport object
                const info = await transporter.sendMail({
                    from: '"Fred Foo 👻" <foo@example.com>', // sender address
                    to: "dzakii8@gmail.com, fernandordyansyah@gmail,com", // list of receivers
                    subject: "Welcoming to TrivCat", // Subject line
                    text: "Welcome to TrivCat, Hope you enjoy the website activity 🐾 ", // plain text body
                    html: "<b>Hello world?</b>", // html body
                });

                console.log("Message sent: %s", info.messageId);
            }

            main().catch(console.error);

        } catch (error) {

            console.log(error);

            res.status(500).json({ message: `Internal Server Error` })

        }
    }


    // CATS CONTROLLER
    static async getCatsData(req, res) {
        try {
            // const data = await axios.get('/')
            const data = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10')

            // console.log(data, "<<< data");

            res.status(200).json({ data: data.data })

        } catch (error) {

            console.log(error);

        }
    }

    static async favCatsById(req, res) {
        console.log(req.user.id, "<<< req user");
        try {
            // console.log(req.params.id);
            const { url } = req.body
            const data = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10')

            const setData = data.data.filter(el =>
                el.id = req.user.id
            )


            const cats = await Cats.create({
                imgUrl: url,
                UserId: req.user.id
            })

            console.log(setData, "<<< in iset data");

        } catch (error) {
            console.log(error);
        }
    }

    static async showFavCats(req, res) {

        try {
            const findCats = await Cats.findAll()
            // const users = await User.findAll({
            //     where : {
            //         id: req.user.id
            //     },
            //     includes: {
            //         model: Cats
            //     }
            // })

            res.status(200).json({ data: findCats })
            // console.log(findCats, "<<<");
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteFavCats(req, res) {
        try {
            const { id } = req.params;

            const deletedRows = await Cats.destroy({
                where: {
                    // UserId: req.user.id,
                    id
                },
            });

            if (deletedRows > 0) {
                res.status(200).json({ message: 'Favorite cat deleted successfully' });
            } else {
                res.status(404).json({ message: 'Favorite cat not found or you are not authorized' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async editProfile(req, res) {
        try {
            const {id} = req.params
            const{ username } = req.body
            const users = await User.findByPk(id)
            if(!users) throw {name: `NotFound`}
            await users.update({
                username
            })
            res.status(200).json({message: `Data Updated`})
        } catch (error) {
            console.log(error);
        }
    }
}