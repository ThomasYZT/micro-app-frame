const HTTP_ENV = process.env.HTTP_ENV;

const config = {
  APPID: '',
  AUTHURL: ''
};

switch (HTTP_ENV) {
  case 'test':
    config.APPID = 'wx853a8d12eea0e682';
    config.AUTHURL = 'https://piaoquantv.yishihui.com/';
    break;
  case 'pre':
    config.APPID = 'wx4ad82552268afc8d';
    config.AUTHURL = 'https://pre.piaoquantv.com/';
    break;
  case 'prod':
    config.APPID = 'wx73a6cb4d85be594f';
    config.AUTHURL = 'https://www.piaoquantv.com/';
    break;
}
 export default config;
