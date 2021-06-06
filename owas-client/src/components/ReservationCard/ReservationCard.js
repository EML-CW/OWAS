import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Button, Select, Input, Label, Form } from 'semantic-ui-react';
import qs from 'querystring';

const ReservationCard = (props) => {
    const [bikeNode, setBikeNode] = useState({})
    const [clientNode, setClientNode] = useState({})
    const [editState, setEditState] = useState(false);
    const [dropDownBikes, setDropDownBikes] = useState([]);
    const [dropDownClients, setDropDownClients] = useState([]);
    const [formattedDates] = useState({
        from: new Date(props.from),
        to: new Date(props.to),
    })

    useEffect(() => {
        let picked = props.bikeList.find(object => object._id === props.bikeId)
        setBikeNode(picked);
        picked = props.clientList.find(object => object._id === props.clientId)
        setClientNode(picked);
        setDropDownClients(props.clientList.map(client => {
            return ({ key: client._id, value: client._id, text: `${client._clientName} ${client._clientLastName}` })
        }))
        setDropDownBikes(props.bikeList.map(bike => {
            return ({ key: bike._id, value: bike._id, text: `${bike._bikeMake} ${bike._bikeModel}` });
        }))

    }, [setBikeNode, setClientNode, props.bikeList, props.clientList, props.token, props.bikeId, props.clientId])

    const [editValues, setEditValues] = useState({
        reservationId: props.reservationId,
        clientId: clientNode._id,
        bikeId: bikeNode._id,
        from: `${formattedDates.from.getFullYear()}-${formattedDates.from.getMonth()}-${formattedDates.from.getDay()}`,
        to: `${formattedDates.to.getFullYear()}-${formattedDates.to.getMonth()}-${formattedDates.to.getDay()}`,
        token: props.token
    })

    const onClientChange = (e, data) => {
        console.log(data.value);
        setEditValues({
            reservationId: editValues.reservationId,
            clientId: data.value,
            bikeId: editValues.bikeId,
            from: editValues.from,
            to: editValues.to,
            token: editValues.token
        })
    }
    const onBikeChange = (e, data) => {
        setEditValues({
            reservationId: editValues.reservationId,
            clientId: editValues.clientId,
            bikeId: data.value,
            from: editValues.from,
            to: editValues.to,
            token: editValues.token
        })
    }
    const onFromChange = (e) => {
        setEditValues({
            reservationId: editValues.reservationId,
            clientId: editValues.clientId,
            bikeId: editValues.bikeId,
            from: e.target.value,
            to: editValues.to,
            token: editValues.token
        })
    }
    const onToChange = (e) => {
        setEditValues({
            reservationId: editValues.reservationId,
            clientId: editValues.clientId,
            bikeId: editValues.bikeId,
            from: editValues.from,
            to: e.target.value,
            token: editValues.token
        })
    }

    const onEditSubmit = () => {
        const host = process.env.REACT_APP_HOST
        const formData = qs.stringify(editValues);
        axios.post(`http://${host}/reservations/updatereservation`, formData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then((res) => {
                props.setloadReservations(true);
                setEditState(false);
            })
    }
    const onDelete = () => {
        const host = process.env.REACT_APP_HOST;
        const formData = {
            reservationId: props.reservationId,
            token: props.token
        }
        axios.post(`http://${host}/reservations/deletereservation`, qs.stringify(formData), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then((res) => {
            console.log(res);
            setEditState(false);
            props.setloadReservations(true);
        })
        .catch(err => {
            throw err;
        })
    }
    // Rendering card
    if (editState === false)
        return (
            <Card fluid color="blue">
                <Card.Content>
                    <Card.Header>{`${bikeNode._bikeMake} ${bikeNode._bikeModel}`}</Card.Header>
                    <Card.Meta>{`${clientNode._clientName} ${clientNode._clientLastName}`}</Card.Meta>
                    <Card.Description>Départ: {`${formattedDates.from.getDate()}/${formattedDates.from.getUTCMonth()}/${formattedDates.from.getFullYear()}`}</Card.Description>
                    <Card.Description>Arrivée: {`${formattedDates.to.getDate()}/${formattedDates.to.getUTCMonth()}/${formattedDates.to.getFullYear()}`}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button color="blue" onClick={() => setEditState(true)} basic>Editer</Button>
                    <Button color="red" onClick={onDelete} basic>Supprimer</Button>
                </Card.Content>
            </Card>
        )
    else {
        return (
            <Card fluid color="blue">
                <Card.Content>
                    <Card.Header>Editer</Card.Header>
                    <Card.Meta>Remplissez les champs ci-dessous et validez</Card.Meta>
                    <Form>
                        <Form.Field>
                            <Select onChange={onBikeChange} fluid defaultValue={bikeNode._id} placeholder="Moto" options={dropDownBikes} />
                        </Form.Field>
                        <Form.Field>
                            <Select onChange={onClientChange} fluid defaultValue={clientNode._id} placeholder="Client" options={dropDownClients} />
                        </Form.Field>
                        <Form.Field>
                            <Label pointing="below">Départ:</Label><Input onChange={onFromChange} fluid type="date" />
                        </Form.Field>
                        <Form.Field>
                            <Label pointing="below">Arrivée:</Label><Input onChange={onToChange} defaultValue={formattedDates.to} fluid type="date" />
                        </Form.Field>
                    </Form>
                </Card.Content>
                <Card.Content extra>
                    <Button color="green" onClick={onEditSubmit} basic>Valider</Button>
                    <Button color="red" onClick={() => setEditState(false)} basic>Annuler</Button>
                </Card.Content>
            </Card>
        )
    }
}

export default ReservationCard;