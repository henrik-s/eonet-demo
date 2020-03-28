import {
    Position,
    GeoJsonGeometryTypes,
} from 'geojson';

export enum EventFields {
    Id = 'id',
    Title = 'title',
    Description = 'description',
    Link = 'link',
    Categories = 'categories',
    Sources = 'sources',
    Geometries = 'geometries',
    Closed = 'closed',
}

export interface Event {
    [EventFields.Id]: string
    [EventFields.Title]: string
    [EventFields.Description]: string
    [EventFields.Link]: string
    [EventFields.Categories]: Array<{
        id: number
        title: string
    }>
    [EventFields.Sources]: Array<{
        id: string
        url: string
    }>
    [EventFields.Geometries]: Array<Geometry>
    [EventFields.Closed]?: Date
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

export interface Geometry {
    date: Date
    type: GeoJsonGeometryTypes
    coordinates: Position
}
