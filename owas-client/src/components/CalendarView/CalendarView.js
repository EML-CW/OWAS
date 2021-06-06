import { useEffect, useState } from 'react'
import { Header, Segment } from 'semantic-ui-react'
import ReservationCard from '../ReservationCard/ReservationCard'
import axios from "axios";


const CalendarView = (props) =>{
    const [reservations, setReservations] = useState([]);
    const [loadingState, setLoadingState] = useState(false);
    const [loadReservations, setloadReservations] = useState(true);
    useEffect(() => {
        const host = process.env.REACT_APP_HOST;
        setLoadingState(true);
        let reservationsArray = [];
        if (loadReservations === false)
            return;
            axios.get(`http://${host}/bikes/fetchbikes?token=${props.token}`)
            .then((resBikes) => {
                axios.get(`http://${host}/clients/fetchclientlist?token=${props.token}`)
                .then((resClients) => {
                    axios.get(`http://${host}/reservations/getreservations?token=${props.token}`)
                    .then((res) => {
                        reservationsArray = res.data.list.map((data) => {
                            return (<ReservationCard bikeId={data._bikeId}
                                token={props.token}
                                bikeList={resBikes.data.list}
                                clientList={resClients.data.clientList}
                                key={data._id}
                                reservationId={data._id}
                                clientId={data._clientId}
                                from={data._from}
                                to={data._to}
                                setloadReservations={setloadReservations} />)
                        })
                        setReservations(reservationsArray);
                        setLoadingState(false);
                        setloadReservations(false);
                    })
                    .then(err => {
                        setloadReservations(false);
                        setLoadingState(false);
                    })
                })
            })
    }, [setLoadingState, setReservations, setloadReservations, loadReservations, props.token])
    return (
        <Segment basic fluid="true" loading={loadingState}>
            <Header as="h1">Calendrier</Header>
            {reservations}
        </Segment>
    )
}

export default CalendarView;