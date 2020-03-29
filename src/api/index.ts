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

const BASE_URL = 'https://eonet.sci.gsfc.nasa.gov/api/v2.1/';

export class API {
    public static getEvents(success: (events: Array<eonet.Event>) => void, days = 20) {
        fetch(`${BASE_URL}events?days=${days}&status=open`)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }

                return response.json();
            })
            .then((response: EventResponse) => {
                const {events = []} = response;
                this.getClosedEvents(events, success, days);
            })
            .catch(err => {
                success([]);
                console.error(err);
            });
    }

    private static getClosedEvents(
        openEvents: Array<eonet.Event>,
        success: (events: Array<eonet.Event>) => void,
        days: number
    ) {
        fetch(`${BASE_URL}events?days=${days}&status=closed`)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }

                return response.json();
            })
            .then((response: EventResponse) => {
                const {events = []} = response;
                const allEvents = openEvents.concat(events);
                const sortedEvents = _.sortBy(allEvents, (value) => utils.getEventDate(value)).reverse();
                success(sortedEvents);
            })
            .catch(err => {
                success(openEvents);
                console.error(err);
            });
    }

    public static getCategories(success: (categories: Array<eonet.Category>) => void) {
        interface Response {
            title: string
            description: string
            link: string
            categories: Array<eonet.Category>
        }
        fetch(`${BASE_URL}categories`)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }

                return response.json();
            })
            .then((response: Response) => {
                const {categories = []} = response;
                success(categories);
            })
            .catch(err => {
                success([]);
                console.error(err);
            });
    }
}

export {
    eonet,
    utils,
};
