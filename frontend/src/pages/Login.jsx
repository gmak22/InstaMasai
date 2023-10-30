import React, { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handleSubmit = () => {
  const payload = {
    email,
    password,
  }

  fetch("https://sparkling-blue-gopher.cyclic.app/users/login",{
    method: "POST",
    headers: {"Content-type":"application/json"},
    body: JSON.stringify(payload)
  })
  .then((res)=> res.json())
  .then((res)=> {
    console.log(res)
    localStorage.setItem("token",res.token)
  })
  .catch((err)=>console.log(err))
}

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};
