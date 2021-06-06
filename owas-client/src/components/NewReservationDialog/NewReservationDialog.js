import { useState, useEffect } from "react";
import { Segment, Form, Select, Label, Input, Button } from "semantic-ui-react";
import axios from "axios";
import qs from "querystring";

const NewReservationDialog = (props) => {
    const [loadingState, setLoadingState] = useState(false);
    const [dropDownBikes, setDropDownBikes] = useState([]);
    const [dropDownClients, setDropDownClients] = useState([]);
    const [contentLists, setContentLists] = useState({})
    const [loadList, setLoadList] = useState(true);
    const [formattedDates] = useState({
        from: new Date(),
        to: new Date(),
    })
    useEffect(() => {
        if (loadList === false) {
            return;
        }
        const host = process.env.REACT_APP_HOST;
        setLoadingState(true);
        axios.get(`http://${host}/bikes/fetchbikes?token=${props.token}`)
            .then((resBikes) => {
                axios.get(`http://${host}/clients/fetchclientlist?token=${props.token}`)
                    .then((res) => {
                        setContentLists({
                            bikeList: resBikes.data.list,
                            clientList: res.data.clientList
                        })
                        setLoadList(false);
                        setDropDownClients(contentLists.clientList.map(client => {
                            return ({ key: client._id, value: client._id, text: `${client._clientName} ${client._clientLastName}` })
                        }))
                        setDropDownBikes(contentLists.bikeList.map(bike => {
                            return ({ key: bike._id, value: bike._id, text: `${bike._bikeMake} ${bike._bikeModel}` });
                        }))
                        setLoadingState(false);
                    })
                    .catch(err => {
                        setLoadingState(false);
                    })

            })
    }, [setLoadingState, contentLists, setContentLists, props.token])
    const [editValues, setEditValues] = useState({
        reservationId: props.reservationId,
        clientId: '',
        bikeId: '',
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

    const onSubmit = (e) => {
        const host = process.env.REACT_APP_HOST;
        e.preventDefault();
        const formData = qs.stringify(editValues);
        axios.post(`http://${host}/reservations/newreservation`, formData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(res => {
            props.setActiveMenu("calendrier");
        })
        .catch(err => {
            props.setActiveMenu("calendrier")
        })

    }
    return (
        <Segment loading={loadingState} fluid>
            <Form size="big">
                <Form.Field>
                    <Select fluid placeholder="Moto" onChange={onBikeChange} options={dropDownBikes} />
                </Form.Field>
                <Form.Field>
                    <Select fluid placeholder="Client" onChange={onClientChange}  options={dropDownClients} />
                </Form.Field>
                <Form.Field>
                    <Label pointing="below">Départ:</Label><Input onChange={onFromChange} fluid type="date" />
                </Form.Field>
                <Form.Field>
                    <Label pointing="below">Arrivée:</Label><Input onChange={onToChange} fluid type="date" />
                </Form.Field>
                <Form.Field>
                    <Button type="submit" color="green" onClick={onSubmit} basic>Réserver</Button>
                    <Button color="red" basic onClick={() => props.setActiveMenu("calendrier")}>Annuler</Button>
                </Form.Field>
            </Form>
        </Segment>
    )
}

export default NewReservationDialog;