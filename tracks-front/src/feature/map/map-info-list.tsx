import React from 'react';
import MapInfoItem from "./map-info-item";
import {observer} from "mobx-react-lite";
import {useMapStore} from "../../entities/map/context/map-store-context";
import mapStore from "../../entities/map/store/map-store";

const MapInfoList = observer(() => {

    return (
        <div style={{overflowY: "auto", maxHeight: "80vh"}}>
            {mapStore.destinationPoints.map((p, index) => (
                <MapInfoItem
                    labels={[String.fromCharCode(65 + index), String.fromCharCode(66 + index)]}
                    distance={p.fromRoute?.distance_string}
                    duration={p.fromRoute?.duration_string}
                    to={p.formattedAddress}
                    from={p.fromRoute?.address}
                    key={index + p.formattedAddress}
                />
            ))}

            {mapStore.isBackDirection && (
                <MapInfoItem
                    labels={[String.fromCharCode(66 + mapStore.destinationPoints.length - 1), String.fromCharCode(65)]}
                    distance={mapStore.startPoint.fromRoute?.distance_string}
                    duration={mapStore.startPoint.fromRoute?.duration_string}
                    to={mapStore.startPoint.formattedAddress}
                    from={mapStore.destinationPoints[mapStore.destinationPoints.length - 1].formattedAddress}
                />
            )}
        </div>
    );
});

export default MapInfoList;
