import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Button, Select, Input, Label, Form } from 'semantic-ui-react';

const ReservationCard = (props) => {
    const [bikeNode, setBikeNode] = useState({})
    const [clientNode, setClientNode] = useState({})
    const [editState, setEditState] = useState(false);
    const [dropDownBikes, setDropDownBikes] = useState([]);
    const [dropDownClients, setDropDownClients] = useState([]);
    const [formattedDates, setFormattedDates] = useState({
        from: new Date(props.from),
        to: new Date(props.to),
    })
    console.log(formattedDates);
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
                    <Button color="red" basic>Supprimer</Button>
                </Card.Content>
            </Card>
        )
    else{
        return (
            <Card fluid color="blue">
                <Card.Content>
                    <Card.Header>Editer</Card.Header>
                    <Card.Meta>Remplissez les champs ci-dessous et validez</Card.Meta>
                    <Form>
                            <Form.Field>
                                <Select fluid defaultValue={bikeNode._id} placeholder="Moto" options={dropDownBikes} />
                            </Form.Field>
                            <Form.Field>
                                <Select fluid defaultValue={clientNode._id} placeholder="Client" options={dropDownClients} />
                            </Form.Field>
                            <Form.Field>
                                <Label pointing="below">Départ:</Label><Input fluid type="date" />
                            </Form.Field>
                            <Form.Field>
                                <Label pointing="below">Arrivée:</Label><Input defaultValue={formattedDates.to}fluid type="date" />
                            </Form.Field>
                        </Form>
                    </Card.Content>
                    <Card.Content extra>
                        <Button color="green" onClick={() => setEditState(false)} basic>Valider</Button>
                        <Button color="red" onClick={() => setEditState(false)} basic>Annuler</Button>
                    </Card.Content>
            </Card>
        )}
}

export default ReservationCard;