import { registerMicroApps, start } from 'qiankun';

const pcEntry = process.env.HTTP_ENV === 'test'
  ? 'https://uploadtest.yishihui.com/'
  : process.env.HTTP_ENV === 'pre'
    ? 'https://uploadpre.piaoquantv.com/'
    : 'https://upload.piaoquantv.com/';

const clipEntry = process.env.HTTP_ENV === 'test'
  ? 'https://cliptest.yishihui.com/'
  : process.env.HTTP_ENV === 'pre'
    ? 'https://clippre.piaoquantv.com/'
    : 'https://clip.piaoquantv.com/';

const subAppList = [
  {
    name: 'clip',
    entry: process.env.NODE_ENV === 'development' ? 'http://localhost:8081/' : clipEntry,
    container: '#app-container',
    activeRule: '/clip'
  },
  {
    name: 'longvideo-pc',
    entry: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : `${pcEntry}?time=${Date.now()}`,
    container: '#app-container',
    activeRule: '/upload'
  }
];

export default class BaseLayer {
  mainApp = null;
  isMicroServiceRunning = false;

  constructor ({ Vue, router, store, root }) {
    this._createMainApp({ Vue, root, router, store });
  }

  _createMainApp ({ Vue, router, store, root }) {
    this.mainApp = new Vue({
      router,
      store,
      render: h => h(root)
    });
  }

  static _registSubApp () {
    registerMicroApps(subAppList, {
      beforeLoad (app) {
        // console.log('beforeLoad', app)
      },
      beforeMount (app) {
        // console.log('beforeMount', app)
      },
      afterMount (app) {
        // console.log('afterMount', app)
      },
      beforeUnmount (app) {
        // console.log('beforeUnmount', app)
      },
      afterUnmount (app) {
        // console.log('afterUnmount', app)
      }
    }
    );
  }

  startup () {
    BaseLayer._registSubApp();
    this.mainApp.$mount('#app');
  }

  startMicroService () {
    if (!this.isMicroServiceRunning) {
      this.isMicroServiceRunning = true;
      start({ prefetch: 'all' });
    }
  }

  preloadApp () {
    const len = subAppList.length - 1;
    // function load (config) {
    //   if (len < 0) return;
    //   console.log(len)
    //   let app = loadMicroApp({
    //     name: config.name, // app name registered
    //     entry: config.entry,
    //     container: config.container
    //   });
    //
    //   app.mountPromise.then(res => {
    //     console.log(app)
    //     console.log(app.getStatus())
    //     app.unmount();
    //     len--
    //     load(subAppList[len])
    //   })
    // }
    //
    // load(subAppList[len]);

    // let app = loadMicroApp({
    //   name: 'clip-tools',
    //   entry: 'http://localhost:7072/',
    //   container: "#app-container",
    // });
    //
    // app.mountPromise.then(res => {
    //   console.log(app)
    //   console.log(app.getStatus())
    //   // app.unmount();
    // });
  }
}
