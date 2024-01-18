const {User} = require('../models');

module.exports = async function authorization(req, res, next) {
    try {
        
        const { id } = req.params

        const getEditUser = await User.findByPk(id)

        const user = req.user.id
        
        if (user !== getEditUser.id) throw { name: `Forbidden` }
        
        next()

    } catch (error) {
        console.log(error);
        next(error)
    }
}