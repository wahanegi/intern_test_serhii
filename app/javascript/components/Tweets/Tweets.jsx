import React, {useEffect, useState} from "react";
import {useGetTweetsQuery} from "../../api/apiTweets";
import Spinner from "../common/Spinner";
import CreateTweetForm from "./CreateTweetForm";
import TweetItem from "./TweetItem";
import {Button} from "react-bootstrap";
import { Waypoint } from 'react-waypoint';

const Tweets = () => {
  const [tweet, setTweet] = useState({})
  const [page, setPage] = useState(1);
  const {
    data: tweets,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetTweetsQuery(page);
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
  {console.log("tweets", tweets)}
  {console.log("page", page)}
  return <section className="home-page">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-12 col-xl-10 h-100">
          <div className="card h-100">
            <div className="card-header p-3" hidden={!tweets.is_login}>
              <CreateTweetForm tweet={tweet} setTweet={setTweet} onChangeTweet={onChangeTweet} />
            </div>
            <div className="card-body table-scroll">
              <Button onClick={() => setPage(page - 1)}> Previous</Button>
              <Button onClick={() => setPage(page + 1)}>Next</Button>
              <table className="table mb-0">
                <tbody>
                  {tweetItem}
                </tbody>
              </table>
              <Waypoint
                onEnter={() => setPage(page + 1)}
                // onLeave={() => setPage(page - 1)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default Tweets