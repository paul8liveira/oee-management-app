const serverURL = 'https://oee-server.appspot.com/api/';
export const environment = {
  production: true,
  version: '0.0.7',
  userAuthenticationURL: `${serverURL}auth`,
  feedURL: `${serverURL}:userId/:channelId/:machineCode/:date/:limit/feed/mobile`,
  userAddURL: `${serverURL}user`,  
  channelListURL: `${serverURL}:userId/channel`,
  machineListURL: `${serverURL}:userId/:channelId/machine/list`,
  userGetDataByTokenPassURL: `${serverURL}user/data`,
  machineChangeStateURL: `${serverURL}machine/state`,
  productionURL: `${serverURL}feed/production`,
};