import React from 'react';
import {observer} from "mobx-react-lite";
import MapMarker from "./map-marker";
import {useMapStore} from "../../entities/map/context/map-store-context";
import mapStore from "../../entities/map/store/map-store";

const MapDestinations = observer(() => {

    return (
        <>
            {mapStore.destinationPoints.map((p, index) => (
                p.location && (
                    <MapMarker
                        label={String.fromCharCode(66 + index)}
                        key={p.location.lng}
                        point={p}
                        onDragEnd={(location) => mapStore.handleOnDrugEndDestinationPoint(location, index)}
                    />
                )
            ))}
        </>
    );
});

export default MapDestinations;
