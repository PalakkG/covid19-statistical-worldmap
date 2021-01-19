import React, { useState } from "react";
import { scaleLinear } from "d3-scale";
import { ComposableMap, Geographies, Geography, Sphere, Graticule, ZoomableGroup } from "react-simple-maps";
import ReactTooltip from 'react-tooltip';
import { geoUrl, dataProcessing, max, drawerInfo } from '../data/DataProcessing';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import '../style/MapChart.css'

const geographyStyle = {
    default: {
        outline: 'none'
    },
    hover: {
        transition: 'all 250ms',
        outline: 'none'
    },
    pressed: {
        outline: 'none'
    }
};

const colorScale = scaleLinear()
    .domain([0.0, 1.0])
    .range(["#E6C8C8", "#DD0000"]);


const MapChart = (stats) => {
    
    const [position, setPosition] = useState({ coordinates: [10, -1], zoom: 1.5 });
    const [content, setContent] = useState('');

    function handleZoomIn() {
        if (position.zoom >= 4) return;
        setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
    }

    function handleZoomOut() {
        if (position.zoom <= 1) return;
        setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
    }

    function handleMoveEnd(position) {
        setPosition(position);
    }


    return (
        <>
            <ComposableMap className="mapContainer"
                projectionConfig={{
                    rotate: [-10, 0, 0],
                    scale: 147
                }}
                data-tip=''
            >

                <ZoomableGroup
                    zoom={position.zoom}
                    center={position.coordinates}
                    onMoveEnd={handleMoveEnd}
                >

                    <Sphere stroke="#3f434c" strokeWidth={0.5} />
                    <Graticule stroke="#3f434c" strokeWidth={0.5} />

                    <Geographies className="map" geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                let d = dataProcessing(stats, geo)
                                //console.log(max);

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={d ? colorScale(d['TotalConfirmed'] / max) : "#222"}
                                        style={geographyStyle}
                                        onMouseEnter={() => {
                                            setContent(drawerInfo(d))
                                        }}
                                        onMouseLeave={() => {
                                            setContent('');
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>

            <ReactTooltip type="light">{content}</ReactTooltip>
            <div className="controls">
                <button onClick={handleZoomIn}><FontAwesomeIcon icon={faPlusSquare} color="#fff" size="2x" /></button>
                <button onClick={handleZoomOut}><FontAwesomeIcon icon={faMinusSquare} color="#fff" size="2x" /></button>
            </div>
        </>
    );
};

export default MapChart;
