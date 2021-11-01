import React from "react";
import { useGlobalContext } from "../../store/context";

const Home = () => {
  const ctx = useGlobalContext();
  console.log(ctx.data.username);

  return <div>{ctx.data.username}</div>;
};

export default Home;
