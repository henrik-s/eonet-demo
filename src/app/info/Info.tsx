import * as React from 'react';
import _ from 'underscore';
import classnames from 'classnames';

import styles from './style.sass';
import {
    eonet,
    utils,
} from '@/api';

import * as Map from './Map';

interface Props {
    selectedEvent: eonet.Event
}

function defaultAttrGet(field: eonet.EventFields, event: eonet.Event): React.ReactNode {
    const value = event[field] as string;
    if (value == null || value.length === 0) return null;

    return value;
}

const Info = (props: Props) => {
    const {selectedEvent = null} = props;


    const infoEntries: Array<{
        key: eonet.EventFields,
        title?: string
        getValue?: (event: eonet.Event) => React.ReactNode,
    }> = [
        {
            key: eonet.EventFields.Title,
        },
        {
            key: eonet.EventFields.Closed,
            title: 'Status',
            getValue: (event: eonet.Event) => {
                return (
                    <div>
                        {event.closed == null ?
                            <div className={styles.open}>Open</div>
                            :
                            <div>
                                <span className={styles.closed}>Closed</span>
                                ({new Date(event.closed).toLocaleString()})
                            </div>
                        }
                        <div>
                            <span className={styles.faded}>First geometry:</span>
                            {utils.getEventDate(event, false).toLocaleString()}
                        </div>
                        <div>
                            <span className={styles.faded}>Last geometry:</span>
                            {utils.getEventDate(event).toLocaleString()}
                        </div>
                    </div>
                );
            },
        },
        {
            key: eonet.EventFields.Description,
        },
        {
            key: eonet.EventFields.Categories,
            getValue: (event: eonet.Event) => {
                if (!_.isArray(event.categories)) return null;
                const nodes: Array<React.ReactNode> = [];
                event.categories.map((category, index) => { // eslint-disable-line array-callback-return
                    nodes.push(<div key={index}>{category.title}</div>);
                });

                return nodes;
            },
        },
        {
            key: eonet.EventFields.Sources,
            getValue: (event: eonet.Event) => {
                if (!_.isArray(event.sources)) return null;
                const nodes: Array<React.ReactNode> = [];
                event.sources.map((source, index) => { // eslint-disable-line array-callback-return
                    nodes.push(<a key={index} href={source.url} target='_blank'>{source.id}</a>);
                });

                return nodes;
            },
        },
        {
            key: eonet.EventFields.Link,
            title: 'API Endpoint',
            getValue: (event: eonet.Event) => {
                const value = defaultAttrGet(eonet.EventFields.Link, event) as string;
                if (value != null) {
                    return <a href={value} target='_blank'>{value}</a>;
                }

                return null;
            },
        },
        {
            key: eonet.EventFields.Geometries,
            title: `Geometries (${selectedEvent != null ? selectedEvent.geometries.length : 0})`,
            getValue: (event: eonet.Event) => {
                if (!_.isArray(event.geometries)) return null;

                return <Map.Component points={event.geometries} />;
            },
        },
    ];

    return (
        <div className={classnames(styles.container, selectedEvent != null ? styles.selected : null)}>
            {selectedEvent == null && 'Select an item from the list to see more'}
            {selectedEvent != null && infoEntries.map((entry, index) => {
                const title = entry.title ? entry.title : entry.key;

                let getValue = (event: eonet.Event) => defaultAttrGet(entry.key, event);
                if (typeof entry.getValue === 'function') getValue = entry.getValue;

                return <InfoEntry title={title} body={getValue(selectedEvent)} key={index} />;
            })}
        </div>
    );
};

const InfoEntry = (props: {title: string, body: React.ReactNode}) => {
    if (props.body == null) return null;

    return (
        <div>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.body}>{props.body}</div>
        </div>
    );
};

export const Component = Info;
