import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast.success("Created a new room");
  };
  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Room Id and username are required");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    console.log(e.code);
    if (e.code === "Enter") {
      joinRoom();
    }
  };
  return (
    <div className="home-page-container">
      <div className="form-container">
        <img className="home-page-logo" src="/code-sync.png" alt="icon" />
        <h4 className="main-label">Paste Invitation Room ID</h4>
        <div className="input-group">
          <input
            type="text"
            className="input-box"
            placeholder="ROOM ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="input-box"
            placeholder="USER NAME"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyUp={handleInputEnter}
          />
          <button className="btn join-btn" onClick={joinRoom}>
            JOIN
          </button>
          <span className="create-info">
            If u don't have invite, create &nbsp;
            <a href="!#" className="create-new-room" onClick={createNewRoom}>
              new room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>Built with love</h4>
      </footer>
    </div>
  );
};

export default Home;
