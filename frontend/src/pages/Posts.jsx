import React, { useEffect, useState } from "react";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [numberc, setNumc] = useState("");
  const [device, setDevice] = useState("");

  const token = localStorage.getItem("token");

  const handleAdd = () => {
    const payload = {
      title,
      body,
      device,
      no_of_comments: numberc,
    };

    fetch("https://sparkling-blue-gopher.cyclic.app/posts/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    fetch(`https://sparkling-blue-gopher.cyclic.app/posts/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch("https://sparkling-blue-gopher.cyclic.app/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPosts(res);
      })
      .catch((err) => console.log(err));
  });

  return (
    <form onSubmit={handleAdd}>
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        value={body}
        placeholder="Body"
        onChange={(e) => setBody(e.target.value)}
      />
      <input
        type="number"
        value={numberc}
        placeholder="Numbe rof Comments"
        onChange={(e) => setNumc(e.target.value)}
      />
      <input
        value={device}
        placeholder="Device"
        onChange={(e) => setDevice(e.target.value)}
      />
      <button>Create</button>
    </form>
  );
};
