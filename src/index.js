import React from 'react';
import { render } from 'react-dom';
import App from 'components/app';
import {whyDidYouUpdate} from 'why-did-you-update'

whyDidYouUpdate(React)


render(<App />, document.getElementById('app'));
