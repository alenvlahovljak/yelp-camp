const aws = require('aws-sdk');

function initAWS() {
    aws.config.update({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        signatureVersion: 'v4'
    })

    aws.config.getCredentials(function(err) {
        if (err) {
            console.log(err.stack);
        }
        else {
            console.log("AWS connected. Access key:", aws.config.credentials.accessKeyId);
        }
    });

    return aws;
}

module.exports = initAWS();
