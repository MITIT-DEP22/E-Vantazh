import React from 'react';
import {observer} from "mobx-react-lite";
import {DirectionsRenderer} from "@react-google-maps/api";
import {useMapStore} from "../../entities/map/context/map-store-context";
import mapStore from "../../entities/map/store/map-store";

const MapDirections = observer(() => {
    return (
      <>
          {mapStore.directions && (
              <DirectionsRenderer
                directions={mapStore.directions}
                options={{
                    suppressMarkers: true,
                }}
              />
          )}
      </>
    );
});

export default MapDirections;
