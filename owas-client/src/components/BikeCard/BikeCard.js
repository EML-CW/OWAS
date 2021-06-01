import { Button, Card } from 'semantic-ui-react'

const BikeCard = (props) => {
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
            <Button basic color="green">Réserver</Button>
            <Button basic color="red">Supprimer</Button>
        </Card.Content>
    </Card>
    )
}

export default BikeCard