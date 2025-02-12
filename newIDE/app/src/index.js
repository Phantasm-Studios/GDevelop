// @flow
import 'element-closest';
import React, { Component, type Element } from 'react';
import ReactDOM from 'react-dom';
import Authentication from './Utils/GDevelopServices/Authentication';
import {
  sendProgramOpening,
  installAnalyticsEvents,
} from './Utils/Analytics/EventSender';
import { installRaven } from './Utils/Analytics/Raven';
import { register } from './serviceWorker';
import './UI/iconmoon-font.css'; // Styles for Iconmoon font.
import optionalRequire from './Utils/OptionalRequire.js';
import { loadScript } from './Utils/LoadScript.js';
import { showErrorBox } from './UI/Messages/MessageBox';
import VersionMetadata from './Version/VersionMetadata';

const GD_STARTUP_TIMES = global.GD_STARTUP_TIMES || [];

// No i18n in this file

const electron = optionalRequire('electron');

const styles = {
  loadingMessage: {
    position: 'absolute',
    top: 'calc(50% + 80px)',
    left: 15,
    right: 15,
    fontSize: 20,
    fontFamily: 'sans-serif',
    color: 'darkgray',
    textAlign: 'center',
    animation:
      'text-focus-in 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) both',
  },
};

type State = {|
  loadingMessage: string,
  App: ?Element<*>,
|};

class Bootstrapper extends Component<{}, State> {
  state = {
    loadingMessage: 'Loading the editor...',
    App: null,
  };
  authentication = new Authentication();

  componentDidMount() {
    installAnalyticsEvents(this.authentication);
    installRaven();
    GD_STARTUP_TIMES.push(['bootstrapperComponentDidMount', performance.now()]);

    // Load GDevelop.js, ensuring a new version is fetched when the version changes.
    loadScript(
      `./libGD.js?cache-buster=${VersionMetadata.versionWithHash}`
    ).then(() => {
      GD_STARTUP_TIMES.push(['libGDLoadedTime', performance.now()]);
      const initializeGDevelopJs = global.initializeGDevelopJs;
      if (!initializeGDevelopJs) {
        this.handleEditorLoadError(
          new Error('Missing initializeGDevelopJs in libGD.js')
        );
        return;
      }

      initializeGDevelopJs({
        // Override the resolved URL for the .wasm file,
        // to ensure a new version is fetched when the version changes.
        locateFile: (path: string, prefix: string) => {
          return (
            prefix + path + `?cache-buster=${VersionMetadata.versionWithHash}`
          );
        },
      }).then(gd => {
        global.gd = gd;
        GD_STARTUP_TIMES.push([
          'libGD.js initialization done',
          performance.now(),
        ]);

        if (electron) {
          import(/* webpackChunkName: "local-app" */ './LocalApp')
            .then(module =>
              this.setState({
                App: module.create(this.authentication),
                loadingMessage: '',
              })
            )
            .catch(this.handleEditorLoadError);
        } else {
          import(/* webpackChunkName: "browser-app" */ './BrowserApp')
            .then(module =>
              this.setState({
                App: module.create(this.authentication),
                loadingMessage: '',
              })
            )
            .catch(this.handleEditorLoadError);
        }
      });
    }, this.handleEditorLoadError);
  }

  handleEditorLoadError = rawError => {
    const message = !electron
      ? 'Please check your internet connectivity, close the tab and reopen it.'
      : 'Please restart the application or reinstall the latest version if the problem persists.';

    this.setState({
      loadingMessage: `Unable to load GDevelop. ${message}`,
    });
    showErrorBox({
      message: `Unable to load GDevelop. ${message}`,
      rawError,
      errorId: 'editor-load-error',
    });
  };

  render() {
    const { App, loadingMessage } = this.state;

    return (
      <React.Fragment>
        {App}
        {loadingMessage && (
          <div style={styles.loadingMessage}>{loadingMessage}</div>
        )}
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  GD_STARTUP_TIMES.push(['reactDOMRenderCall', performance.now()]);
  ReactDOM.render(<Bootstrapper />, rootElement);
} else console.error('No root element defined in index.html');

// registerServiceWorker();
register();
sendProgramOpening();
