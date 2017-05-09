var config = require('../config');
var jwt = require('jsonwebtoken');
var request = require('request');

module.exports = {
    login: function (req, res) {
        if (req.query.err) {
            // Error
            res.send("<script>window.opener.location.href = '" + config.daVinciAuthNotAuthorizedRedirectUrl + "';window.close();</script>");
            return;
        }
        res.cookie('DaVinciAuthToken', req.query.token, { maxAge: 315360000, httpOnly: true });
        if (req.query.returnUrl) {
            res.send("<script>window.opener.location.href = '" + req.query.returnUrl + "';window.close();</script>");
        } else {
            res.send("<script>window.opener.location.href = '/';window.close();</script>");
        }
    },
    logout: function (req, res) {
        res.cookie('DaVinciAuthToken', '', { maxAge: 315360000, httpOnly: true });
    },
    middleware: function (req, res, next) {
        if (req.cookies.DaVinciAuthToken == undefined) {
            res.redirect(config.daVinciAuthNotAuthorizedRedirectUrl);
            return;
        }
        request(config.daVinciAuthValidateUrl + req.cookies.DaVinciAuthToken, function (err, doc, body) {
            var data;
            try {
                data = JSON.parse(body);
            } catch (ex) {
                res.redirect(config.daVinciAuthNotAuthorizedRedirectUrl);
                return;
            }
            if (data.err) {
                // Something went wrong
                res.redirect(config.daVinciAuthNotAuthorizedRedirectUrl);
                return;
            }
            jwt.verify(data.token, config.daVinciAuthKey, function (err, decoded) {
                if (err) {
                    res.redirect(config.daVinciAuthNotAuthorizedRedirectUrl);
                    return;
                }
                res.cookie('DaVinciAuthToken', data.token, { maxAge: 315360000, httpOnly: true });
                req.daVinciAuthUser = decoded;
                next();
            });
        });
    }
};