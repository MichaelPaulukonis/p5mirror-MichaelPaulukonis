// You can comment this JS out and the app will still work.
// but the prevent scroll business, etc. will not work
// The routes as coded wouldn't work, and I have no need of them AT THE MOMENT, so I inlined the key-need `app.preventScroll()` into routeChange
// keeping it here to think about things....
(function() {
  var app = {
    'routes': {
      'nes': {
        'rendered': () => {
          console.log('view currently showing is "nes"');
          app.preventScroll();
        }
      },
      'snes': {
        'rendered': () => {
          console.log('view currently showing is "snes"');
          app.preventScroll();
        }
      },
      'the-default-view': {
        'rendered': () => {
          console.log('view currently showing is "the-default-view"');
          app.preventScroll();
        }
      },
    },
    'default': 'the-default-view',
    'preventScroll': () => {
      document.querySelector('html').scrollTop = 0;
      document.querySelector('body').scrollTop = 0;
    },
    'routeChange': () => {
      app.routeID = location.hash.slice(1);
      app.preventScroll()
      console.log(`view currently showing is "${app.routeID}"`);
    //   app.route = app.routes[app.routeID];
    //   app.routeElem = document.getElementById(app.routeID);
    //   app.route.rendered();
    },
    'init': () => {
      window.addEventListener('hashchange', () => app.routeChange())
      if (!window.location.hash) {
        window.location.hash = app.default;
      } else {
        app.routeChange();
      }
    }
  };
  window.app = app;
})();

// do we have a URL, or an about:srcdoc ??? !!!
console.log('location: ' + window.location);

app.init();