import { RESTDataSource } from 'apollo-datasource-rest';
import client_credentials from './clientCredentials';

let awaitingAuthorization;

const getToken = () => {
  if (awaitingAuthorization && !client_credentials.isExpired()) {
    // use existing promise, if not expired
    return awaitingAuthorization;
  }
  if (!awaitingAuthorization || client_credentials.isExpired()) {
    awaitingAuthorization = new Promise((resolve, reject) => {
      client_credentials
        .authenticate()
        .then(token => {
          token = 'Bearer ' + token.access_token;
          resolve(token);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  return awaitingAuthorization;
};

class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/';
  }

  async willSendRequest(request) {
    request.headers.set('Authorization', await getToken());
  }

  async getUserDetails(user_id) {
    console.log(`getUserDetails: ${user_id}`);

    const user = await this.get(`users/${user_id}`);

    return user;
  }

  async getCurrentUser() {
    console.log(`getCurrentUser`);

    const user = await this.get(`me`);

    return user;
  }
}

export default SpotifyAPI;
