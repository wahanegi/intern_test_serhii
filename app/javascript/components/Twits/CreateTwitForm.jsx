import React, {Fragment, useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import {useAddTwitMutation} from "../../api/apiTwits";

const CreateTwitForm = ({twit, setTwit, onChangeTwit}) => {
  const [addTwit, { isSuccess }] = useAddTwitMutation()

  const onClickSave = () => {
    addTwit(twit)
  }
  useEffect(() => {
    isSuccess && setTwit('')
  }, [isSuccess])

  return <Fragment>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Type your twit</Form.Label>
        <Form.Control type="text" as="textarea" rows="3" name="text" onChange={onChangeTwit} value={twit.text || ''} placeholder="What's happening?" autoFocus />
      </Form.Group>
    </Form>
    <Button variant="primary" disabled={!twit.text} onClick={onClickSave}>
      Tweet
    </Button>
  </Fragment>
}

export default CreateTwitForm
