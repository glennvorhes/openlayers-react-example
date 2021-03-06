import Map from "ol/Map";
import View from "ol/View";
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {Style, Circle, Fill, Stroke} from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Projection from 'ol/proj/Projection';
import {store, getState} from "./store";

import React = require('react');
import ReactDom = require('react-dom');
import {Provider} from 'react-redux';
import Feature from 'ol/Feature';

import {ColorPicker, ColorLabel} from './components';

import {example_data} from './example_data';

import GeoJSON from 'ol/format/GeoJSON';

//outer reference to vectorLayer
let vectorLayer: VectorLayer = null;


/**
 * watch for changes to the store and write to the console.
 * This part is for debugging purposes.
 * Also, trigger a refresh of the vector layer.  If this wasn't done, the symbol colors
 * would only change after a user pans or zooms on the map
 */
store.subscribe(() => {
    if (vectorLayer){
        vectorLayer.getSource().refresh();
    }
    console.log(getState());
});

/**
 * Main entry point of the application
 */
class App extends React.Component<{}, {}> {

    constructor(props, context) {
        super(props, context);
    }

    /**
     * function called after the component mounted.
     * The React.Component class has this method but it doesn't do anything
     * unless the function is overridden in the derived class
     *
     * Order of operations is important.  The OpenLayers map is created in a div with id="map"
     * However, that div only exists in after the App component is rendered as described in the render method.
     */
    componentDidMount() {
        let map = new Map({
            target: 'map',
            view: new View({
                center: [-9840124.542661136, 5379280.493658545],
                zoom: 7
            }),
            layers: [
                new TileLayer({
                    preload: 4,
                    source: new OSM()
                })
            ]
        });

        vectorLayer = new VectorLayer({
            source: new VectorSource(),
            style: (f: Feature) => {
                return new Style({
                    image: new Circle({
                        radius: 7,
                        stroke: new Stroke({color: 'black', width: 0.5}),
                        fill: new Fill({color: getState().theColor})
                    })
                })
            }
        });

        map.addLayer(vectorLayer);

        let geoJson = new GeoJSON();

        vectorLayer.getSource().addFeatures(
            geoJson.readFeatures(
                example_data,
                {
                    dataProjection: new Projection({code: 'EPSG:4326'}),
                    featureProjection: new Projection({code: 'EPSG:3857'})
                }
            )
        );
    }

    render() {
        return <div id="app-container">
            <div id="map">
                <div id="side-bar">
                    <ColorPicker/>
                    <ColorLabel/>
                </div>
            </div>
        </div>
    }
}

/**
 * Render the main compoent of the application.  The Provider element is how  React maintains a reference to the
 * store and updates connected components as changes are made to the store.
 */


ReactDom.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
