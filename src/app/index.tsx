import * as React from 'react';
import classnames from 'classnames';
import styles from './test.sass';

import {
    API as api,
    Event
} from '@/api';

export const App = () => {
    const [apiResponse, setApiResponse] = React.useState([] as Array<Event>);

    React.useEffect(() => {
        api.getEvents((events) => setApiResponse(events))
    }, []);

    return (
        <div className={classnames(styles.container, 'test')}>
            {apiResponse.map((value, index) => <p key={index}>{value.title}</p>)}
        </div>
    );
};
