const serverURL = 'https://oee-server.appspot.com/api/';
export const environment = {
  production: true,
  version: '0.0.1',
  userAuthenticationURL: serverURL + 'user/authentication',
  feedURL: serverURL + ':userId/:channelId/:machineCode/:date/:limit/feed/mobile',
  userAddURL: serverURL + 'user',  
  channelListURL: serverURL + ':userId/channel',
  machineListURL: serverURL + ':userId/:channelId/machine/list',
};