import React, {useState} from 'react';
import {Libraries, useJsApiLoader} from "@react-google-maps/api";
import MapPanel from "../../map/map-panel";
import Map from "../../map/map";
import {observer} from "mobx-react-lite";
import mapStore from "../../../entities/map/store/map-store";
import createNewOrderStore from "../../../entities/order/store/CreateNewOrderStore";
import {Toast} from 'react-bootstrap';

const libraries: Libraries = ['places']

const MapComponent = observer(() => {

    const [showA, setShowA] = useState(false);
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "AIzaSyAaV6qLwi_gvacfIn3fVWmyaKWNui1HfIY",
        language: "uk",
        libraries
    })

    const submitRoute = () => {
        createNewOrderStore.newOrder.route = mapStore.transformStateToRouteRequest()
        toggleShowA()
    }

    if (!isLoaded) {
        return <div>Loading...</div>
    }



    const toggleShowA = () => setShowA(!showA);

    return (
        <>
            <Toast style={{bottom:10, right:20, zIndex:1000}} className={"position-fixed d-flex justify-content-between bg-success text-white fw-bold"} show={showA} onClose={toggleShowA}>
                <Toast.Body>Маршрут підтверджено!</Toast.Body>
                <Toast.Header className={"bg-success text-white"}>
                </Toast.Header>
            </Toast>

            <p className={"fs-4 fw-bold"}>
                Побудуйте маршрут вашого замовлення:
            </p>
            <div style={{background: "#FFFEF8"}}>
                <div className="container d-flex justify-content-center" style={{height: "100vh"}}>
                    <div className="row w-100">
                        <div className="col-5">
                            <MapPanel/>
                        </div>
                        <div className="col-7">
                            <Map/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"w-100 d-flex justify-content-center p-2"}>
                <button onClick={submitRoute} disabled={!mapStore.isRouteComplete}
                        className={(mapStore.isRouteComplete ? " bg-success " : " bg-danger ") + " w-50 text-white rounded border p-2 "}>
                    Підтвердити маршрут
                </button>
            </div>
        </>
    );
});

export default MapComponent;
