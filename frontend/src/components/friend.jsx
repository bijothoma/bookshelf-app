import React, { useEffect, useState } from "react";
import {
  fetchNotFriends,
  AddFriend,
  fetchFriends,
} from "../services/searchBooks";
import { useUser } from "../services/userContext";
import "../styles/friend.css";
import Spinner from "./spinner";
const Friend = ({ friendsList }) => {
  const [notFriends, setNotFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [selectedId, setSelectedId] = useState("");
  const { userId, setUserId } = useUser("");

  const getNotfriends = async () => {
    await fetchNotFriends(userId, setNotFriends, setLoading1);
  };

  const getFriends = async () => {
    await fetchFriends(userId, setFriends, setLoading2);
  };

  const addThisFriend = async (friendId) => {
    await AddFriend(userId, friendId);
    await getNotfriends();
    await getFriends();
  };
  const handleSelect = (e) => {
    setSelectedId(e.target.value);
  };
  const handleAdd = () => {
    if (selectedId !== "") {
      addThisFriend(selectedId);
      setSelectedId("");
      //document.getElementById("friendDrop").value  = ""
    }
  };
  useEffect(() => {
    getNotfriends();
    getFriends();
  }, []);
  return (
    <div className="friendPage">
      <div className="friends_title"><h1>Add Friends here</h1></div>
      <div className="friendSearch">
        <select id="friendDrop" className="friendSelect" onChange={handleSelect} >
          <option value="" style={{ display: "none" }} disabled selected={selectedId === ""}>
            Select a friend from the list
          </option>
          {notFriends.map((option, index) => (
            <option key={index} value={option._id} selected = {selectedId === option._id}>
              {option.name}
            </option>
          ))}
        </select>
        <button className="friends_add" onClick={handleAdd}>
          Add
        </button>
      </div>
      <div className="friends_list">
        {loading2 ? (
          <Spinner />
        ) : (
          <div style={{ marginLeft: "30px", marginTop: "50px" }}>
            <div >
              <h2 style={{ borderBottom:"1px solid #dcd6cc" }}>Friends List</h2>
            </div>
            {friends?.map((friend) => (
              <div style={{ fontSize:"20px" }}>{friend.friendId.name}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friend;
