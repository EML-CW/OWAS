import { Button, Container, Segment,Icon, Header, Form } from 'semantic-ui-react'
import styles from './authcontainer.module.css'
const AuthContainer = () => {
    return (
        <Container className={styles.AuthContainer} >
        <Segment textAlign="center" color="blue">
            <Form size="big">
                <Header as='h3'>Veuillez vous connecter</Header>
                <Form.Field>
                <input placeholder='Email' type="email"/>
                </Form.Field>
                <Form.Field>
                <input placeholder='Mot de passe' type="password" />
                </Form.Field>
                <Button basic color="blue" icon labelPosition='right'>Se connecter
                <Icon name='right arrow'/>
                </Button>
            </Form>
        </Segment>
        </Container>
    )
}

export default AuthContainer;