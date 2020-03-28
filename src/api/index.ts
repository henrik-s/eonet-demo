import fetch from 'cross-fetch';
import _ from 'underscore';

import * as eonet from './entities';
import * as utils from './utils';

interface EventResponse {
    title: string
    description: string
    link: string
    events: Array<eonet.Event>
}

export class API {
    public static getEvents(success: (events: Array<eonet.Event>) => void, days = 20) {
        fetch(`https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?days=${days}&status=open`)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }

                return response.json();
            })
            .then((response: EventResponse) => {
                this.getClosedEvents(response.events, success, days);
            })
            .catch(err => {
                console.error(err);
            });
    }

    private static getClosedEvents(
        openEvents: Array<eonet.Event>,
        success: (events: Array<eonet.Event>) => void,
        days: number
    ) {
        fetch(`https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?days=${days}&status=closed`)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }

                return response.json();
            })
            .then((response: EventResponse) => {
                const allEvents = openEvents.concat(response.events);
                const sortedEvents = _.sortBy(allEvents, (value) => utils.getEventDate(value)).reverse();
                success(sortedEvents);
            })
            .catch(err => {
                console.error(err);
            });
    }
}

export {
    eonet,
    utils,
};
