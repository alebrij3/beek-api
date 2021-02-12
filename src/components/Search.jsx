import { useState } from 'react';
import { version } from 'react-dom';
import config from '../api-config';
import AudiobookRow from './AudiobookRow';

const Search = () => {
  const [allAudiobooks, setAllAudiobooks] = useState([])
  const [searchResults, setSearchResults] = useState([])
  
  const getAllAudiobooks = () => {
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

  const searchAudiobook = (e) => {
    e.preventDefault()
    let query = e.target.search.value

    const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${config.TOKEN}`
      }
    };
    fetch(`${config.BASE_URL}spaces/${config.SPACE_ID}/environments/${config.ENVIRONMENT}/entries?query=${query}&select=fields,sys.id&locale=es-MX&content_type=${config.CONTENT_TYPE_ID}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setSearchResults(result.items)
      })
      .catch(error => console.log('error', error));
    
    document.getElementById('add-book').reset()
  }

  const addAudiobook = (e) => {
    e.preventDefault()
    const target = e.target
    const audiobook = {
      "fields": {
        "title": {
          "es-MX": target.title.value
        },
        "is_original": {
          "es-MX": target.original.checked
        },
        "street_date": {
          "es-MX": "2020-12-25T00:00-06:00"
        },
        "cost_per_play": {
          "es-MX": 90
        },
        "authors": {
          "es-MX": [
            target.author.value
          ]
        },
        "narrators": {
          "es-MX": [
            target.narrator.value
          ]
        },
        "duration": {
          "es-MX": parseInt(target.duration.value)
        },
        "cover": {
          "es-MX": "https://images.findawayworld.com/v1/image/cover/CD059097"
        }
      }
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-Contentful-Content-Type": config.CONTENT_TYPE_ID,
        "Authorization": `Bearer ${config.TOKEN}`
      },
      body: JSON.stringify(audiobook)
    };
    fetch(`${config.BASE_URL}spaces/${config.SPACE_ID}/environments/${config.ENVIRONMENT}/entries`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
    document.getElementById('add-book').reset()
    getAllAudiobooks()
  }

  return(
    <>
    <form action="" onSubmit={searchAudiobook}>
      <label htmlFor="search">Search
        <input type="text" name="search" />
      </label>
      
      <button type="submit">Search</button>
    </form>

    {searchResults.map(item =>
      <AudiobookRow key={item.sys.id}  {...item.fields} id={item.sys.id} version={item.sys.version} />
    )}

    <form id="add-book" action="" onSubmit={addAudiobook}>
      <label htmlFor=""> Title
        <input type="text" name="title"/>
      </label>
      <label className="checkbox" htmlFor="">
        <input type="checkbox" name="original"/>
        Original
      </label>
      <label htmlFor="">Author 
        <input type="text" name="author" />
      </label>
      <label htmlFor="">Narrator
        <input type="text" name="narrator" />
      </label>
      <label htmlFor="">Duration
        <input type="number" name="duration" />
      </label>
      <button type="submit">Add Book</button>
    </form>
    


    <button onClick={getAllAudiobooks}>Get All Books</button>
    {allAudiobooks.map(item =>
      <AudiobookRow key={item.sys.id}  {...item.fields} id={item.sys.id} version={item.sys.version} />
    )}
    </>
  )
}

export default Search
