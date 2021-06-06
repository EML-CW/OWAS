import { Button, Card, Form, Segment } from 'semantic-ui-react'
import axios from "axios";
import qs from "querystring";
import { useState } from 'react';

const BikeCard = (props) => {
    const [vehiculeSpecs, setVehiculeSpecs] = useState({
        id: props.id,
        make: props.make,
        model: props.model,
        year: props.year,
        displacement: props.displacement,
        mileage: props.mileage,
        token: props.usrInfo._arToken
    })
    const [loadingState, setLoadingState] = useState(false);
    const [editState, setEditState] = useState(false);
    const onMakeChange = (e) => {
        setVehiculeSpecs({
            id: vehiculeSpecs.id,
            make: e.target.value,
            model: vehiculeSpecs.model,
            year: vehiculeSpecs.year,
            displacement: vehiculeSpecs.displacement,
            mileage: vehiculeSpecs.mileage,
            token: vehiculeSpecs.token
        })
    }
    const onModelChange = (e) => {
        setVehiculeSpecs({
            id: vehiculeSpecs.id,
            make: vehiculeSpecs.make,
            model: e.target.value,
            year: vehiculeSpecs.year,
            displacement: vehiculeSpecs.displacement,
            mileage: vehiculeSpecs.mileage,
            token: vehiculeSpecs.token
        })
    }
    const onDisplacementChange = (e) => {
        setVehiculeSpecs({
            id: vehiculeSpecs.id,
            make: vehiculeSpecs.make,
            model: vehiculeSpecs.model,
            year: vehiculeSpecs.year,
            displacement: e.target.value,
            mileage: vehiculeSpecs.mileage,
            token: vehiculeSpecs.token
        })
    }
    const onMileageChange = (e) => {
        setVehiculeSpecs({
            id: vehiculeSpecs.id,
            make: vehiculeSpecs.make,
            model: vehiculeSpecs.model,
            year: vehiculeSpecs.year,
            displacement: vehiculeSpecs.displacement,
            mileage: e.target.value,
            token: vehiculeSpecs.token
        })
    }
    const onEdit = () => {
        setLoadingState(true);
        const host = process.env.REACT_APP_HOST;
        const formData = qs.stringify(vehiculeSpecs);
        console.log(formData);
        axios.post(`http://${host}/bikes/editbike`, formData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then((res) => {
                console.log(res);
                if (res.data.status === 200) {
                    setLoadingState(false);
                    props.setLoadBikes(true);
                    setEditState(false);
                }
            })
            .catch((err) => {
                setLoadingState(false);
                props.setLoadBikes(true);
                setEditState(false);
            })
    }
    const onDelete = () => {
        props.setSegmentLoadingState(true);
        const host = process.env.REACT_APP_HOST;
        const formData = {
            id: props.id,
            token: props.usrInfo._arToken
        }
        axios.post(`http://${host}/bikes/deletebike`, qs.stringify(formData), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
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
                    <Button color="blue" size="tiny" onClick={() => setEditState(true)} basic>Editer</Button>
                    <Button onClick={onDelete} size="tiny" basic color="red">Supprimer</Button>
                </Card.Content>
            </Card>
        )
    return (
        <Segment basic loading={loadingState}>
            <Card fluid color="blue">
                <Card.Content>
                    <Card.Header>Editer</Card.Header>
                    <Card.Meta>Editez les champs ci-dessous puis validez</Card.Meta>
                    <Form size="large">
                        <Form.Field>
                            <input onChange={onMakeChange} defaultValue={props.make} />
                        </Form.Field>
                        <Form.Field>
                            <input onChange={onModelChange} defaultValue={props.model} />
                        </Form.Field>
                        <Form.Field>
                            <input onChange={onMileageChange} defaultValue={props.mileage} />
                        </Form.Field>
                        <Form.Field>
                            <input onChange={onDisplacementChange} defaultValue={props.displacement} />
                        </Form.Field>
                    </Form>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={onEdit} size="tiny" basic color="green">Valider</Button>
                    <Button onClick={() => setEditState(false)} size="tiny" basic color="red">Annuler</Button>
                </Card.Content>
            </Card>
        </Segment>
    )
}

export default BikeCard