import React, {useState} from "react";
import {Link} from "react-router-dom";
import {PencilSquare, Trash} from "react-bootstrap-icons";
import {sweetAlertRemoveTweet} from "../helpers/helpers";
import {useRemoveTweetMutation} from "../../api/apiTweets";
import EditTweetModal from "../modals/EditTweetModal";
import userIcon from "../../../assets/images/icons8-test-account-48.png";

const TweetItem = ({tweet, setHasNextPage, setPage}) => {
  const [editTweet, setEditTweet] = useState(tweet)
  const [showModal, setShowModal] = useState(false);
  const [removeTweet] = useRemoveTweetMutation()
  const removeTweetConfirm = () => {
    sweetAlertRemoveTweet(tweet, removeTweet, setHasNextPage, setPage)
  }
  const handleShowEdit = () => setShowModal(p => !p);
  const onChangeEditTweet = (e) => {
    setEditTweet(Object.assign({}, editTweet, {[e.target.name]: e.target.value}))
  }
  const {email, avatar_url, full_name} = tweet.user_attributes

  const AvatarBlock = () => {
    return <div className="row">
      <div className="col avatar mt-1">
        <i className="me-2 text-dark"><img src={userIcon} alt={"icon"}/></i>
      </div>
      <div className="col">
        <p className='align-text-top'>{email}</p><br/>
        <p className='align-text-bottom'>{full_name}</p>
      </div>
    </div>
  }

  return <tr className="fw-normal">
    <td className="align-middle">
      <div className="card w-100">
        <div className="card-header" style={{backgroundColor: 'white'}}>
          <AvatarBlock />
        </div>
        <div className="card-body mx-2 d-flex justify-content-between">
          <div className="card-text">{tweet.content}</div>
          <div className='d-inline-flex align-self-start'>
            <Link to="#" onClick={handleShowEdit} hidden={!tweet.is_owner}>
              <PencilSquare className="ml-2" color="royalblue" size={20} />
            </Link>
            <Link to="#" onClick={removeTweetConfirm} hidden={!tweet.is_owner}>
              <Trash className="mx-2" color="red" size={20} />
            </Link>
          </div>
        </div>
      </div>

      <EditTweetModal
        editTweet={editTweet}
        onChangeEditTweet={onChangeEditTweet}
        showModal={showModal}
        handleShowEdit={handleShowEdit}
        setHasNextPage={setHasNextPage}
        setPage={setPage}
      />

    </td>
  </tr>
}

export default TweetItem