import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const SpotInfo = ({name}) => {
    const fetchUrl = '/api/getSpottedInfo/'+name

   

    const [spotInfo, setSpotInfo] = useState()

    const [spotExistsUni, setSpotExistsUni] = useState()

    useEffect(() => {
        setSpotInfo(undefined)
        fetch(fetchUrl).then((res) => {
            if(res.ok) {
                
                return res = res.json()
            }
            console.log('błądek')
        }).then((data) => {
            if(data.length==0) {
                setSpotExistsUni(false)
                
            } else {
                setSpotExistsUni(true)
                setSpotInfo(data)
            }
            
            
        }).catch((error) => {
            console.log('Błąd')
        })
    }, [name])

   

    
    return (
        <>
        {spotExistsUni === true ? (
            
            <></>
           
        ) : (
            	
            <></>
        )}
    
        {(typeof spotInfo === 'undefined') ? (
            <img className="loading" src={process.env.PUBLIC_URL + '/loading.svg'} /> 
        ) : (
            spotInfo.map((element) => (
                <div className="spottedInfo">
                    <h1 className="spottedHeader">
                        <div className="label"><small className="spanLabel">Spotted</small></div> {element.name}
                    </h1>
                    <span className="userName">
                        @{element.username}
                    </span>
                    <p className='spottedDesc'>
                        {element.desc}
                    </p>
                    
                    
                </div>
            ))
            
        )}
        </>
    )
}

export default SpotInfo