import { Button, Icon, Form, Header, Segment } from "semantic-ui-react"
import axios from "axios";
import { useState } from "react";
import qs from "querystring";

const NewVehiculeDialog = (props) => {
    const [vehiculeSpecs, setVehiculeSpecs] = useState({
        make: '',
        model: '',
        year: '',
        displacement: '',
        mileage: '',
        token: props.token
    })
    const [loadingState, setLoadingState] = useState(false);
    const onMakeChange = (e) => {
        setVehiculeSpecs({
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
            make: vehiculeSpecs.make,
            model: vehiculeSpecs.model,
            year: vehiculeSpecs.year,
            displacement: e.target.value,
            mileage: vehiculeSpecs.mileage,
            token: vehiculeSpecs.token
        })
    }
    const onYearChange = (e) => {
        setVehiculeSpecs({
            make: vehiculeSpecs.make,
            model: vehiculeSpecs.model,
            year: e.target.value,
            displacement: vehiculeSpecs.displacement,
            mileage: vehiculeSpecs.mileage,
            token: vehiculeSpecs.token
        })
    }
    const onMileageChange = (e) => {
        setVehiculeSpecs({
            make: vehiculeSpecs.make,
            model: vehiculeSpecs.model,
            year: vehiculeSpecs.year,
            displacement: vehiculeSpecs.displacement,
            mileage: e.target.value,
            token: vehiculeSpecs.token
        })
    }

    const newVehicule = () => {
        setLoadingState(true);
        const host = process.env.REACT_APP_HOST;
        const formData = qs.stringify(vehiculeSpecs);
        axios.post(`http://${host}/bikes/newbike`, formData, {headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((res) => {
            console.log(res.data)
            setLoadingState(false);
            props.setActiveMenu("parc");

        })
        .catch(err => {});
    }
    return (
        <Segment loading={loadingState}>
            <Form size="big">
                <Header as='h3'>Nouvelle moto</Header>
                <Form.Field>
                <input required onChange={onMakeChange} placeholder='Marque' type="text"/>
                </Form.Field>
                <Form.Field>
                <input required onChange={onModelChange} placeholder='Modèle' type="text"/>
                </Form.Field>
                <Form.Field>
                <input required onChange={onDisplacementChange} placeholder='Cylindrée' type="number" />
                </Form.Field>
                <Form.Field>
                <input required onChange={onYearChange} placeholder='Année' type="number"/>
                </Form.Field>
                <Form.Field>
                <input required onChange={onMileageChange} placeholder='Kilométrage' type="text"/>
                </Form.Field>
                <Button basic color="red" onClick={() => props.setActiveMenu("parc")}>
                    Annuler
                </Button>
                <Button onClick={newVehicule}basic color="blue" icon labelPosition='right'>Ajouter
                <Icon name='right arrow'/>
                </Button>
            </Form>
        </Segment>
    )
}

export default NewVehiculeDialog;