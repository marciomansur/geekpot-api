import config from 'config';

var mailgun = require('mailgun-js')({
  apiKey: config.email.key,
  domain: config.email.domain
});

export function signIn(to, toId) {
  return new Promise((resolve, reject) => {
    const link = `${config.server.host}:${config.server.port}/api/user/active/${toId}`;
    const data = {
      from: config.email.from,
      to: to,
      subject: 'Seja bem vindo!',
      html: `Para ativar sua conta, acesse este link: <a href=${link} target='_blank'>${link}</a>`
    };

    mailgun.messages().send(data, (err, body) => {
      if(err) return console.log(err);

      resolve(body);
    })
  });

}
