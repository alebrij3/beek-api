const AudiobookRow = (props) => {
  console.log(props.id)
  return(
    <div className="book-row">
      <p>{props.title["es-MX"]}</p>
      <p>{props.authors["es-MX"][0]}</p>
    </div>
  )

}

export default AudiobookRow;