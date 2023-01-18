import React from "react";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {useUpdateTwitMutation} from "../../api/apiTwits";

const EditTwitModal = ({onChangeEditTwit, handleShowEdit, editTwit, showModal }) => {
  const [updateTwit] = useUpdateTwitMutation()

  const onClickSave = () => {
    updateTwit(editTwit).then(handleShowEdit())
  }

  return <Modal show={showModal} onHide={handleShowEdit} animation={false}>
    <Modal.Header closeButton className="back-ground-header">
      <Modal.Title>Edit twit</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Twit content</Form.Label>
          <Form.Control
            type="text"
            name="text"
            placeholder="Enter twit"
            value={editTwit.text}
            onChange={onChangeEditTwit}
            autoFocus
          />
        </Form.Group>
      </Form>
    </Modal.Body>

    <Modal.Footer className="back-ground-header">
      <Button variant="primary" onClick={onClickSave}>
        Update twit
      </Button>
    </Modal.Footer>
  </Modal>
}

export default EditTwitModal