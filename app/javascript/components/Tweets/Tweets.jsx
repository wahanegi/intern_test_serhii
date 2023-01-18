import React, {useEffect, useState} from "react";
import {useGetTweetsQuery} from "../../api/apiTweets";
import Spinner from "../common/Spinner";
import CreateTweetForm from "./CreateTweetForm";
import TweetItem from "./TweetItem";

const Tweets = () => {
  const [tweet, setTweet] = useState({})
  const {
    data: tweets,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTweetsQuery();
  const onChangeTweet = (e) => {
    setTweet(Object.assign({}, tweet, {[e.target.name]: e.target.value}))
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>{error.status}</div>;
  }

  const tweetItem = tweets.data.map((tweet) => {
    return <TweetItem key={tweet.id} tweet={tweet.attributes} />
  })

  return isSuccess && <section className="home-page">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-12 col-xl-10 h-100">
          <div className="card h-100">
            <div className="card-header p-3" hidden={!tweets.is_login}>
              <CreateTweetForm tweet={tweet} setTweet={setTweet} onChangeTweet={onChangeTweet} />
            </div>
            <div className="card-body table-scroll">
              <table className="table mb-0">
                <tbody>
                  {tweetItem}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default Tweets