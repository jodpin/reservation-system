import React, { useEffect, useState } from "react";
import Room from "../components/Room";
import { useContext } from "react";
import RoomContext from "../context/RoomContex";
import { useNavigate } from "react-router-dom";

const RoomList = () => {
  const [list, setList] = useState([]);

  const { handleRoom } = useContext(RoomContext);
  const navigate = useNavigate();

  const goToReserveRoom = (room) => {
    handleRoom(room);
    navigate(`/reserva`, { replace: true });
  };

  useEffect(() => {
    getData("http://localhost:8000");
  }, []);

  async function getData(url) {
    try {
      const response = await fetch(url);

      const json = await response.json();
      setList(json.data);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="rooms-list-container">
      {list.map((el) => (
        <Room key={el._id} goToReserveRoom={goToReserveRoom} room={el} makingReservation={false} />
      ))}
    </div>
  );
};

export default RoomList;
