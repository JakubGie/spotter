import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Time from '../components/Time'
import SpotName from './SpotName'
import { Link } from 'react-router-dom'

const ShowSpot = ({createdAt, content, type, spotted, likes}) => {

    var nameValue = undefined

    if(type!=2)
    {
        nameValue = 'empty'
    }

    

    const [name, setName] = useState(nameValue)
    
    

    if(type==2) {
        const fetchUrl = '/api/getName/'+spotted

        

        fetch(fetchUrl).then((res) => {
            return res = res.json()
        }).then((data) => {
            setName(data)
        })
    } 

    
   
    /*
<div class="reactions">
                        <FontAwesomeIcon icon="fa-regular fa-heart" className="reactIcon" /> {likes}
                    </div>
    */

    return (
        <>
            {(typeof name === 'undefined' ? (
                <><div className="spot">
                <p><img className="loading" src={process.env.PUBLIC_URL + '/loading.svg'} style={{
                    'height' : '66px'
                }} /> </p>
            </div></>
            ) : (
                <div className="spot">
                    <p>{content}</p>
                    
                    <div className="smallSpottedInfo">
                    { type === 2 && ( <Link className="spottedSign" to={'/spotted/'+name.username}>Spotted {name.name}</Link> )} <div className="date"><Time time={createdAt}/></div>   
                    </div>
                </div>
            ))}
        </>
        
    )
}

const ShowSpots = ({name, useLimit, type}) => {

    const [limit, setLimit] = useState(useLimit)

    const [loadMoreText] = useState('Załaduj więcej')

    const updateLimit = () => {
        setLimit(limit+5)
    }
    

    const fetchUrl = '/api/getSpots/'+name+'/'+limit

    const [spots, setSpots] = useState()

    useEffect(() => {
        setSpots(undefined)
    }, [name])

    useEffect(() => {
        fetch(fetchUrl).then((res) => {
            if(res.ok) {
                return res = res.json()
            }
            console.log('błądek2')
        }).then((data) => {
            if(data.length==0) {
                setSpotsExists(false)
            } else {
                setSpots(data)
                setLoading(undefined)
                setSpotsExists(true)
                setSpotsRendered(data.length)

            }
        }).catch((error) => {
            console.log('błąd2')
        })
    }, [name, limit])

    const [ spotsRendered, setSpotsRendered ] = useState()


    const [loading, setLoading] = useState()

    useEffect(() => {
        setLoading('true')
    }, [limit])

    const [spotsExists, setSpotsExists] = useState()

    useEffect(() =>{
        setSpotsExists(undefined)
        setSpotsRendered(0)
        setLimit(5)
    }, [name])



    
    const fetchUrl2 = '/api/howManySpots/'+name

    const [allSpots, setAllSpots] = useState()

    useEffect(() => {
        fetch(fetchUrl2).then((res) => {
            if(res.ok) {
                return res = res.json()
            }
            console.log('błądek3')
        }).then((data) => {
            setAllSpots(data)
        })
    }, [name])
    

    

    return (
        <div className="newestSpots">
            <div className="spots">
                
            
                {(typeof spotsExists === 'undefined' ? (
                    <img className="loading" src={process.env.PUBLIC_URL + '/loading.svg'} /> 
                    
                ) : (
                    <> 
                       {spotsExists === true ? (
                       <>
                            {(typeof spots === 'undefined' ? (
                                <></>
                            ) : (
                                spots.map((spot) => (
                                    <ShowSpot  createdAt={spot.createdAt} content={spot.content} type={type} spotted={spot.spotted} likes={spot.likes} />
                                ))
                            ))}  

                            {(typeof loading === 'undefined' ? (
                                <></>
                            ) : (
                                <img className="loading" src={process.env.PUBLIC_URL + '/loading.svg'} /> 
                            ))}  
                        </>
                       ) : (
                       <>Brak spotów ;(</>
                       )}
                       {spotsRendered !== allSpots && <button onClick={updateLimit} className="loadMore">{loadMoreText}</button>  }
                     
                       
                    </>
                ))} 
                
                
                
                 
            </div>
        </div>
    )

   
}

export default ShowSpots