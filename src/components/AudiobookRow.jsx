import { useState } from 'react';
import config from '../api-config'

const AudiobookRow = (props) => {
  const [audiobookCover, setAudiobookCover] = useState(false)
  
  const removeAudiobook = (id) => {
    const raw = "";

    const requestOptions = {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${config.TOKEN}`
      },
      body: raw,
      redirect: 'follow'
    };

    fetch(`${config.BASE_URL}spaces/${config.SPACE_ID}/environments/${config.ENVIRONMENT}/entries/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }
  const showAudiobook = (id) => {
    console.log('book to show: ' + id)

    const requestOptions = {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${config.TOKEN}`
      }
    };

    fetch(`${config.BASE_URL}spaces/${config.SPACE_ID}/environments/${config.ENVIRONMENT}/entries?sys.id=${id}&select=fields,sys.id,sys.version&locale=es-MX`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setAudiobookCover(result.items[0].fields.cover["es-MX"])
      })
      .catch(error => console.log('error', error));

  }

  const showUpdateForm = () => {
    document.getElementById("form" + props.id).style.display = "block"
  }

  const updateAudiobook = (e) => {
    e.preventDefault()
    const target = e.target
    const id = target.bookId.value
    const version = target.version.value
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
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "X-Contentful-Content-Type": config.CONTENT_TYPE_ID,
        "X-Contentful-Version": version,
        "Authorization": `Bearer ${config.TOKEN}`
      },
      body: JSON.stringify(audiobook)
    };
    fetch(`${config.BASE_URL}spaces/${config.SPACE_ID}/environments/${config.ENVIRONMENT}/entries/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
      document.getElementById("form" + props.id).style.display = "none"
      document.getElementById('all-audiobooks').innerHTML = ''
      props.getAllAudiobooks()
  }
  console.log(props.version)
  return(
    <div className="book-row">
      <p className="title">{props.title["es-MX"]}</p>
      <p className="author">{props.authors["es-MX"][0]}</p>
      <button onClick={() => showAudiobook(props.id)}>Audiobook cover</button>
      <button onClick={showUpdateForm}>Update</button>
      <button onClick={() => removeAudiobook(props.id)} className="remove-btn">Remove</button>
      <div className="book-cover">
        <img src={audiobookCover} alt="" />
      </div>

      <form id={"form" + props.id} action="" onSubmit={updateAudiobook} style={{display: "none"}}>
      <label htmlFor=""> Title
        <input type="text" name="title" defaultValue={props.title["es-MX"]} />
      </label>
      <label className="checkbox" htmlFor="">
        <input type="checkbox" name="original"/>
        Original
      </label>
      <label htmlFor="">Author 
        <input type="text" name="author" defaultValue={props.authors["es-MX"][0]} />
      </label>
      <label htmlFor="">Narrator
        <input type="text" name="narrator" defaultValue={props.narrators["es-MX"][0]}/>
      </label>
      <label htmlFor="">Duration
        <input type="number" name="duration" defaultValue={parseInt(props.duration["es-MX"])} />
      </label>
      <input type="text" name="bookId" hidden value={props.id} readOnly />
      <input type="text" name="version" hidden value={props.version} readOnly />
      <button type="submit">Update Book</button>
    </form>
    </div>
  )

}

export default AudiobookRow;