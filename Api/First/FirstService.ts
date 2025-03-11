import { clean, createToken } from '../../common';
const moment = require('moment-timezone');

export class FirstService {

  // tslint:disable-next-line:no-null-keyword
  async authenticate(email: string, password: string, name: string = 'Yoni Dough', expirationHours: number = 2) {
    const data: any = {};
    data.accessToken = createToken(clean({
      name,
      email,
      password,
      expiration: moment().add(2, 'hours'),
    }));
    return ({success: true, data, msg: 'login OK' });
  }
}