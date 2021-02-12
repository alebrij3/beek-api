import { useState } from 'react';
import config from '../api-config';
import AudiobookRow from './AudiobookRow';

const Search = () => {
  const [allAudiobooks, setAllAudiobooks] = useState([])
  
  const getAllAudiobooks = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    };
    console.log(process.env.REACT_APP_BASE_URL)

    fetch(`${config.BASE_URL}spaces/${config.SPACE_ID}/environments/${config.ENVIRONMENT}/entries?select=fields,sys.id,sys.version&locale=es-MX&content_type=${config.CONTENT_TYPE_ID}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setAllAudiobooks(result.items)
      })
      .catch(error => console.log('error', error));
  }

  const addAudiobook = (e) => {
    e.preventDefault()
    const target = e.target
    console.log(target.original.checked)
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
    <form action="">
      <label htmlFor="">Search
        <input type="text"/>
      </label>
      
      <button type="submit">Search</button>
    </form>

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
    <button onClick={getAllAudiobooks}>GetBooks</button>
    {allAudiobooks.map(item =>
      <AudiobookRow key={item.sys.id}  {...item.fields} id={item.sys.id} />
    )}
    </>
  )
}

export default Search
