const express = require('express');

module.exports = ({aws}) => {
    const router = new express.Router();

    router.get('/:awsId', (req, res) => {

    var params = {
        TopicArn:'arn:aws:sns:eu-west-1:099317323916:stigtest',
        Message:req.params.awsId,
        Subject: 'TestSNS'
    };

    var respons = aws.send(params);
    console.log(respons);
    res.send(respons);

});

    return router;
};