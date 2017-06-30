const express = require('express');
//Documentation: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SNS.html
module.exports = ({aws}) => {
    const router = new express.Router();

    router.get('/', (req,res) => {
        var command = "publish?username=stigtest&message=Hei&subject=viktig_melding";
        res.send("<a href='" + command + "'>"+command +"</a>")
    });

    router.post('/publish', (req, res) => {
        var params = {
            TopicArn:'arn:aws:sns:eu-west-1:099317323916:' + req.query.username,
            Message:req.query.message,
            Subject: req.query.subject
        };
        res.send(aws.publish(params));
    });

    router.post('/createTopic', (req, res) => {
        var params = {
            Name: req.query.username
        };
        res.send(aws.createTopic(params));
    });

    return router;
};