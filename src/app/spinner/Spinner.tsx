import * as React from 'react';
import classnames from 'classnames';

import styles from './style.sass';

interface Props {
    asOverlay?: boolean
}

const Spinner = (props: Props) => {
    const {asOverlay = false} = props;

    const spinner = (
        <div className={classnames(styles.ldsRipple)}>
            <div></div>
            <div></div>
        </div>
    );

    if (!asOverlay) return spinner;

    return (
        <div className={styles.container}>
            {spinner}
        </div>
    );
};

export const Component = Spinner;
