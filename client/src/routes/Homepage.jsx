import PopularSpotteds from '../components/PopularSpotteds'
import ShowSpots from '../components/ShowSpots'
import { Helmet } from 'react-helmet'

const Homepage = () => {
    const name = 'all'

    const type = 2

    return (
        <div class="container">
            <Helmet>
                <title>Spotter - spotnij do kogoś!</title>
            </Helmet>
            <PopularSpotteds/>
            <h2>Najnowsze spoty:</h2>
            <ShowSpots name={name} useLimit={5} type={type} />
        </div>
    )
}

export default Homepage