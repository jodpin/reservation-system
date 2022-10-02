import React, { useState, useEffect } from "react";
import Room from "../components/Room";
import Form from "../components/Form";
import RoomContext from "../context/RoomContex";
import { useContext } from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ReservationRoom = () => {
  const { room } = useContext(RoomContext);

  const roomKeys = Object.keys(room).length;
  const [infoRoom, setInfoRoom] = useState(
    roomKeys === 0 ? JSON.parse(window.localStorage.getItem("room")) : room
  );

  const navigate = useNavigate();

  useEffect(() => {
  
    if (Object.keys(room).length>0) {
      getData(`https://reservation-room.herokuapp.com/${infoRoom._id}`)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getData(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setInfoRoom(json);
      setStorageValue(json);
    } catch (error) {
      console.error(error);
    }
  }

  const setStorageValue = value =>{
    try{
      window.localStorage.setItem("room", JSON.stringify(value));
    }catch(error){
      console.error(error);
    }}

  return (
    <div className="reservation-room">
      <div className="reservation-room-back">
        <BsFillArrowLeftSquareFill
          onClick={() => navigate("/")}
          className="back-icon"
        ></BsFillArrowLeftSquareFill>
        <span>Ir atras</span>
      </div>

      <Room room={infoRoom} makingReservation={true} ></Room>
      <Form infoRoom={infoRoom}></Form>
    </div>
  );
};

export default ReservationRoom;
