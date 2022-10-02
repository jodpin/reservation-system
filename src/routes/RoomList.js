/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Room from "../components/Room";
import Error from "../components/Error";
import { useContext } from "react";
import RoomContext from "../context/RoomContex";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const RoomList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [dates] = useState(fillDates());
  const { handleRoom } = useContext(RoomContext);

  const navigate = useNavigate();

  useEffect(() => {
    getData("https://reservation-room.herokuapp.com");
    fillDates();
  }, []);

  function thereIsRoom(arrayDates) {
    let existe = dates.map((el) =>
      arrayDates.find(
        (element) => el.day === element.day && element.month === el.month
      )
    );
    let array = existe.map((el) => (el === undefined ? true : false));
    let goAhead = array.find((el) => el === true);
    return goAhead;
  }

  const goToReserveRoom = (room) => {
    handleRoom(room);
    let goAhead = (thereIsRoom(room.reservedDates));
    if (goAhead===undefined) {
      setError(true);
      return;
    }
    navigate(`/reserva`, { replace: true });
  };

  async function getData(url) {
    try {
      setLoading(true);
      const response = await fetch(url);

      const json = await response.json();
      setList(json.data);
      fillDates();

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  function fillDates() {
    let dateIn = new Date();
    let dateOut = new Date(2022, 11, 30);
    let dayIn = dateIn.getDate();
    let monthIn = dateIn.getMonth();

    let dayOut = dateOut.getDate();
    let monthOut = dateOut.getMonth();
    let yearOut = dateOut.getFullYear();
    const dates = [];

    if (monthOut === monthIn) {
      for (let i = dayIn; i < dayOut; i++) {
        dates.push({ day: i, month: monthOut + 1, year: yearOut });
      }
    }

    if (monthOut > monthIn) {
      let newDay = undefined;
      for (let i = monthOut; i >= monthIn; i--) {
        if (i === monthOut) {
          for (let j = dayOut; j >= 1; j--) {
            if (j === 1) {
              let newDate = new Date(yearOut, i, 0);
              newDay = newDate.getDate();
            }
            dates.push({ day: j, month: i + 1, year: yearOut });
          }
        }

        if (i !== monthOut && i !== monthIn) {
          for (let j = newDay; j >= 1; j--) {
            if (j === 1) {
              let newDate = new Date(yearOut, i, 0);
              newDay = newDate.getDate();
            }
            dates.push({ day: j, month: i + 1, year: yearOut });
          }
        }

        if (i === monthIn) {
          for (let j = newDay; j >= dayIn; j--) {
            dates.push({ day: j, month: i + 1, year: yearOut });
          }
        }
      }
    }
    return dates;
  }
  return (
    <div className="rooms-list-container">
      {loading && <Loader />}
      {error && <Error setError={setError}/>}
      {list.map((el) => (
        <Room
          key={el._id}
          goToReserveRoom={goToReserveRoom}
          room={el}
          makingReservation={false}
        />
      ))}
    </div>
  );
};

export default RoomList;
