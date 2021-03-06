// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const serverURL = 'http://localhost:3000/oee/api/';
export const environment = {
  production: true,
  version: '0.0.12',
  userAuthenticationURL: `${serverURL}auth`,
  feedURL: `${serverURL}:userId/:channelId/:machineCode/:date/:limit/feed/mobile`,
  userAddURL: `${serverURL}user`,
  channelListURL: `${serverURL}:userId/channel`,
  machineListURL: `${serverURL}:userId/:channelId/machine/list`,
  userGetDataByTokenPassURL: `${serverURL}user/data`,
  machineChangeStateURL: `${serverURL}machine/state`,
  productionURL: `${serverURL}feed/production/v2`,
  chartGaugeURL: `${serverURL}mobile/chart/gauge/:channelId/:machineCode/:date/:ini/:fin`,
  OeeURL: `${serverURL}feed/oee`,
};
