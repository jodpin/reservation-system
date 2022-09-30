import React from "react";

const Room = ({ room, goToReserveRoom, makingReservation = false }) => {
  const { url, name, numberPersons, price } = room;

  return (
    <article
      className={`room-card ${makingReservation && "reservation-room-card"}`}
    >
      <div>
        <img className="room-img" src={url} alt="imagen" />
      </div>
      <div>
        <div className="room-name">{name}</div>
        <p>{`numero maximo de personas: ${numberPersons}`}</p>
        <div className="room-price">
          {" "}
          <div>{price} COP </div> <small>precio por noche</small>
        </div>
        {!makingReservation && (
          <div
            className="room-reservation"
            onClick={() => goToReserveRoom(room)}
          >
            haz tu reserva ahora
          </div>
        )}
      </div>
    </article>
  );
};

export default Room;
