import * as ReactDOM from 'react-dom';
import * as React from 'react';

import {App} from '@/app/';

// https://stackoverflow.com/questions/41144319/leaflet-marker-not-found-production-env
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";

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
