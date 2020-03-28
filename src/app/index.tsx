import * as React from 'react';
import classnames from 'classnames';

import {RowSelectedEvent} from 'ag-grid-community';

import styles from './style.sass';
import {
    API as api,
    eonet,
} from '@/api';

import * as Grid from '@/app/grid/Grid';
import * as Spinner from '@/app/spinner/Spinner';
import * as Info from '@/app/info/Info';

export const App = () => {
    const [rowData, setRowData] = React.useState([] as Array<eonet.Event>);
    const [selectedEvent, setSelectedEvent] = React.useState(null as eonet.Event);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        api.getEvents((events) => {
            setRowData(events);
            setIsLoading(false);
            // setSelectedEvent(events[0])
        }, 10);
    }, []);


    function rowSelected(event: RowSelectedEvent) {
        if (event.node.isSelected() && !isLoading) {
            setSelectedEvent(event.node.data);
        }
    }

    return (
        <main className={classnames(styles.container, isLoading ? styles.loading : null)}>
            <section className={styles.gridContainer}>
                <Grid.Component
                    rowData={rowData}
                    rowSelected={rowSelected}
                />
                {isLoading && <Spinner.Component asOverlay={true} />}
            </section>
            <section className={styles.infoContainer}>
                <Info.Component selectedEvent={selectedEvent} />
            </section>
        </main>
    );
};
