import {registerMicroApps, start, loadMicroApp} from "qiankun";

const subAppList = [
  {
    name: 'clip',
    entry: 'http://localhost:8081/',
    container: "#app-container",
    activeRule: '/clip',
  },
  {
    name: 'longvideo-pc',
    entry: 'http://localhost:3000/',
    container: "#app-container",
    activeRule: '/pc',
  },
];

export default class BaseLayer {
  mainApp = null;

  constructor({ Vue, router, store, root }) {
    this._createMainApp({ Vue, root, router, store })
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
        },
      }
    );
  }

  startup () {
    BaseLayer._registSubApp();
    start({ prefetch: 'all' });
    this.mainApp.$mount("#app");
  }

  preloadApp () {
    let len = subAppList.length - 1;
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
