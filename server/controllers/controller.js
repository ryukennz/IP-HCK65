const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const axios = require('axios');
const nodemailer = require('nodemailer');


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
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
              
                //
                // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
                //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
                //       <https://github.com/forwardemail/preview-email>
                //
              }
              
              main().catch(console.error);

        } catch (error) {

            console.log(error);

            res.status(500).json({ message: `Internal Server Error` })

        }
    }

    // static async getCatsData(req, res) {
    //     try {
    //         // const data = await axios.get('/')
    //         let offset = 'abyssinian';
    //         const data = await axios.get('https://api.api-ninjas.com/v1/cats?name=' + name, {
    //             headers: {
    //                 'X-Api-Key': process.env.API_NINJAS_KEY
    //             }
    //         })

    //         res.status(200).json({data: data})

    //     } catch (error) {

    //         console.log(error);
            
    //     }
    // }
}