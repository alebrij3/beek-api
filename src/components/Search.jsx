import config from '../api-config';

const Search = () => {
  var requestOptions = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc`
    },
    redirect: 'follow'
  };
  
  fetch(`https://api.contentful.com/spaces/${config.SPACE_ID}/environments/${config.ENVIRONMENT}/entries?select=fields,sys.id,sys.version&locale=es-MX&content_type=${config.CONTENT_TYPE_ID}`, requestOptions)
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
