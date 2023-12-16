import React from 'react';
import {observer} from "mobx-react-lite";
import MapListInputsItem from "./map-list-inputs-item";
import {useMapStore} from "../../entities/map/context/map-store-context";
import mapStore from "../../entities/map/store/map-store";

const MapListInputs = observer(() => {
    return (
        <>
            <MapListInputsItem point={mapStore.startPoint} index={0}/>

            {mapStore.destinationPoints.map((p, index) => (
                <MapListInputsItem key={index + 1} point={p} index={index + 1}/>
            ))}
        </>
    );
});

export default MapListInputs;
