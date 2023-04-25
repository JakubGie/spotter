import { useParams, redirect, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PopularSpotteds from '../components/PopularSpotteds'
import ShowSpots from '../components/ShowSpots'
import SpotInfo from '../components/SpotInfo'
import { Helmet } from 'react-helmet'






const Spot = () => {
    const { name } = useParams()

    const type = 1

  

    const [spotBody, setSpotBody] = useState('')


    const [spotSpotted, setSpotSpotted] = useState(name)
    const [isPending, setIsPending] = useState(false)
    
    const handleSubmit = (e) => {
        e.preventDefault()

        setIsPending(true)

        const spot = { spotBody, spotSpotted }

        console.log(spot)

        const fetchUrl = '/api/add-spot/'+name
        fetch(fetchUrl, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(spot)
        }).then((res) => {
            return res = res.json()
        }).then((data) => {
            console.log(data)
            setIsPending(false)
            setSpotBody('') 
            setAddedSpots(data)
            document.getElementById('textareaAdd').value = '';
          
            
        })

    }

    const [addedSpots, setAddedSpots] = useState([])


    var today = new Date()

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd ;

    useEffect(() => {
        setSpotBody('')
        document.getElementById('textareaAdd').value = '';
    }, [name])

  
    
   

    return (
        <main>
            <div class="container">
                <div className="spotted">
                    <div className="loadingComponent" style={{
                        height: "132px"
                    }}>
                        <SpotInfo name={name} />
                    </div>
                    
                    <div className="addSpot">
                        <h2>Dodaj anonimowego spota:</h2>
                        <form onSubmit={handleSubmit}>
                            <textarea 
                            id="textareaAdd" 
                            required 
                            placeholder="napisz tu coś :)"
                            onChange={(e) => setSpotBody(e.target.value)}>{spotBody}
                            </textarea>
                            { !isPending && <button>Dodaj spota</button> }
                            { isPending && <button disabled className="addingButton">Dodawanie...</button> }
                            
                        </form>
                    </div>
                    <h2 class="nSpots">Najnowsze spoty:</h2>
                    {spotBody === '' ? (
                        <></>
                    ) : (   

                        <>
                            {!isPending && (
                                    <div className="spot specialSpot">
                                        <p>{spotBody}</p>
                                            
                                            <div className="smallSpottedInfo">
                                            <div className="date">{today}</div>   
                                        </div>
                                    </div>
                            ) }
                            {isPending && (
                                
                <><div className="spot specialLoadingSpot">
                <img className="loading" src={process.env.PUBLIC_URL + '/loading.svg'} style={{
                    'height' : '60px'
                }} /> 
            </div></>
                            )}
                           
                        </>
                  
                    )}


                    {addedSpots.length === 0 ? (
                        <></>
                    ) : (
                            <div className="spot specialSpot2">
                                <p>{addedSpots.content}</p>
                                    
                                    <div className="smallSpottedInfo">
                                    <div className="date">{today}</div>   
                                </div>
                            </div>
                    )}
                   
                    <div className="loadingComponent">
                        <ShowSpots name={name} useLimit={5} type={type}  />
                    </div>
                    
                </div>
            </div>
            <PopularSpotteds/>
        </main>
        
    )
}

export default Spot