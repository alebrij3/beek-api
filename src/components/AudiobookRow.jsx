const AudiobookRow = (props) => {
  console.log(props.id)
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