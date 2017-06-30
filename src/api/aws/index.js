const express = require('express');
//Documentation: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SNS.html
module.exports = ({aws}) => {
    const router = new express.Router();

    router.get('/', (req,res) => {
        res.send("<h1>Alternativer:</h1><br/>publish?username&message&subject<br/>createTopic?username<br/>subscribe?protocol&username&endpoint<br/><a href='http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SNS.html'>Read more</a>")
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

    router.post('/subscribe', (req, res) => {
        var params = {
            Protocol: req.query.protocol,
            TopicArn:'arn:aws:sns:eu-west-1:099317323916:' + req.query.username,
            Endpoint: req.query.endpoint
        };
        res.send(aws.subscribe(params));
    });

    return router;
};
/*
 Protocol — (String)
 The protocol you want to use. Supported protocols include:

 http -- delivery of JSON-encoded message via HTTP POST
 https -- delivery of JSON-encoded message via HTTPS POST
 email -- delivery of message via SMTP
 email-json -- delivery of JSON-encoded message via SMTP
 sms -- delivery of message via SMS
 sqs -- delivery of JSON-encoded message to an Amazon SQS queue
 application -- delivery of JSON-encoded message to an EndpointArn for a mobile app and device.
 lambda -- delivery of JSON-encoded message to an AWS Lambda function.
 Endpoint — (String)
 The endpoint that you want to receive notifications. Endpoints vary by protocol:

 For the http protocol, the endpoint is an URL beginning with "http://"
 For the https protocol, the endpoint is a URL beginning with "https://"
 For the email protocol, the endpoint is an email address
 For the email-json protocol, the endpoint is an email address
 For the sms protocol, the endpoint is a phone number of an SMS-enabled device
 For the sqs protocol, the endpoint is the ARN of an Amazon SQS queue
 For the application protocol, the endpoint is the EndpointArn of a mobile app and device.
 For the lambda protocol, the endpoint is the ARN of an AWS Lambda function.
 */