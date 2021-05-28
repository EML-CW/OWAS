const crypto = require('crypto');
const str = require('@supercharge/strings');

const genNewToken = () => {
    let newToken = crypto.createHash('sha256').update(str.random(10)).digest('base64');
    while (str(newToken).contains('+'))
        newToken = crypto.createHash('sha256').update(str.random(10)).digest('base64');
    return (newToken);
}

const compPwds = (input, target) => {
    const inputHash = crypto.createHash('sha256').update(input).digest('base64');
    if (inputHash === target)
        return (true);
    else
        return (false);
}

module.exports = {
    genToken: genNewToken,
    checkHash: compPwds
}