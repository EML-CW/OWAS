import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Button } from 'semantic-ui-react';

const ReservationCard = (props) => {
    const [bikeNode, setBikeNode] = useState({})
    const [clientNode, setClientNode] = useState({})

    useEffect(() => {
        const host = process.env.REACT_APP_HOST;
        axios.get(`http://${host}/bikes/fetchbikes?token=${props.token}`)
        .then((res) => {
            const picked = res.data.list.find(object => object._id === props.bikeId)
            setBikeNode(picked);
        })
        axios.get(`http://${host}/clients/fetchclientlist?token=${props.token}`)
        .then((res) => {
            const picked = res.data.clientList.find(object => object._id === props.clientId)
            setClientNode(picked);
        })
    }, [setBikeNode, setClientNode, props.token, props.bikeId, props.clientId])
    return (
        <Card fluid color="blue">
            <Card.Content>
                <Card.Header>{`${bikeNode._bikeMake} ${bikeNode._bikeModel}`}</Card.Header>
                <Card.Meta>{`${clientNode._clientName} ${clientNode._clientLastName}`}</Card.Meta>
                <Card.Description>Départ: {props.from}</Card.Description>
                <Card.Description>Arrivée: {props.to}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button color="blue" basic>Editer</Button>
                <Button color="red" basic>Supprimer</Button>
            </Card.Content>
        </Card>
    )
}

export default ReservationCard;