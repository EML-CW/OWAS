import { Button, Card, Form } from 'semantic-ui-react'
import axios from "axios";
import qs from "querystring";
import { useState } from 'react';

const BikeCard = (props) => {
    const [editState, setEditState] = useState(false);
    const onDelete = () => {
        props.setSegmentLoadingState(true);
        const host = process.env.REACT_APP_HOST;
        const formData = {
            id: props.id,
            token: props.usrInfo._arToken
        }
        axios.post(`http://${host}/bikes/deletebike`, qs.stringify(formData), {headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((res) => {
            console.log(res.data);
            props.setLoadBikes(true);
        })
        .catch(err => {
            props.setLoadBikes(true);
        })
    }
    if (editState === false)
        return (
            <Card fluid color="blue">
            <Card.Content>
                <Card.Header>{props.title}</Card.Header>
                <Card.Meta>{props.mileage}km</Card.Meta>
                <Card.Description>
                    Cylindrée: {props.displacement}cc
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button onClick={() => console.log(props.id)} size="tiny" basic color="green">Réserver</Button>
                <Button color="blue" size="tiny" onClick={() => setEditState(true)} basic>Editer</Button>
                <Button onClick={onDelete} size="tiny" basic color="red">Supprimer</Button>
            </Card.Content>
        </Card>
        )
    return (
        <Card fluid color="blue">
        <Card.Content>
            <Form>
                <Form.Field size="big">
                <input value={props.make}/>
                </Form.Field>
                <Form.Field size="big">
                <input value={props.model}/>
                </Form.Field>
                <Form.Field size="big">
                <input value={props.mileage}/>
                </Form.Field>
                <Form.Field size="big">
                <input value={props.displacement}/>
                </Form.Field>
            </Form>
        </Card.Content>
        <Card.Content extra>
            <Button onClick={() => console.log(props.id)} size="tiny" basic color="green">Valider</Button>
            <Button onClick={() => setEditState(false)} size="tiny" basic color="red">Annuler</Button>
        </Card.Content>
    </Card>
    )
}

export default BikeCard