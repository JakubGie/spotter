import { useState } from "react"
import { Link, redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const CreateNewSpotted = () => {

    const [spottedBody, setSpottedBody] = useState()
    const [spottedName, setSpottedName] = useState()
    const [spottedUsername, setSpottedUsername] = useState()

    const [isPending, setIsPending] = useState(false)
    const [isAdded, setIsadded] = useState()

    function handleSubmit(e) {
        e.preventDefault()
        setIsPending(true)

        const spotted = { spottedName, spottedBody, spottedUsername }

        fetch('/api/add-spotted', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(spotted)
        }).then((res) => {
            return res = res.json()
        }).then((data) => {
            setIsPending(false)
            setIsadded({
                name: spottedName,
                userName: spottedUsername
            })
        })
    }



    return (
        <div className="container createNewSpotted">
            <Helmet>
                <title>Stwórz nowy spotted | Spotter</title>
            </Helmet>
            <h1>Stwórz nowy spotted</h1>
            {isPending === true ? (
                 <img className="loading" src={process.env.PUBLIC_URL + '/loading.svg'} /> 
            ) : (
                <>
                    {( typeof isAdded === 'undefined' ? (
                          <form onSubmit={handleSubmit}>

                          <h2>1. Nazwa</h2>
                          <div className="nsNameDiv">
                              <span className="nsName">Spotted</span> <input 
                              type="text" 
                              placeholder="Sympatia Warszawa" 
                              required 
                              name="name"
                              onChange={(e) => setSpottedName(e.target.value)}
                              />
                          </div>
                          <h2>2. Username</h2>
                          <div className="nsNameDiv">
                              <span className="nsName">@</span> <input type="text"
                              className="unInput" 
                              placeholder="sympatia-warszawa" 
                              required 
                              onChange={(e) => setSpottedUsername(e.target.value)}/>
                          </div>
                          <h2>3. Opis</h2>
                          <textarea 
                          required 
                          placeholder="napisz tu coś :)" 
                          onChange={(e) => setSpottedBody(e.target.value)}>
                              
                          </textarea>
                          <button>
                              Dodaj spotted
                          </button>
      
      
                          </form>
                    ) : (
                        <>
                            <h2 className="spottedAdded"><Link to={"/spotted/"+isAdded.userName}><span>Spotted</span> {isAdded.name}</Link> został dodany</h2>
                        </>
                    ))}
                   
                </>
            )}
           
        </div>
    )
}

export default CreateNewSpotted