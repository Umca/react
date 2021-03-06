import { keys } from './keys';

// const CLIENT_ID = 'ad21d83a19eb43bdb4b56a1fe34af258'
const API_HOST = 'https://api.instagram.com';
const REDIRECT_URI = `${window.location.origin}/oauth`;
let token = window.localStorage.getItem('INSTA_TOKEN') || '';

const API = {
  login() {
    window.location.replace(
      `${API_HOST}/oauth/authorize/?client_id=${
        keys.instagram.CLIENT_ID
      }&redirect_uri=${REDIRECT_URI}&response_type=token`
    );
  },

  setToken(newToken) {
    token = newToken;
    localStorage.INSTA_TOKEN = newToken;
  },

  hasAuth() {
    return !!token;
  },

  getPhotos() {
    if (!token) {
      throw new Error('Token is not yet set');
    }
    return fetch(
      `${API_HOST}/v1/users/self/media/recent/?access_token=${token}`
    )
      .then(res => res.json())
      .then(res => res.data)
      .then(data =>
        data.map(entry => ({
          id: entry.id,
          url: entry.images.standard_resolution.url
        }))
      );
  }
};

window.API = API;

export default API;
