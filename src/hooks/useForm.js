import { useState } from "react";

export const useForm = (
  initialForm,
  validateForm,
  dateIn,
  dateOut,
  infoRoom
) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [reservedDates] = useState([]);
  const [userError, setUserError] = useState(null);
  const [thereIsError, setThereIsError] = useState(false);

  const reserveDates = () => {
    let dayIn = dateIn.getDate();
    let monthIn = dateIn.getMonth();

    let dayOut = dateOut.getDate();
    let monthOut = dateOut.getMonth();
    let yearOut = dateOut.getFullYear();

    if (monthOut === monthIn) {
      for (let i = dayIn; i < dayOut; i++) {
        reservedDates.push({ day: i, month: monthOut + 1, year: yearOut });
      }
    }

    if (monthOut > monthIn) {
      let newDay = undefined;
      for (let i = monthOut; i >= monthIn; i--) {
        if (i === monthOut) {
          for (let j = dayOut - 1; j >= 1; j--) {
            if (j === 1) {
              let newDate = new Date(yearOut, i, 0);
              newDay = newDate.getDate();
            }
            reservedDates.push({ day: j, month: i + 1, year: yearOut });
          }
        }

        if (i !== monthOut && i !== monthIn) {
          for (let j = newDay; j >= 1; j--) {
            if (j === 1) {
              let newDate = new Date(yearOut, i, 0);
              newDay = newDate.getDate();
            }
            reservedDates.push({ day: j, month: i + 1, year: yearOut });
          }
        }

        if (i === monthIn) {
          for (let j = newDay; j >= dayIn; j--) {
            reservedDates.push({ day: j, month: i + 1, year: yearOut });
          }
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleBlur = (e) => {
    setErrors(validateForm(form, dateIn, dateOut));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateForm(form, dateIn, dateOut));
    if (dateIn >= dateOut && dateOut !== "") {
      setUserError({
        error: "la fecha de ingreso debe ser posterior a la de entrada",
      });
      setThereIsError(true);
      return;
    }
    reserveDates();
    infoRoom.reservedDates = [...infoRoom.reservedDates, ...reservedDates];
    setErrors(validateForm(form, dateIn, dateOut));
    if (!form.name || dateIn === "" || dateOut === "") {
      alert("todos los campos son obligatorios");
      return;
    }
    const id = infoRoom._id;
    delete infoRoom._id;
    form.room = infoRoom.name;
    form.dateIn = dateIn;
    form.dateOut = dateOut;
    const data = JSON.stringify(infoRoom);
    if (Object.keys(errors).length === 0) {
      setResponse(true);
      setLoading(true);

      await fetch(`https://reservation-room.herokuapp.com/${id}`, {
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => {
        setLoading(false);
        setResponse(true);
      });
    } else {
      return;
    }
  };

  return {
    form,
    errors,
    loading,
    handleChange,
    handleBlur,
    handleSubmit,
    response,
    setResponse,
    reservedDates,
    userError,
    thereIsError,
  };
};
