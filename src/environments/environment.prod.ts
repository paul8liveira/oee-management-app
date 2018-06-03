//const serverURL = 'https://oee-server.appspot.com/api/';
const serverURL = 'http://www.paul8liveira.blog.br:8008/oee/api/';
export const environment = {
  production: true,
  userAuthenticationURL: serverURL + 'user/authentication',
  machineListURL: serverURL + 'machine/list',       //machine
  machineAddURL: serverURL + 'machine',
  machineUpdateURL: serverURL + 'machine/update',
  machineDeleteURL: serverURL + 'machine/delete',
  channelListURL: serverURL + 'channel',            //channel
  channelAddURL: serverURL + 'channel',
  channelUpdateURL: serverURL + 'channel/update',
  channelDeleteURL: serverURL + 'channel/delete',  
  lastFeedURL: serverURL + 'feed/lastFeed',         //dash 
  chartURL: serverURL + 'feed/chart',
  machinePauseListURL: serverURL + 'machinepause/list',  //machine pause
  machinePauseAddURL: serverURL + 'machinepause',
  machinePauseUpdateURL: serverURL + 'machinepause/update',
  machinePauseDeleteURL: serverURL + 'machinepause/delete',   
  userListURL: serverURL + 'user',                      //user
  userAddURL: serverURL + 'user',
  userUpdateURL: serverURL + 'user/update',
  userDeleteURL: serverURL + 'user/delete',   
};