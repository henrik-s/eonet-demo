import * as React from 'react';
import _ from 'underscore';

import styles from './style.sass';

import {eonet} from '@/api';

export enum RadioOptions {
    All = 'all',
    Open = 'open',
    Closed = 'closed'
}

export function filter(events: Array<eonet.Event>, status: RadioOptions): Array<eonet.Event> {
    if (status === RadioOptions.All) {
        return events;
    }
    if (status === RadioOptions.Open) {
        return _.filter(events, (value) => value.closed == null);
    }
    if (status === RadioOptions.Closed) {
        return _.filter(events, (value) => value.closed != null);
    }
}

interface Props {
    status: RadioOptions
    setStatus: (status: RadioOptions) => void
}

const Status = (props: Props) => {
    return (
        <div className={styles.container}>
            <input
                type='radio'
                name='status'
                id={RadioOptions.All}
                value={RadioOptions.All}
                checked={props.status === RadioOptions.All}
                onChange={() => props.setStatus(RadioOptions.All)}
            />
            <label htmlFor={RadioOptions.All}>All</label>

            <input
                type='radio'
                name='status'
                id={RadioOptions.Open}
                value={RadioOptions.Open}
                checked={props.status === RadioOptions.Open}
                onChange={() => props.setStatus(RadioOptions.Open)}
            />
            <label htmlFor={RadioOptions.Open}>Open</label>

            <input
                type='radio'
                name='status'
                id={RadioOptions.Closed}
                value={RadioOptions.Closed}
                checked={props.status === RadioOptions.Closed}
                onChange={() => props.setStatus(RadioOptions.Closed)}
            />
            <label htmlFor={RadioOptions.Closed}>Closed</label>
        </div>
    );
};

export const Component = Status;
