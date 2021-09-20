"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
var client_1 = __importDefault(require("@sendinblue/client"));
var apiInstance = new client_1.default.TransactionalEmailsApi();
var apiKey = apiInstance.setApiKey(client_1.default.TransactionalEmailsApiApiKeys.apiKey, '***********g7EmIy');
var sendSmtpEmail = new client_1.default.SendSmtpEmail();
var sendEmail = function (emailBody) {
    var subject = emailBody.subject, sender = emailBody.sender, to = emailBody.to;
    sendSmtpEmail.subject = 'Hi ';
    apiInstance.sendTransacEmail(emailBody).then(function (data) {
        console.log('Success o');
    }, function (error) {
        console.log(error);
    });
};
exports.sendEmail = sendEmail;
