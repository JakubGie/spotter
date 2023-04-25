import { Helmet } from 'react-helmet'

const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>Błąd 404 | Spotter</title>
            </Helmet>
            <h1>404</h1>
        </>
    )
}

export default NotFound