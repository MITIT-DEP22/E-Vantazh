import React from 'react';
import {SignTurnLeft, XLg} from "react-bootstrap-icons";
import {observer} from "mobx-react-lite";
import {useMapStore} from "../../entities/map/context/map-store-context";
import mapStore from "../../entities/map/store/map-store";

const MapInfoButton = observer(() => {

    return (
        <div
            className={`position-absolute top-0 end-0 me-3 mt-3 py-3 px-3 rounded-5 ${mapStore.isRouteComplete ? "bg-light" : "bg-danger"}`}
            style={{cursor: "pointer"}}
            onClick={() => mapStore.isRouteComplete ? mapStore.setIsInfoOpen(!mapStore.isInfoOpen) : () => {}}
        >
            {mapStore.isInfoOpen ?
                <XLg size={28}/>
                :
                <SignTurnLeft color={mapStore.isRouteComplete ? "black" : "white"} size={28}/>
            }
        </div>
    );
});

export default MapInfoButton;
