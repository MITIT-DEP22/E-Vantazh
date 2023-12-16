import React from 'react';
import {observer} from "mobx-react-lite";
import MapInfoList from "./map-info-list";
import {useMapStore} from "../../entities/map/context/map-store-context";
import mapStore from "../../entities/map/store/map-store";

const MapInfo = observer(() => {

    return (
        <div className="h-100 w-100 rounded-2 shadow px-2 py-4 d-flex justify-content-between flex-column"
             style={{background: "#E4E4E4", border: "1px solid #727272", borderRadius: "15px"}}
        >
            <MapInfoList/>
            <div className="d-flex gap-5">
                <div className="fs-5"><strong>Загальна відстань:</strong> {mapStore.getSumDistanceString()}</div>
                <div className="fs-5"><strong>Загальний час:</strong> ~{mapStore.getSumDurationString()}</div>
            </div>
        </div>
    );
});

export default MapInfo;
