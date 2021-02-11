import config from '../api-config'

const AudiobookRow = (props) => {
  const removeAudiobook = (id) => {
    console.log('book to delete: ' + id)
    const raw = "";

    const requestOptions = {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${config.TOKEN}`
      },
      body: raw,
      redirect: 'follow'
    };

    fetch(`${config.BASE_URL}spaces/${config.SPACE_ID}/environments/${config.ENVIRONMENT}/entries/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }
  return(
    <div className="book-row">
      <p className="title">{props.title["es-MX"]}</p>
      <p className="author">{props.authors["es-MX"][0]}</p>
      <button onClick={() => removeAudiobook(props.id)} className="remove-btn">Remove</button>
      <button>Update</button>
    </div>
  )

}

export default AudiobookRow;