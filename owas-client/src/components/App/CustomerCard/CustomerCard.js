import { useState } from "react";
import { Card, Button, Form } from "semantic-ui-react";

const CustomerCard = (props) => {
    const [editState, setEditState] = useState(false)
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
                        +33 7 00 00 00 00
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button basic color="blue" onClick={() => setEditState(true)}>Editer</Button>
                    <Button basic color="red">Supprimer</Button>
                </Card.Content>
            </Card>
        )
    return (
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
                            <input defaultValue={props.clientName}/>
                        </Form.Field>
                        <Form.Field>
                            <input defaultValue={props.clientLastName}/>
                        </Form.Field>
                        <Form.Field>
                            <input defaultValue={props.clientStreet}/>
                        </Form.Field>
                        <Form.Field>
                            <input defaultValue={props.clientZIP}/>
                        </Form.Field>
                        <Form.Field>
                            <input defaultValue={props.clientCity}/>
                        </Form.Field>
                    </Form>
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button basic color="green" onClick={() => setEditState(true)} >Editer</Button>
                <Button basic color="red" onClick={() => setEditState(false)}>Annuler</Button>
            </Card.Content>
        </Card>
    )
}

export default CustomerCard;