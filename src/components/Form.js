import { useForm } from "../hooks/useForm";
import Loader from "./Loader";
import Message from "./Message";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialForm = {
  name: "",
  email: "",
  telephone: "",
  dateIn: "",
  dateOut: "",
};

const validationsForm = (form, dateIn, dateOut) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

  if (!form.name.trim()) {
    errors.name = "El nombre es necesario";
  } else if (!regexName.test(form.name.trim())) {
    errors.name = "El campo 'Nombre' sólo acepta letras y espacios en blanco";
  }

  if (!errors.name) {
    if (!form.email.trim()) {
      errors.email = "El email es necesario";
    } else if (!regexEmail.test(form.email.trim())) {
      errors.email = "El email es incorrecto";
    }
  }

  if (!errors.name && !errors.email) {
    if (!form.telephone) {
      errors.telephone = "El telefono es necesario";
    }
  }

  if (dateIn >= dateOut && dateOut !== "") {
    errors.date = "la fecha de salida debe ser posterior a la de entrada";
    console.log(dateIn, dateOut);
  }

  return errors;
};

let styles = {
  fontWeight: "bold",
  color: "#dc3545",
  margin: "0",
};

const Formulario = ({ infoRoom }) => {
  const [dateIn, setDateIn] = useState("");
  const [dateOut, setDateOut] = useState("");
  const [reservedDatesDB] = useState([]);

  useEffect(() => {
    infoRoom.reservedDates.forEach((el) => {

      reservedDatesDB.push(new Date(el.year, el.month-1, el.day));
  
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
    setResponse,
  } = useForm(initialForm, validationsForm, dateIn, dateOut, infoRoom);

  return (
    <div className="reservation-form-container">
      <h2 className="reservation-form-title">Información de reserva</h2>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Escribe tu nombre"
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.name}
        />
        {errors.name && <p style={styles}>{errors.name}</p>}
        <input
          type="email"
          name="email"
          placeholder="Escribe tu email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.email}
        />
        {errors.email && <p style={styles}>{errors.email}</p>}

        <input
          type="tel"
          name="telephone"
          placeholder="Pon aqui tu telefono"
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.telephone}
        />
        {errors.telephone && <p style={styles}>{errors.telephone}</p>}

        <div className="reservation-form-dates">
          <div onBlur={handleBlur}>
            <DatePicker
              placeholderText="click aqui"
              selected={dateIn}
              onChange={(date) => setDateIn(date)}
              minDate={new Date()}
              maxDate={new Date(2022, 11, 30)}
              excludeDates={reservedDatesDB}
              required
            />
            <label> Fecha de ingreso</label>
          </div>

          <div onBlur={handleBlur}>
            <DatePicker
              placeholderText="click aqui"
              selected={dateOut}
              onChange={(date) => setDateOut(date)}
              minDate={new Date()}
              maxDate={new Date(2022, 11, 31)}
              excludeDates={reservedDatesDB}
              required
            />
            <label> Fecha de Salida</label>
          </div>
        </div>
        {errors.date && <p style={styles}>{errors.date}</p>}
        <input
          type="submit"
          value="Enviar"
          className="reservation-form-submit"
        />
      </form>

      {loading && <Loader />}
      {response && <Message setResponse={setResponse} form={form} />}
    </div>
  );
};

export default Formulario;
