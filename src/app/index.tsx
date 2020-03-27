import * as React from 'react';
import classnames from 'classnames';
import styles from './test.sass';


export const App = () => {
    const [apiResponse, setApiResponse] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:3000/json')
            .then((response: any) => response.json())
            .then((data: any) => {
                setApiResponse(data);
            });
    }, []);

    return (
        <div className={classnames(styles.container, 'test')}>
            <p className='test'>Hello world</p>
            {apiResponse.map((value, index) => <p key={index}>{value}</p>)}
        </div>
    );
};
