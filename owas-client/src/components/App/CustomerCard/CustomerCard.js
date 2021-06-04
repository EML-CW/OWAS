import axios from "axios";
import { useState } from "react";
import { Card, Button, Form, Segment } from "semantic-ui-react";
import qs from "querystring"

const CustomerCard = (props) => {
    const [loadingState, setLoadingState] = useState(false);
    const [editState, setEditState] = useState(false)
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
        <Segment loading={loadingState}>
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
                                <input defaultValue={props.clientName} />
                            </Form.Field>
                            <Form.Field>
                                <input defaultValue={props.clientLastName} />
                            </Form.Field>
                            <Form.Field>
                                <input defaultValue={props.clientStreet} />
                            </Form.Field>
                            <Form.Field>
                                <input defaultValue={props.clientZIP} />
                            </Form.Field>
                            <Form.Field>
                                <input defaultValue={props.clientCity} />
                            </Form.Field>
                        </Form>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button basic color="green" onClick={() => setEditState(true)} >Editer</Button>
                    <Button basic color="red" onClick={() => setEditState(false)}>Annuler</Button>
                </Card.Content>
            </Card>
        </Segment>
    )
}

export default CustomerCard;