const AudiobookRow = (props) => {
  console.log(props.id)
  const removeAudiobook = (id) => {
    var raw = "";

    var requestOptions = {
      method: 'DELETE',
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
      <button className="remove-btn">Remove</button>
      <button>Update</button>
    </div>
  )

}

export default AudiobookRow;