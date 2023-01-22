import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const LOCAL_URL = 'ws://localhost:3000/cable'
export const csrfToken = document.querySelector('[name=csrf-token]').content

export const sweetAlertRemoveTweet = (tweet, removeTweet, setHasNextPage, setPage) => {
  const MySwal = withReactContent(Swal)
  MySwal.fire({
    title: `Are you sure you want to remove tweet?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Remove'
  }).then((result) => {
    if (result.isConfirmed) {
      removeTweet(tweet.id)
      setHasNextPage(false)
      setPage(1)
    }
  })
}

export const isEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object