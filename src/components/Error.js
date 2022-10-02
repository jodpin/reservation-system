import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Error = ({ setError }) => {
  const navigate = useNavigate();
  const goToBack = () => {
    setError(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="response-container">
      <div className="response-message">
        <AiOutlineCloseCircle
          className="close"
          onClick={goToBack}
        ></AiOutlineCloseCircle>
        <div>
          <h3>Lo sentimos, esta habitacion no tiene disponibilidad</h3>
          <h3>Por favor prueba con alguna de las otras</h3>
        </div>
      </div>
    </div>
  );
};

export default Error;
