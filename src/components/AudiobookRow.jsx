const AudiobookRow = (props) => {
  console.log(props.id)
  return(
    <>
    <p>{props.title["es-MX"]}</p>
    <p>{props.authors["es-MX"][0]}</p>
    </>
  )

}

export default AudiobookRow;