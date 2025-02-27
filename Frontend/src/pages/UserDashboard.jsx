import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import LocationPanel from "../components/LocationPanel";
import ConfirmRide from "../components/ConfirmRide";
import FindDrivers from "../components/FindDrivers";
import CancelRequest from "../components/CancelRequest";
import UserRidePanel from "../components/UserRidePanel";
import ChooseVehicle from "../components/ChooseVehicle";
import { sendMessage, socket } from "../utilities/socket.js";
import RideAccepted from "../components/RideAccepted";
import StartRide from "../components/StartRide";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import showToast from "../utilities/Toast.js";

const UserDashboard = () => {
  const { user } = useAuth();

  const [locationPanel, setLocationPanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [userRidePanel, setUserRidePanel] = useState(true);
  const [findDriverPanel, setFindDriverPanel] = useState(false);
  const [acceptedRidePanel, setAcceptedRidePanel] = useState(false);
  const [acceptedRide, setAcceptedRide] = useState(null);
  const [createdRide, setCreatedRide] = useState(null);
  const [cancelRequestPanel, setCancelRequestPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [fetchingFare, setFetchingFare] = useState(false);
  const [startRide, setStartRide] = useState(false);
  const [startRidePanel, setStartRidePanel] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [fare, setFare] = useState(null);
  const [locations, setLocations] = useState({
    pickUpLocation: "",
    destination: "",
  });

  useEffect(() => {
    sendMessage("join", { userType: "user", userId: user._id });
  }, []);

  socket.on("ride-accepted", (data) => {
    setAcceptedRide(data);
    setFindDriverPanel(false);
    setAcceptedRidePanel(true);
  });

  socket.on("ride-started", (data) => {
    setAcceptedRidePanel(false);
    setStartRidePanel(true);
    setStartRide(data);
  });

  socket.on("ride-finished", (data) => {
    showToast("Ride Finished successfully", "success");
    window.location.reload();
  });

  return (
    <div className="relative flex-1 w-full flex items-center flex-col overflow-hidden">
      <div
        className={`w-full h-full transition-opacity duration-300 ${
          locationPanel ? "opacity-50" : ""
        }`}
      >
        <img
          src="/Images/Map.webp"
          alt="map"
          className="w-full h-full object-cover bg-center"
        />
      </div>
      <SideBar />
      <UserRidePanel
        setLocationPanel={setLocationPanel}
        setUserRidePanel={setUserRidePanel}
        userRidePanel={userRidePanel}
        locations={locations}
        setVehiclePanel={setVehiclePanel}
        fetchingFare={fetchingFare}
        setFetchingFare={setFetchingFare}
        setFare={setFare}
      />
      <LocationPanel
        locationPanel={locationPanel}
        setLocationPanel={setLocationPanel}
        locations={locations}
        setLocations={setLocations}
        setUserRidePanel={setUserRidePanel}
        setVehiclePanel={setVehiclePanel}
        setFare={setFare}
        fetchingFare={fetchingFare}
        setFetchingFare={setFetchingFare}
      />
      <ConfirmRide
        confirmRidePanel={confirmRidePanel}
        setConfirmRidePanel={setConfirmRidePanel}
        setFindDriverPanel={setFindDriverPanel}
        fare={fare}
        vehicle={vehicle}
        locations={locations}
        setCreatedRide={setCreatedRide}
      ></ConfirmRide>
      <FindDrivers
        setFindDriverPanel={setFindDriverPanel}
        findDriverPanel={findDriverPanel}
        setCancelRequestPanel={setCancelRequestPanel}
        fare={fare}
        vehicle={vehicle}
        locations={locations}
      ></FindDrivers>
      <CancelRequest
        setCancelRequestPanel={setCancelRequestPanel}
        cancelRequestPanel={cancelRequestPanel}
        setFindDriverPanel={setFindDriverPanel}
        createdRide={createdRide}
      ></CancelRequest>
      <ChooseVehicle
        setVehiclePanel={setVehiclePanel}
        vehiclePanel={vehiclePanel}
        setConfirmRidePanel={setConfirmRidePanel}
        setVehicle={setVehicle}
        fare={fare}
        locations={locations}
      ></ChooseVehicle>
      <RideAccepted
        acceptedRidePanel={acceptedRidePanel}
        acceptedRide={acceptedRide}
      />
      <StartRide startRidePanel={startRidePanel} startRide={startRide} />
    </div>
  );
};

export default UserDashboard;
