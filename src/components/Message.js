import React from "react";
import {AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Message = ({ form, setResponse }) => {

  const closeMessage=()=>{
    setResponse(false);
    navigate("/", {replace: true})
  }
  const navigate = useNavigate();
  return (
    <div className="response-container">
      <div className="response-message">
      <AiOutlineCloseCircle className="close" onClick={()=>closeMessage()}></AiOutlineCloseCircle>
        <h2>La reserva se realizo con exito</h2>
        <h3>Informacion de la reserva</h3>
        <table>
          <thead>
            <tr>
              <td>
                <span className="response-message-key">A nombre de:</span>
                {` ${form.name}`}
              </td>
            </tr>
            <tr>
              <td>
                <span className="response-message-key">Telefono:</span>
                {` ${form.telephone}`}
              </td>
            </tr>
            <tr>
              <td>
                <span className="response-message-key">Nombre de la habitacion:</span>
                {` ${form.room}`}
              </td>
            </tr>
            <tr>
              <td>
                <span className="response-message-key">Dia de ingreso:</span>
                {` ${form.dateIn.getDate()}-${form.dateIn.getMonth()+1}-${form.dateIn.getFullYear()} `}
              </td>
            </tr>
            <tr>
              <td>
                <span className="response-message-key">Dia de salida:</span>
                {` ${form.dateOut.getDate()}-${form.dateOut.getMonth()+1}-${form.dateOut.getFullYear()} `}
              </td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default Message;
