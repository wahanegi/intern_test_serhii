import React, {useEffect, useMemo, useState} from "react";
import {useGetTweetsQuery} from "../../api/apiTweets";
import Spinner from "../common/Spinner";
import CreateTweetForm from "./CreateTweetForm";
import TweetItem from "./TweetItem";
import { Waypoint } from 'react-waypoint';
import Notification from "./Notification";
import consumer from "../../channels/consumer";

const Tweets = () => {
  const [tweet, setTweet] = useState({})
  const [page, setPage] = useState(1);
  const [isLogin, setIsLogin] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const {
    data: tweets,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTweetsQuery({page, hasNextPage});

  const currentUserId = useMemo(() => tweets?.current_user_id, [isLoading]);

  useEffect(() => {
    if (isLoading) return
    isSuccess && setIsLogin(tweets.is_login)
  }, [isLoading])

  useEffect(() => {
    consumer.subscriptions.create({
      channel: 'TweetsChannel'
    }, {
      connected: () => console.log('connected'),
      disconnected: () => console.log('disconnected'),
      received: user_id => {
        if (isLoading) return
        user_id && (user_id !== currentUserId) && setShowNotification(true)
      }
    })
  }, [currentUserId])

  const onChangeTweet = (e) => {
    setTweet(Object.assign({}, tweet, {[e.target.name]: e.target.value}))
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>{error.status}</div>;
  }

  const tweetItem = tweets.data.map(tweet => {
    return <TweetItem
      key={tweet.id}
      tweet={tweet.attributes}
      setHasNextPage={setHasNextPage}
      setPage={setPage}
    />
  })

  const onScrollDown = () => {
    setHasNextPage(true)
    setPage(page + 1)
  }

  return <section className="home-page">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-12 col-xl-10 h-100">
          <div className="card h-100">
            <div className="card-header p-3" hidden={!isLogin}>
              <CreateTweetForm
                tweet={tweet}
                setTweet={setTweet}
                onChangeTweet={onChangeTweet}
                setHasNextPage={setHasNextPage}
                setPage={setPage}
              />
            </div>
            <Notification hidden={!showNotification} setShowNotification={setShowNotification} />
            <div className="card-body table-scroll">
              <table className="table mb-0">
                <tbody>
                  {tweetItem}
                </tbody>
              </table>
              <Waypoint onEnter={onScrollDown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default Tweets
