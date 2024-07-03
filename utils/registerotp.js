
const joi = require('joi')


const validator = joi.object({
    email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','net','in']}}).trim(true).required(),
})


module.exports = validator