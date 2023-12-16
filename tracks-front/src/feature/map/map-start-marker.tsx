import React from 'react';
import {observer} from "mobx-react-lite";
import MapMarker from "./map-marker";
import {useMapStore} from "../../entities/map/context/map-store-context";
import mapStore from "../../entities/map/store/map-store";

const MapStartMarker = observer(() => {

    return (
       <>
           {mapStore.startPoint.location && (
               <MapMarker
                   label={String.fromCharCode(65)}
                   point={mapStore.startPoint}
                   onDragEnd={(location) => mapStore.handleOnDrugEndStartPoint(location)}
               />
           )}
       </>
    );
});

export default MapStartMarker;
