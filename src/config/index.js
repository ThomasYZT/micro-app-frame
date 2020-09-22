const HTTP_ENV = process.env.HTTP_ENV;

const config = {
  APPID: '',
  AUTHURL: ''
};

switch (HTTP_ENV) {
  case 'test':
    config.APPID = 'wx853a8d12eea0e682';
    config.APPID = 'https://piaoquan.yishihui.com/';
    break;
  case 'pre':
    config.APPID = 'wx853a8d12eea0e682';
    config.APPID = 'https://piaoquan.yishihui.com/';
    break;
  case 'prod':
    config.APPID = 'wx4ad82552268afc8d';
    config.APPID = 'https://piaoquantv.com/';
    break;
}
 export default config;
