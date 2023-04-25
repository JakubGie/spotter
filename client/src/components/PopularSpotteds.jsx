import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const PopularSpotteds = () => {
    const [allSpotteds, setAllSpotteds] = useState()

    const fetchUrl = '/api/allSpotteds'

    useEffect(() => {
        fetch(fetchUrl).then((res) => {
           if(res.ok){
            return res = res.json()
           }
           console.log('błądek')
        }).then((data) => {
            setAllSpotteds(data)
            console.log(data)
        }).catch((err) => {
            console.log('błąd')
        })
    }, [])

    return (
        <div className='container'>
            <div className="Spotteds">
                <h2>Popularne spottedy</h2>
                {(typeof allSpotteds === 'undefined') ? (
                    <img className="loading" src={process.env.PUBLIC_URL + '/loading.svg'} /> 
                ) : (
                    allSpotteds.map((spotted) => (
                        <>
                            <Link to={'/spotted/' + spotted.username} className="spottedLink">Spotted {spotted.name}</Link>
                        </>                ))
                )}
            </div>
        </div>
    )
}

export default PopularSpotteds