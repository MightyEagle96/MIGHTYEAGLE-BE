import SibApiV3Sdk from '@sendinblue/client';
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let apiKey = apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  '***********g7EmIy'
);

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

export const sendEmail = (emailBody: any) => {
  const { subject, sender, to } = emailBody;
  sendSmtpEmail.subject = 'Hi ';
  apiInstance.sendTransacEmail(emailBody).then(
    function (data) {
      console.log('Success o');
    },
    function (error) {
      console.log(error);
    }
  );
};
