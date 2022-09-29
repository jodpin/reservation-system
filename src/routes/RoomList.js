import React, { useState } from 'react'
import Room from '../components/Room';

const ROOMS = [
    {
        codigo: 101,
        imgUrl : "../../assets/suit-junior.jpg",
        nombre: "suit standar",
        numPersonas: 2,
        precio: 80000,
        arrayFechas:[]
    },
    {
        codigo: 201,
        imgUrl : "../../assets/master suit.jpg",
        nombre: "Master suit",
        numPersonas: 2,
        precio: 80000,
        arrayFechas:[]
    },
    {
        codigo: 301,
        imgUrl : "../../assets/suite-familiar.jpg",
        nombre: "Suit familiar",
        numPersonas: 2,
        precio: 80000,
        arrayFechas:[]
    },
    {
      codigo: 401,
      imgUrl : "../../assets/suit-presidencial.jpg",
      nombre: "Suit presidencial",
      numPersonas: 2,
      precio: 80000,
      arrayFechas:[]
  },
  {
      codigo: 501,
      imgUrl : "../../assets/room-king-beed.jpg",
      nombre: "two king bed",
      numPersonas: 2,
      precio: 80000,
      arrayFechas:[]
  },
  {
      codigo: 601,
      imgUrl : "../../assets/Room-Double-Queen.jpg",
      nombre: "suit ",
      numPersonas: 2,
      precio: 80000,
      arrayFechas:[]
  }
]

const RoomList = () => {
  const[list, setLIst] = useState(ROOMS);

  return (
    <div className='rooms-list-container'>{
        list.map(el =><Room key={el.codigo} room={el} makingReservation={false}/>)
    }</div>
  )
}

export default RoomList