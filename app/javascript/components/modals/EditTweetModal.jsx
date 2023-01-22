import React from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {useUpdateTweetMutation} from "../../api/apiTweets";

const EditTweetModal = ({
                          onChangeEditTweet, handleShowEdit, editTweet, showModal,
                          setHasNextPage, setPage
                        }) => {
  const [updateTweet] = useUpdateTweetMutation()

  const onClickSave = () => {
    updateTweet(editTweet)
      .then(handleShowEdit())
      .then(setHasNextPage(false))
      .then(setPage(1))
  }

  return <Modal show={showModal} onHide={handleShowEdit} animation={false}>
    <Modal.Header closeButton className="back-ground-header">
      <Modal.Title>Edit tweet</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Tweet content</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            maxLength={255}
            rows="5"
            name="content"
            placeholder="Enter tweet"
            value={editTweet.content}
            onChange={onChangeEditTweet}
            autoFocus
          />
        </Form.Group>
      </Form>
    </Modal.Body>

    <Modal.Footer className="back-ground-header">
      <Button variant="primary" onClick={onClickSave}>
        Update tweet
      </Button>
    </Modal.Footer>
  </Modal>
}

export default EditTweetModal