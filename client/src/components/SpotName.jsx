import { useState } from "react"
import { Link } from "react-router-dom"

const SpotName = ({id}) => {

    const fetchUrl = '/api/getName/'+id

    const [name, setName] = useState()

    fetch(fetchUrl).then((res) => {
        return res = res.json()
    }).then((data) => {
        setName(data)
    })

    return(
        <div>
            {(typeof name === 'undefined' ? (
                <><img className="loading" src={process.env.PUBLIC_URL + '/loading.svg'} style={{
                    'width': '20px'
                }} /> </>
            ) : (
                <Link to={'/spotted/'+name.username}>Spotted {name.name}</Link>
            ))}
        </div>
        
    )
}

export default SpotName