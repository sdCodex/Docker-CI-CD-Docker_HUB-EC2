"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  name: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<String>("");
  const [loader, setLoader] = useState<Boolean>(false);

  async function fetch() {
    try {
      setLoader(true);
      const response = await axios.get("http://localhost:3001/");
      setUsers(response.data);
    } catch (e: any) {
      setError(e.response.data);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <div style={{ margin: "auto", width: "50%" }}>
        {loader ? <h1>Loading.....</h1> : error && <h2>{error}</h2>}

        {!loader && !error && (
          <ul>
            {users.map((user, idx) => {
              return (
                <li key={idx}>
                  <span>Name: {user.name}</span>
                  <span style={{marginLeft:"10px"}}>Email:{user.email}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
