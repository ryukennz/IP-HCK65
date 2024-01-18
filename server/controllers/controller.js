const { User, Cats } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const axios = require('axios');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client()

module.exports = class Controller {

    // USER CONTROLLER

    static async googleLogin(req, res, next) {
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
            next(error)
            
        }
    }

    static async userLogin(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email || !password) throw { name: `BadRequest` }

            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            if (!user) throw { name: `Unauthorized` }

            const isCorrectPassword = comparePassword(password, user.password)
            // console.log(isCorrectPassword, "<< cek password");

            if (!isCorrectPassword) throw { name: `Unauthorized` }

            const access_token = signToken({ id: user.id})

            res.status(200).json({ access_token })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async userRegister(req, res, next) {

        try {
            const { username, email, password } = req.body

            if(!username || !email || !password) {
                return res.status(400).json({
                    message: `The required field cannot be empty`
                })
            }

            const data = await User.create({
                username,
                email,
                password
            })

            if(!data) throw {name: `SequelizeValidationError`}

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
            

            next(error)

        }
    }


    // CATS CONTROLLER
    static async getCatsData(req, res) {
        try {
            // const data = await axios.get('/')
            const {data} = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10', {
                headers: {
                    'x-api-key': process.env.THE_CAT_API_KEY
                }
            })

            // console.log(data, "<<< data");

            const showData = data

            res.status(200).json(showData)

        } catch (error) {

            console.log(error);
            

        }
    }

    static async favCatsById(req, res, next) {
        // console.log(req.user.id, "<<< req user");
        try {
            // console.log(req.params.id);
            const { url } = req.body
            // const data = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10')

            // const setData = data.data.filter(el =>
            //     el.id = req.user.id
            // )


            const cats = await Cats.create({
                imgUrl: url,
                UserId: req.user.id
            })

            if(!cats) {
                return res.status(400).json({
                    message: `Failed adding cat to favorite list`
                })
            }

            // console.log(setData, "<<< in iset data");

            res.status(201).json({message: `Success adding cat to favorite list`})

        } catch (error) {
            console.log(error);
            
        }
    }

    static async showFavCats(req, res, next) {

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

            res.status(200).json(findCats)
            // console.log(findCats, "<<<");
        } catch (error) {
            console.log(error);
            next(error)
            
        }
    }

    static async deleteFavCats(req, res, next) {
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
            
            next(error)
        }
    }

    static async editProfile(req, res, next) {
        try {
            const {id} = req.params

            const findUser = await User.findByPk(id)

            if(!findUser) throw {name: `NotFound`}
            
            const{ username } = req.body

            if(!username) {
                return res.status(400).json({
                    message: `Username is required`
                })
            }

            await findUser.update({
                username: username
            })
            // const users = await User.findByPk(id)
            // if(!users) throw {name: `NotFound`}
            // await users.update({
            //     username
            // })
            res.status(200).json({message: `Data Updated`})
        } catch (error) {
            console.log(error);
            next(error)
            
        }
    }
}