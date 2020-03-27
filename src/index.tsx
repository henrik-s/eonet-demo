import * as ReactDOM from 'react-dom';
import * as React from 'react';

import {App} from '@/app/';

const root = document.getElementById('root');
if (root != null) {
    ReactDOM.render(
        <App />,
        root
    );
}

else {
    console.error('Unable to find root node');
}
