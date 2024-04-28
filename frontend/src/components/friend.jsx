import React, { useEffect, useState } from "react";
import { fetchNotFriends, AddFriend } from "../services/searchBooks";
import { useUser } from "../services/userContext";
const Friend = ({ friendsList }) => {
  const [notFriends, setNotFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState();
  const { userId, setUserId } = useUser("");

  const getNotfriends = async () => {
    await fetchNotFriends(setNotFriends, setLoading);
  };

  const addThisFriend = async (friendId) => {
    await AddFriend(userId, friendId);
    getNotfriends();
  };
  const handleSelect = (e) => {
    setSelectedId(e.target.value);
  };
  const handleAdd = () => {
    if (selectedId !== "") {
      addThisFriend(selectedId);
    }
  };
  useEffect(() => {
    getNotfriends();
  }, []);
  return (
    <>
      <div>Add Friends here</div>
      <div className="friendSearch">
        <select onSelect={handleSelect}>
          {notFriends.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <button className="add" onClick={handleAdd}>
          Add
        </button>
      </div>
    </>
  );
};

export default Friend;
