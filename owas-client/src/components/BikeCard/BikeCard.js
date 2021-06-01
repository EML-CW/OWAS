import { Button, Card } from 'semantic-ui-react'

const BikeCard = () => {
    return (
        <Card fluid color="blue">
        <Card.Content>
            <Card.Header>KTM 890 Duke</Card.Header>
            <Card.Meta>4201km</Card.Meta>
            <Card.Description>
                Cylindrée: 890km
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