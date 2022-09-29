import { createContext, useState } from "react";

const RoomContext = createContext();


const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState({});
  const handleRoom = (infoRoom) => {
    setRoom(infoRoom);
  };

  const data = { room, handleRoom };

  return <RoomContext.Provider value={data}>{children}</RoomContext.Provider>;
};

export { RoomProvider };
export default RoomContext;
