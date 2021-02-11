import { useState, useEffect } from 'react';
import config from '../api-config';
import AudiobookRow from './AudiobookRow';

const Search = () => {
  const [allAudiobooks, setAllAudiobooks] = useState([])
  
  function getAllAudiobooks() {
    const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${config.TOKEN}`
      }
    };

    fetch(`${config.BASE_URL}spaces/${config.SPACE_ID}/environments/${config.ENVIRONMENT}/entries?select=fields,sys.id,sys.version&locale=es-MX&content_type=${config.CONTENT_TYPE_ID}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setAllAudiobooks(result.items)
      })
      .catch(error => console.log('error', error));
  }

  return(
    <>
    <form action="">
      <label htmlFor="">
        <input type="text"/>
      </label>
      
      <button type="submit">Search</button>
    </form>
    <form action="">
      <label htmlFor=""> Title
        <input type="text"/>
      </label>
      <label htmlFor="">
        <input type="checkbox"/>
        Original
      </label>
      <label htmlFor="">Author 
        <input type="text"/>
      </label>
      <label htmlFor="">Narrator
        <input type="text"/>
      </label>
      <label htmlFor="">Duration 
        <input type="text"/>
      </label>
      <label htmlFor="">Cover 
        <input type="text"/>
      </label>
      <button>Add Book</button>
    </form>
    <button onClick={getAllAudiobooks}>GetBooks</button>
    {allAudiobooks.map(item =>
      <AudiobookRow key={item.sys.id}  {...item.fields} id={item.sys.id} />
    )}
    </>
  )
}

export default Search
