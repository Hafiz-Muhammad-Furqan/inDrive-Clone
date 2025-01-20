import { useEffect, useState } from "react";
import ConfirmFinishRide from "../Components/ConfirmFinishRide";
import DriverProfile from "../Components/DriverProfile";
import DriverRidePanel from "../Components/DriverRidePanel";
import RideRequest from "../Components/RideRequest";
import SideBar from "../Components/SideBar";
import OtpPanel from "../Components/OtpPanel";
import { socket, sendMessage, updateLocation } from "../Utilities/socket";
import { useAuth } from "../context/AuthContext";
import { useRideContext } from "../context/RideContext";
import { useLocation, useNavigate } from "react-router-dom";

const DriverDashboard = () => {
  const { user } = useAuth();
  const { rides, setNewRides } = useRideContext();
  const [profilePanel, setProfilePanel] = useState(true);
  const [otpPanel, setOtpPanel] = useState(false);
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const [ridePanel, setRidePanel] = useState(false);
  const [ridingData, setRidingData] = useState(null);

  console.log(rides);

  useEffect(() => {
    sendMessage("join", { userType: "captain", userId: user._id });

    const locationInterval = setInterval(() => {
      updateLocation(user._id);
    }, 10000);
    updateLocation(user._id);
    return () => clearInterval(locationInterval);
  });

  return (
    <div className="relative flex-1 w-full flex items-center flex-col overflow-hidden ">
      <div className="w-full h-full transition-opacity duration-300 ">
        <img
          src="/Images/Map.webp"
          alt="map"
          className="w-full h-full object-cover bg-center"
        />
      </div>
      <SideBar />

      <DriverProfile user={user} profilePanel={profilePanel} />
      <DriverRidePanel
        ridePanel={ridePanel}
        setFinishRidePanel={setFinishRidePanel}
        setRidePanel={setRidePanel}
      />
      <ConfirmFinishRide
        finishRidePanel={finishRidePanel}
        ridingData={ridingData}
      />
      <OtpPanel
        setOtpPanel={setOtpPanel}
        otpPanel={otpPanel}
        // newRide={newRide}
        setRidingData={setRidingData}
        setRidePanel={setRidePanel}
      />
    </div>
  );
};

export default DriverDashboard;
