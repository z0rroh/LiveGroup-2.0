import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './containers/App';
import store from './store'
import registerServiceWorker from './registerServiceWorker';

// Import Styles
import './css/normalize.css'
import './css/blueprint.css'
import './css/blueprint-datetime.css'
import './index.css';

ReactDOM.render(<Provider store={store}>
                      <App />
                      </Provider>, document.getElementById('root'));

registerServiceWorker();
