import React, {useEffect, useState} from "react";
import {useGetTwitsQuery} from "../../api/apiTwits";
import Spinner from "../common/Spinner";
import CreateTwitForm from "./CreateTwitForm";
import TwitItem from "./TwitItem";

const Twits = () => {
  const [twit, setTwit] = useState({})
  const {
    data: twits,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTwitsQuery();
  const onChangeTwit = (e) => {
    setTwit(Object.assign({}, twit, {[e.target.name]: e.target.value}))
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>{error.status}</div>;
  }

  const twitItem = twits.data.map((twit) => {
    return <TwitItem key={twit.id} twit={twit.attributes} />
  })

  return isSuccess && <section className="home-page">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-12 col-xl-10 h-100">
          <div className="card h-100">
            <div className="card-header p-3">
              <CreateTwitForm twit={twit} setTwit={setTwit} onChangeTwit={onChangeTwit} />
            </div>
            <div className="card-body table-scroll">
              <table className="table mb-0">
                <tbody>
                  {twitItem}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default Twits