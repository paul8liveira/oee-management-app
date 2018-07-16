const serverURL = 'https://oee-server.appspot.com/api/';
//const serverURL = 'http://www.paul8liveira.blog.br:8008/oee/api/';
export const environment = {
  production: true,
  version: '1.0.0',
  userAuthenticationURL: serverURL + 'user/authentication',
  feedURL: serverURL + ':userId/:channelId/:machineCode/:date/:limit/feed/mobile',
  userAddURL: serverURL + 'user',  
  channelListURL: serverURL + ':userId/channel',
  machineListURL: serverURL + ':userId/:channelId/machine/list',
};