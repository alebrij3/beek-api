import { useState } from 'react';
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

    console.log('called')

    fetch("https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries?select=fields,sys.id,sys.version&locale=es-MX&content_type=audiocontent-v8", requestOptions)
      .then(response => response.json())
      .then(result => {
        setAllAudiobooks(result.items)
      })
      .catch(error => console.log('error', error));
  }

  return(
    <>
    <form action="">
      <input type="text"/>
      <button type="submit">Search</button>
    </form>
    <button onClick={getAllAudiobooks}>GetBooks</button>
    {allAudiobooks.map(item =>
      <AudiobookRow key={item.sys.id}  {...item.fields} />
    )}
    </>
  )
}

export default Search
