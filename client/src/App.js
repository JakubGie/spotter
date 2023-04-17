import './App.css';
import { useEffect, useState } from 'react'
import AllRoutes from './routes/AllRoutes';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Link } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)



function App() {

  const [searchRes, setSearchRes] = useState()

  const [text, setText] = useState('')

  useEffect(() => {
    setSearchRes(undefined)
    if(text!='') {
      const fetchUrl = '/api/search/'+text
      fetch(fetchUrl).then((res) => {
        if(res.ok) {
          return res = res.json()
        }
        console.log('błądek')
      }).then((data) => {
        setSearchRes(data)
      })
    }
  }, [text])

  function handleChange(e) {
    setText(e.target.value)
  }

  function clearSearch() {
    setText('')
  }

  return (
    <div className="App">
      <Navbar value={text} onChange={handleChange} clearSearch={clearSearch} />
      { text === '' ? (
        <AllRoutes />
      ) : (
     
          <div className="Spotteds searchBlock">
            <h2>Znalezione spoty:</h2>
          {(typeof searchRes === 'undefined' ? (
            <img className="loading" src={process.env.PUBLIC_URL + '/loading.svg'} /> 
          ) : (
            <>
              { (searchRes.length === 0 ? (
                <div className="noResults">Brak <img className="loading" src={process.env.PUBLIC_URL + '/sad.png'} className="sadEmote" /></div>
              ) : (
                <>
                 {searchRes.map((spotted) => (
                  <><Link to={'/spotted/' + spotted.username} onClick={clearSearch}  className="spottedLink">Spotted {spotted.name}</Link> </>
                ))}
                </>
              ))}

             
            </>
          ))}
          </div>
     
        
      ) }
      <Footer />
    </div>
  );
}

export default App;
