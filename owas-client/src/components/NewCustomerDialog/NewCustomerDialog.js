import { Button, Icon, Form, Header, Segment } from "semantic-ui-react"
import axios from "axios";
import { useState } from "react";
import qs from "querystring";

const NewCustomerDialog = (props) => {
    const [clientInfo, setclientInfo] = useState({
        clientName: '',
        clientLastName: '',
        clientStreet: '',
        clientCity: '',
        clientZIP: '',
        clientPhone: '',
        token: props.token
    })
    const [loadingState, setLoadingState] = useState(false);
    const onClientNameChange = (e) => {
        setclientInfo({
            clientName: e.target.value,
            model: clientInfo.model,
            clientStreet: clientInfo.clientStreet,
            clientCity: clientInfo.clientCity,
            clientZIP: clientInfo.clientZIP,
            clientPhone: clientInfo.clientPhone,
            token: clientInfo.token
        })
    }
    const onclientLastNameChange = (e) => {
        setclientInfo({
            clientName: clientInfo.clientName,
            clientLastName: e.target.value,
            clientStreet: clientInfo.clientStreet,
            clientCity: clientInfo.clientCity,
            clientZIP: clientInfo.clientZIP,
            clientPhone: clientInfo.clientPhone,
            token: clientInfo.token
        })
    }
    const onclientCityChange = (e) => {
        setclientInfo({
            clientName: clientInfo.clientName,
            clientLastName: clientInfo.clientLastName,
            clientStreet: clientInfo.clientStreet,
            clientCity: e.target.value,
            clientZIP: clientInfo.clientZIP,
            clientPhone: clientInfo.clientPhone,
            token: clientInfo.token
        })
    }
    const onclientStreetChange = (e) => {
        setclientInfo({
            clientName: clientInfo.clientName,
            clientLastName: clientInfo.clientLastName,
            clientStreet: e.target.value,
            clientCity: clientInfo.clientCity,
            clientZIP: clientInfo.clientZIP,
            clientPhone: clientInfo.clientPhone,
            token: clientInfo.token
        })
    }
    const onclientZIPChange = (e) => {
        setclientInfo({
            clientName: clientInfo.clientName,
            clientLastName: clientInfo.clientLastName,
            clientStreet: clientInfo.clientStreet,
            clientCity: clientInfo.clientCity,
            clientZIP: e.target.value,
            clientPhone: clientInfo.clientPhone,
            token: clientInfo.token
        })
    }
    const onclientPhoneChange = (e) => {
        setclientInfo({
            clientName: clientInfo.clientName,
            clientLastName: clientInfo.clientLastName,
            clientStreet: clientInfo.clientStreet,
            clientCity: clientInfo.clientCity,
            clientZIP: clientInfo.clientZIP,
            clientPhone: e.target.value,
            token: clientInfo.token
        })
    }
    const newVehicule = () => {
        setLoadingState(true);
        const host = process.env.REACT_APP_HOST;
        const formData = qs.stringify(clientInfo);
        axios.post(`http://${host}/clients/newclient`, formData, {headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((res) => {
            console.log(res.data)
            setLoadingState(false);
            props.setActiveMenu("clients");

        })
        .catch(err => {});
    }
    return (
        <Segment loading={loadingState}>
            <Form size="big">
                <Header as='h3'>Nouveau client</Header>
                <Form.Field>
                <input required onChange={onClientNameChange} placeholder='Prénom' type="text"/>
                </Form.Field>
                <Form.Field>
                <input required onChange={onclientLastNameChange} placeholder='Nom' type="text"/>
                </Form.Field>
                <Form.Field>
                <input required onChange={onclientCityChange} placeholder='Ville' type="text" />
                </Form.Field>
                <Form.Field>
                <input required onChange={onclientStreetChange} placeholder='Rue' type="text"/>
                </Form.Field>
                <Form.Field>
                <input required onChange={onclientZIPChange} placeholder='Code Postal' type="text"/>
                </Form.Field>
                <Form.Field>
                <input required onChange={onclientPhoneChange} placeholder='Téléphone' type="text"/>
                </Form.Field>
                <Button basic color="red" onClick={() => props.setActiveMenu("clients")}>
                    Annuler
                </Button>
                <Button onClick={newVehicule}basic color="blue" icon labelPosition='right'>Ajouter
                <Icon name='right arrow'/>
                </Button>
            </Form>
        </Segment>
    )
}

export default NewCustomerDialog;