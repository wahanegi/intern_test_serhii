import React, {Fragment, useEffect} from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import {useAddTweetMutation} from "../../api/apiTweets";

const CreateTweetForm = ({tweet, setTweet, onChangeTweet, setPage, setHasNextPage}) => {
  const [addTweet, { isSuccess }] = useAddTweetMutation()

  const onClickSave = () => {
    addTweet(tweet)
      .then(setPage(1))
      .then(setHasNextPage(false))
  }
  useEffect(() => {
    isSuccess && setTweet('')
  }, [isSuccess])

  return <Fragment>
    <Form>
      <Form.Group className="mb-2">
        <Form.Label>Type your tweet</Form.Label>
        <Form.Control
          type="text"
          as="textarea"
          rows="3"
          name="content"
          onChange={onChangeTweet}
          maxLength={255}
          value={tweet.content || ''}
          placeholder="What's happening?"
          autoFocus />
      </Form.Group>
    </Form>
    <Button variant="primary" disabled={!tweet.content} onClick={onClickSave}>
      Tweet
    </Button>
  </Fragment>
}

export default CreateTweetForm
