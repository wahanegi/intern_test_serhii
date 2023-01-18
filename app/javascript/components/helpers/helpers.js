import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const csrfToken = document.querySelector('[name=csrf-token]').content

export const sweetAlertRemoveTweet = (tweet, action) => {
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
      action(tweet.id)
    }
  })
}

export const isEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object