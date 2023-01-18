import React, {useState} from "react";
import {Link} from "react-router-dom";
import {PencilSquare, Trash} from "react-bootstrap-icons";
import {sweetAlertRemoveTwit} from "../helpers/helpers";
import {useRemoveTwitMutation} from "../../api/apiTwits";
import EditTwitModal from "../modals/EditTwitModal";

const TwitItem = ({twit}) => {
  const [editTwit, setEditTwit] = useState(twit)
  const [showModal, setShowModal] = useState(false);
  const [removeTwit] = useRemoveTwitMutation()
  const removeTwitConfirm = () => {
    sweetAlertRemoveTwit(twit, removeTwit)
  }
  const handleShowEdit = () => setShowModal(p => !p);
  const onChangeEditTwit = (e) => {
    setEditTwit(Object.assign({}, editTwit, {[e.target.name]: e.target.value}))
  }

  return <tr className="fw-normal">
    <td className="align-middle mx-2 d-flex justify-content-between">

      <div>{twit.text}</div>
      <div className='d-inline-flex align-self-center'>
        <Link to="#" onClick={handleShowEdit}>
          <PencilSquare className="ml-2" color="royalblue" size={20} />
        </Link>
        <Link to="#" onClick={removeTwitConfirm}>
          <Trash className="mx-2" color="red" size={20} />
        </Link>
      </div>

      <EditTwitModal
        editTwit={editTwit}
        onChangeEditTwit={onChangeEditTwit}
        showModal={showModal}
        handleShowEdit={handleShowEdit}
      />

    </td>
  </tr>
}

export default TwitItem