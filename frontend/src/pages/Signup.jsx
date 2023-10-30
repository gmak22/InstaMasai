import React, { useState } from "react";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [isMarried, setIsmarried] = useState("");
  const handleSubmit = () => {
    const payload = {
      name,
      email,
      password,
      gender,
      age,
      city,
      isMarried,
    };

    fetch("https://sparkling-blue-gopher.cyclic.app/users/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="number"
        value={age}
        placeholder="Age"
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        value={gender}
        placeholder="Gender"
        onChange={(e) => setGender(e.target.value)}
      />
      <input
        type="text"
        value={city}
        placeholder="City"
        onChange={(e) => setCity(e.target.value)}
      />
      <select onChange={(e) => setIsmarried(e.target.value)}>
        <option value={true}>yes</option>
        <option value={false}>no</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};
