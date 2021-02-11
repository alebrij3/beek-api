const Search = () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`https://api.contentful.com/spaces/${process.env.SPACE_ID}/environments/${process.env.ENVIRONMENT}/entries?select=fields,sys.id,sys.version&locale=es-MX&content_type=${process.env.CONTENT_TYPE_ID}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  return(
    <form action="">
      <input type="text"/>
      <button type="submit">Search</button>
    </form>
  )
}

export default Search
