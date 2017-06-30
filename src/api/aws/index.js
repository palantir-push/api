const express = require('express');

module.exports = ({aws}) => {
    const router = new express.Router();

    router.get('/', (req, res) => {
    //Usage: localhost:4000/aws?username=test&message=Hei&subject=viktig_melding
    var params = {
        TopicArn:'arn:aws:sns:eu-west-1:099317323916:' + req.query.username,
        Message:req.query.message,
        Subject: req.query.subject
    };

    var respons = aws.send(params);
    console.log(respons);
    res.send(respons);

});

    return router;
};