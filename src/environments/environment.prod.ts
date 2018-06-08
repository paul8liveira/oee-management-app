//const serverURL = 'https://oee-server.appspot.com/api/';
const serverURL = 'http://www.paul8liveira.blog.br:8008/oee/api/';
export const environment = {
  production: true,
  userAuthenticationURL: serverURL + 'user/authentication',
  feedURL: serverURL + ':userId/:date/:limit/feed/mobile',
  userAddURL: serverURL + 'user',  
};