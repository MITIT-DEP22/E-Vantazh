import React from 'react';
import {observer} from "mobx-react-lite";
import {useMapStore} from "../../entities/map/context/map-store-context";
import {DirectionMode} from "../../entities/map/models";
import mapStore from "../../entities/map/store/map-store";

const MapDirectionMapMode = observer(() => {

    return (
        <div>
            <div className="w-100 d-flex flex-row mb-3 ">
                <button
                    className={`w-100 small py-2 border-0 rounded-start-2`}
                    style={mapStore.directionMode === DirectionMode.OPTIMAL ? {background: "#4338d0", color: "white"} : {background: "#f8f9fa"}}
                    onClick={() => mapStore.setDirectionMode(DirectionMode.OPTIMAL)}
                >
                    Оптимальний
                </button>
                <button
                    className={`w-100 small py-2 border-0`}
                    style={mapStore.directionMode === DirectionMode.SPEED ? {background: "#4338d0", color: "white"} : {background: "#f8f9fa"}}
                    onClick={() => mapStore.setDirectionMode(DirectionMode.SPEED)}
                >
                    Мінімальний час
                </button>
                <button
                    className={`w-100 small py-2 border-0 rounded-end-2`}
                    style={mapStore.directionMode === DirectionMode.DISTANCE ? {background: "#4338d0", color: "white"} : {background: "#f8f9fa"}}
                    onClick={() => mapStore.setDirectionMode(DirectionMode.DISTANCE)}
                >
                    Мінімальна відстань
                </button>
            </div>


            <label className="d-flex gap-1 align-items-center" style={{cursor: "pointer"}}>
                <input id="back" type="checkbox" className="mt-1" checked={mapStore.isBackDirection}
                       onChange={() => mapStore.setIsBackDirection(!mapStore.isBackDirection)}/>
                <div>Туди і назад</div>
            </label>
        </div>
    );
});

export default MapDirectionMapMode;
