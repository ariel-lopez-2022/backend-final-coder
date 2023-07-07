const nodeMailer = require('nodemailer')
const { MEILING } = require('../config/config')

class Mailing {
    constructor() {
       this.transporter = nodeMailer.createTransport({
        service:'gmail',
        auth: {
            user:MEILING.user  ,
            pass:MEILING.password
        }
       }) 
    }
    sendMail = ({to, subject, html}) => this.transporter.sendMail({to, subject, html})
       
    
}

module.exports = new Mailing() 