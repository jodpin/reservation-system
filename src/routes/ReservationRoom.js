import React, { useState } from "react";
import Room from "../components/Room";
import Form from "../components/Form";
import RoomContext from "../context/RoomContex";
import { useContext } from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ReservationRoom = () => {
  const { room } = useContext(RoomContext);
  const [infoRoom, setInfoRoom] = useState(room);
  const navigate = useNavigate();
  return (
    <div className="reservation-room">
      <div className="reservation-room-back">
      <BsFillArrowLeftSquareFill onClick={()=>navigate("/")} className="back-icon"></BsFillArrowLeftSquareFill>
      <span>Ir atras</span>
      </div>
      
      <Room room={infoRoom} makingReservation={true}></Room>
      <Form></Form>
    </div>
  );
};

export default ReservationRoom;
