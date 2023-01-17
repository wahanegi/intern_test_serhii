import React from "react";
import {useGetTwitsQuery} from "../../api/apiTwits";
import Spinner from "../common/Spinner";

const Twits = () => {
  const {
    data: twits,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTwitsQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>{error.status}</div>;
  }

  return isSuccess && <section className="home-page">
    <div>
      Hello from react!!!!!
    </div>
  </section>
}

export default Twits