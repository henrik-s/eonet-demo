import _ from 'underscore';
import moment from 'moment';

import * as eonet from './entities';

export function getEventDate(data: eonet.Event, lastReport = true) {
    if (!_.isArray(data.geometries) || data.geometries.length === 0) return null;
    const sortedDates = _.sortBy(data.geometries, (value) => new Date(value.date));
    if (lastReport) {
        sortedDates.reverse();
    }

    return new Date(sortedDates[0].date);
}

export function getCategoryLabel(data: eonet.Event) {
    if (!_.isArray(data.categories) || data.categories.length === 0) return null;
    const test = _.reduce(data.categories, (prev: string, curr) => `${curr.title}, ${prev}`, '');

    return test.substring(0, test.length - 2);
}

export function getNumberOfDaysSince(days = 0, months = 0, years = 0) {
    const from = moment()
        .subtract(days, 'd')
        .subtract(months, 'M')
        .subtract(years, 'y');

    const diff = moment.duration(moment().diff(from));

    return Math.round(diff.asDays());
}
