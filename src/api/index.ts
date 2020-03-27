import fetch from 'cross-fetch';

export interface Event {
    id: string
    title: string
    description: string
    link: string
    categories: Array<Category>
    sources: Array<Source>
    geometries: Array<Geometry>
    closed?: Date
}

interface Category {
    id: number
    title: string
    link: string
    description: string
    layers: string
}

interface Source {
    id: string
    title: string
    source: string
    link: string
}

interface Geometry {
    date: Date
    type: string
    coordinates: Array<number>
}


export class API {
    public static getEvents(success: (events: Array<Event>) => void) {
        interface EventResponse {
            title: string
            description: string
            link: string
            events: Array<Event>
        }
        fetch('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?status=closed&limit=5')
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then((response: EventResponse) => {
                success(response.events);
            })
            .catch(err => {
                console.error(err);
            });
    }
}
