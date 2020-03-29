import * as React from 'react';

import {RowSelectedEvent} from 'ag-grid-community';

import styles from './style.sass';
import {
    API as api,
    eonet,
} from '@/api';

import * as Header from '@/app/Header/Header';
import * as Grid from '@/app/grid/Grid';
import * as Spinner from '@/app/spinner/Spinner';
import * as Info from '@/app/info/Info';

import * as Filters from '@/app/filter/';

const INITIAL_FETCH_DAYS = 3;

export const App = () => {
    const [days, setDays] = React.useState({
        from: INITIAL_FETCH_DAYS, to: 0,
    });
    const [status, setStatus] = React.useState(Filters.Status.RadioOptions.All);

    const [rowData, setRowData] = React.useState([] as Array<eonet.Event>);
    const [selectedEvent, setSelectedEvent] = React.useState(null as eonet.Event);

    const [daysCached, setDaysCached] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetchData(days.from);
    }, []);

    function fetchData(fromDays: number) {
        if (fromDays <= daysCached) return;

        setSelectedEvent(null);
        if (!isLoading) {
            setIsLoading(true);
        }
        // Fetch with 1 day offset, events occurring
        // on 00:00:00 GMT+0 seems to be excluded otherwise
        // (ID: EONET_4615 for instance)
        api.getEvents((events) => {
            setRowData(events);
            setIsLoading(false);
            setDaysCached(fromDays);
        }, fromDays + 1);
    }

    function rowSelected(event: RowSelectedEvent) {
        if (event.node.isSelected() && !isLoading) {
            setSelectedEvent(event.node.data);
        }
    }

    function dateChange(daysChange: Filters.Date.DateObject) {
        const shallFetch = days.from !== daysChange.from;
        setDays(daysChange);

        if (shallFetch) {
            fetchData(daysChange.from);
        }
    }

    function filterData(): Array<eonet.Event> {
        let events = Filters.Status.filter(rowData, status);
        events = Filters.Date.filter(events, days);

        return events;
    }

    return (
        <div className={styles.container}>
            <Header.Component
                days={days}
                setDays={dateChange}
                status={status}
                setStatus={setStatus}
            />
            <main className={isLoading ? styles.loading : null}>
                <section className={styles.gridContainer}>
                    <Grid.Component
                        rowData={filterData()}
                        rowSelected={rowSelected}
                    />
                    {isLoading && <Spinner.Component asOverlay={true} />}
                </section>
                <section className={styles.infoContainer}>
                    <Info.Component selectedEvent={selectedEvent} />
                </section>
            </main>
        </div>
    );
};
