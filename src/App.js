import RoomList from "./routes/RoomList";
import { Routes, Route } from "react-router-dom";
import ReservationRoom from "./routes/ReservationRoom";
import { RoomProvider } from "./context/RoomContex";

function App() {
  return (
    <div>
      <RoomProvider>
        <Routes>
          <Route path="/" element={<RoomList />}></Route>
          <Route path="/reserva" element={<ReservationRoom />} />
        </Routes>
      </RoomProvider>
    </div>
  );
}

export default App;
