import _ from 'underscore';

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
