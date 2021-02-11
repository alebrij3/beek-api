const Search = () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://api.contentful.com/spaces/xxxxxxxxxxxx/environments/xxxxxxx/entries?select=fields,sys.id,sys.version&locale=es-MX&content_type=xxxxxxxxxxx", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  console.log(process.env.FOO)

  return(
    <form action="">
      <input type="text"/>
      <button type="submit">Search</button>
    </form>
  )
}

export default Search
