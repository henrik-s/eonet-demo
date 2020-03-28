import * as React from 'react';
import {
    Feature,
    FeatureCollection,
    Point,
} from 'geojson';

import {
    Map as LeafletMap,
    TileLayer,
    GeoJSON as GeoJSONLayer,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import {eonet} from '@/api';

type Props = {
    points: Array<eonet.Geometry>
}

const Map = (props: Props) => {
    function getFeature(point: eonet.Geometry): Feature {
        return {
            type: 'Feature',
            geometry: {
                type: point.type,
                coordinates: point.coordinates,
            } as Point,
            properties: {
                date: new Date(point.date).toLocaleString(),
            },
        };
    }

    function getTransformedPoints(): FeatureCollection {
        const {points = []} = props;
        if (points.length === 0) return null;

        return {
            type: 'FeatureCollection',
            features: points.map((value) => getFeature(value)),
        };
    }

    const [reloadLayer, setReloadLayer] = React.useState(true);
    // GeoJSONLayer will not update after prop change, so minor hack us around that
    // https://react-leaflet.js.org/docs/en/components#geojson
    React.useEffect(() => {
        if (reloadLayer) {
            setReloadLayer(false);
        }
        else {
            setReloadLayer(true);
            setTimeout(() => setReloadLayer(false), 5);
        }
    }, [props.points]);

    return (
        <div>
            <LeafletMap center={[0, 0]} zoom={1}>
                <TileLayer
                    url='https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                {!reloadLayer &&
                    <GeoJSONLayer
                        data={getTransformedPoints()}
                        onEachFeature={(feature, layer) => {
                            if (feature.properties && feature.properties.date) {
                                layer.bindPopup(feature.properties.date);
                            }
                        }}
                    />
                }
            </LeafletMap>
        </div>
    );
};

export const Component = Map;
