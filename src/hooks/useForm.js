import { useState } from "react";

export const useForm = (
  initialForm,
  validateForm,
  dateIn,
  dateOut
) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [reservedDates] = useState([]);


  const reserveDates = () => {
    let dayIn = dateIn.getDate();
    let monthIn = dateIn.getMonth()+1;
    let yearIn = dateIn.getFullYear();
    const dateI = { dayIn, monthIn, yearIn };

    let dayOut = dateOut.getDate();
    let monthOut = dateOut.getMonth()+1;
    let yearOut = dateOut.getFullYear();
    const dateO = { dayOut, monthOut, yearOut };

    console.log(dateI);
    console.log(dateO);

    for (let i = dayOut; i >= -1; i--) {
      console.log(new Date(yearOut, monthOut, i));
      reservedDates.push(new Date(yearOut, monthOut - 1, i));
    }
  };

  const handleChange = (e) => {
    //destructuramos cada campo donde este el target, y asignamos los names a los key y value a
    //los valores
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleBlur = (e) => {
    // handleChange(e);
    // la funcion validateForm nos retorna errores, por tanto seteamos esos errores a setErrors()
    setErrors(validateForm(form, dateIn, dateOut));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    reserveDates();
    setErrors(validateForm(form, dateIn, dateOut));
    // handleBlur();
    if (!form.name || dateIn === "" || dateOut === "") {
      alert("todos los campos son obligatorios");
      return;
    }

    console.log(Object.keys(errors));
    if (Object.keys(errors).length === 0) {
      alert("Enviando Formulario");
      setLoading(true);
      console.log(form);
      // await fetch("https://formsubmit.co/ajax/johan.dpl_16@hotmail.com", {
      //     method:"POST",
      //     body: form,
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //     },
      //   })
      //   .then((res) => {
      // console.log(res);
      setLoading(false);
      setResponse(true);
      setForm(initialForm);
      setTimeout(() => setResponse(false), 5000);
      //   });
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
    reserveDates,
    reservedDates,
  };
};
