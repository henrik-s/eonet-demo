import * as React from 'react';
import _ from 'underscore';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './style.sass';

import {eonet, utils} from '@/api';

const DATE_FORMAT = 'yyyy-MM-dd';

export interface DateObject {
    from: number
    to: number
}

export function filter(events: Array<eonet.Event>, days: DateObject): Array<eonet.Event> {
    const {fromDate, toDate} = getDays(days);

    return _.filter(events, (event) => {
        const eventDate = utils.getEventDate(event);

        return fromDate <= eventDate && eventDate <= toDate;
    });
}

function getDays(days: DateObject) {
    return {
        fromDate: moment().subtract(days.from, 'd').hours(0).minutes(0).seconds(0).toDate(),
        toDate: moment().subtract(days.to, 'd').hours(23).minutes(59).seconds(59).toDate(),
    };
}

export interface Props {
    days: DateObject
    setDays: (days: DateObject) => void
}

const DateFilter = (props: Props) => {
    const fromDate = moment().subtract(props.days.from, 'd').toDate();
    const toDate = moment().subtract(props.days.to, 'd').toDate();

    return (
        <div className={styles.container}>
            <div>
                <span>From:</span>
                <DatePicker
                    dateFormat={DATE_FORMAT}
                    selected={fromDate}
                    onChange={date => {
                        const today = moment();
                        const diff = moment.duration(today.diff(moment(date)));
                        const diffDays = Math.round(diff.asDays());
                        props.setDays({
                            ...props.days, from: diffDays,
                        });
                    }}
                    minDate={moment().subtract(1, 'y').toDate()}
                    maxDate={toDate}
                />
            </div>
            <div>
                <span>To:</span>
                <DatePicker
                    dateFormat={DATE_FORMAT}
                    selected={toDate}
                    onChange={date => {
                        const today = moment();
                        const diff = moment.duration(today.diff(moment(date)));
                        const diffDays = Math.round(diff.asDays());
                        props.setDays({
                            ...props.days, to: diffDays,
                        });
                    }}
                    minDate={fromDate}
                    maxDate={new Date()}
                />
            </div>
        </div>
    );
};

export const Component = DateFilter;
