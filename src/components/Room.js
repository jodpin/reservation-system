import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import RoomContext from "../context/RoomContex";

const Room = ({ room, makingReservation = false }) => {
  const { imgUrl, nombre, numPersonas, precio } = room;
  const navigate = useNavigate();
  const { handleRoom } = useContext(RoomContext);

  const reserve = (room) => {
    handleRoom(room);
    navigate("/reserva", { replace: true });
  };

  return (
    <article className={`room-card ${makingReservation && "reservation-room-card"}`}>
      <div><img className="room-img" src={imgUrl} alt="imagen" /></div>
      <div>
      <div className="room-name">{nombre}</div>
      <p>{`numero maximo de personas: ${numPersonas}`}</p>
      <div className="room-price">
        {" "}
        <div>{precio} COP </div> <small>precio por noche</small>
      </div>
      {!makingReservation && (
        <div className="room-reservation" onClick={() => reserve(room)}>
          haz tu reserva ahora
        </div>
      )}
      </div>
      
    </article>
  );
};

export default Room;
