module.exports.passwordconfirm = 'Eng:Mena Afefe';
module.exports.ExpireInJsonWebTokenSignUpAndRestPassword = () => { return (Date.now() - (3600000 * 456)) }
module.exports.ExpireInJsonWebTokenForLogIn = () => { return (Date.now() - (3600000 * 456)) - 720000; }// Just add one houre
module.exports.HostServer = '192.168.1.2';

exports.DataEmail = {
    service: "gmail",
    auth: {
        user: "teste.learningnodejs@gmail.com",
        pass: "dqedfjtrrceudgbr"
    },
    tls: {
        rejectUnauthorized: false
    }
}