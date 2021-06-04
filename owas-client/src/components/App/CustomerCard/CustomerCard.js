import axios from "axios";
import { useState } from "react";
import { Card, Button, Form, Segment } from "semantic-ui-react";
import qs from "querystring"

const CustomerCard = (props) => {
    const [loadingState, setLoadingState] = useState(false);
    const [editState, setEditState] = useState(false)
    const [customerInfo, setCustomerInfo] = useState({
        clientId: props.id,
        clientName: props.clientName,
        clientLastName: props.clientLastName,
        clientStreet: props.clientStreet,
        clientCity: props.clientCity,
        clientZIP: props.clientZIP,
        clientPhone: props.clientPhone,
        token: props.token
    })
    const onclientNameChange = (e) => {
        setCustomerInfo({
            clientId: customerInfo.clientId,
            clientName: e.target.value,
            clientLastName: customerInfo.clientLastName,
            clientStreet: customerInfo.clientStreet,
            clientCity: customerInfo.clientCity,
            clientZIP: customerInfo.clientZIP,
            clientPhone : customerInfo.clientPhone,
            token: customerInfo.token,
        })
    }
    const onclientLastNameChange = (e) => {
        setCustomerInfo({
            clientId: customerInfo.clientId,
            clientName: customerInfo.clientName,
            clientLastName: e.target.value,
            clientStreet: customerInfo.clientStreet,
            clientCity: customerInfo.clientCity,
            clientZIP: customerInfo.clientZIP,
            clientPhone : customerInfo.clientPhone,
            token: customerInfo.token
        })
    }
    const onclientCityChange = (e) => {
        setCustomerInfo({
            clientId: customerInfo.clientId,
            clientName: customerInfo.clientName,
            clientLastName: customerInfo.clientLastName,
            clientStreet: customerInfo.clientStreet,
            clientCity: e.target.value,
            clientZIP: customerInfo.clientZIP,
            clientPhone : customerInfo.clientPhone,
            token: customerInfo.token
        })
    }
    const onclientZIPChange = (e) => {
        setCustomerInfo({
            clientId: customerInfo.clientId,
            clientName: customerInfo.clientName,
            clientLastName: customerInfo.clientLastName,
            clientStreet: customerInfo.clientStreet,
            clientCity: customerInfo.clientCity,
            clientZIP: e.target.value,
            clientPhone : customerInfo.clientPhone,
            token: customerInfo.token
        })
    }
    const onclientStreetChange = (e) => {
        setCustomerInfo({
            clientId: customerInfo.clientId,
            clientName: customerInfo.clientName,
            clientLastName: customerInfo.clientLastName,
            clientStreet: e.target.value,
            clientCity: customerInfo.clientCity,
            clientZIP: customerInfo.clientZIP,
            clientPhone : e.target.value,
            token: customerInfo.token
        })
    }
    const onclientPhoneChange = (e) => {
        setCustomerInfo({
            clientId: customerInfo.clientId,
            clientName: customerInfo.clientName,
            clientLastName: customerInfo.clientLastName,
            clientStreet: customerInfo.clientStreet,
            clientCity: customerInfo.clientCity,
            clientZIP: customerInfo.clientZIP,
            clientPhone : e.target.value,
            token: customerInfo.token
        })
    }
    const onClientDelete = () => {
        setLoadingState(true);
        const host = process.env.REACT_APP_HOST;
        axios.post(`http://${host}/clients/deleteclient`, qs.stringify({ clientId: props.id, token: props.token }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then((res) => {
                console.log("yay")
                setLoadingState(false);
                props.setLoadCustomers(true);
            })
            .catch((err) => {
                props.setLoadCustomers(true);
            })
    }

    const onClientEdit = () => {
        setLoadingState(true);
        const formData = qs.stringify(customerInfo);
        const host = process.env.REACT_APP_HOST;
        axios.post(`http://${host}/clients/editclient`, formData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(res => {
            setLoadingState(false);
            props.setLoadCustomers(true);
        })
        .catch((err) => {
            setLoadingState(false);
            props.setLoadCustomers(true);
        })
        setEditState(false);
    }

    if (!editState)
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        {`${props.clientName} ${props.clientLastName}`}
                    </Card.Header>
                    <Card.Meta>
                        {`${props.clientStreet}, ${props.clientZIP}, ${props.clientCity}`}
                    </Card.Meta>
                    <Card.Description>
                        Réservations: 0
                    </Card.Description>
                    <Card.Description>
                        <a href={`tel:${props.clientPhone}`}>{props.clientPhone}</a>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button basic color="blue" onClick={() => setEditState(true)}>Editer</Button>
                    <Button basic color="red" onClick={onClientDelete}>Supprimer</Button>
                </Card.Content>
            </Card>
        )
    return (
        <Segment basic fluid loading={loadingState}>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        Editer
                </Card.Header>
                    <Card.Meta>
                        Editez les champs ci dessous puis validez
                </Card.Meta>
                    <Card.Description>
                        <Form size="large">
                            <Form.Field>
                                <input onChange={onclientNameChange}defaultValue={props.clientName} />
                            </Form.Field>
                            <Form.Field>
                                <input onChange={onclientLastNameChange}defaultValue={props.clientLastName} />
                            </Form.Field>
                            <Form.Field>
                                <input onChange={onclientStreetChange}defaultValue={props.clientStreet} />
                            </Form.Field>
                            <Form.Field>
                                <input onChange={onclientZIPChange}defaultValue={props.clientZIP} />
                            </Form.Field>
                            <Form.Field>
                                <input onChange={onclientCityChange}defaultValue={props.clientCity} />
                            </Form.Field>
                            <Form.Field>
                                <input onChange={onclientPhoneChange}defaultValue={props.clientPhone} />
                            </Form.Field>
                        </Form>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button basic color="green" onClick={onClientEdit} >Editer</Button>
                    <Button basic color="red" onClick={() => setEditState(false)}>Annuler</Button>
                </Card.Content>
            </Card>
        </Segment>
    )
}

export default CustomerCard;