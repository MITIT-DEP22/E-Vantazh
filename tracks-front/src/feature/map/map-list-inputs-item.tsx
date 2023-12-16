import React, {FC} from 'react';
import {observer} from "mobx-react-lite";
import MapInput from "./map-input";
import {useMapStore} from "../../entities/map/context/map-store-context";
import {Point} from "../../entities/map/models";
import mapStore from "../../entities/map/store/map-store";

interface IMapListInputsItem {
    point: Point
    index: number
}

const MapListInputsItem: FC<IMapListInputsItem> = observer(({point, index}) => {

    const handleOnChange = (address: string) => {
        if (index === 0) {
            mapStore.handleChangeStartPointName(address)
        } else {
            mapStore.handleChangeDestinationPointName(address, index - 1)
        }
    }

    const handleOnSubmit = (address: string) => {
        if (index === 0) {
            mapStore.handleSubmitStartPointName(address)
        } else {
            mapStore.handleSubmitDestinationPointName(address, index - 1)
        }
    }

    function handleOnDelete() {
        if (index === 0) {
            mapStore.deleteStartPoint()
        } else {
            mapStore.deleteDestinationPoint(index - 1)
        }
    }

    return (
        <MapInput
            value={point.formattedAddress}
            onChange={(address) => handleOnChange(address)}
            onSubmit={(address) => handleOnSubmit(address)}
            onDelete={() => handleOnDelete()}
            placeholder={index === 0 ? "Звідки" : "Куди"}
        />
    );
});

export default MapListInputsItem;
