import React from "react";
import {apiTweets} from "../../api/apiTweets";
import {useDispatch} from "react-redux";

const Notification = ({hidden, setShowNotification}) => {
  const dispatch = useDispatch()
  const refreshTweets = () => {
    dispatch(
      apiTweets.endpoints.getTweets.initiate(
        { page: 1 },
        { subscribe: false, forceRefetch: true }
      )
    )
    setShowNotification(false)
  }

  return !hidden && <div className="alert alert-info d-flex justify-content-between" role="alert">
    <button onClick={refreshTweets} type="button" className="btn btn-secondary">Load New Tweets!</button>
    <button onClick={() => {setShowNotification(false)}} type="button" className="btn-close align-self-center"
            data-bs-dismiss="alert" aria-label="Close">
    </button>
  </div>
}

export default Notification