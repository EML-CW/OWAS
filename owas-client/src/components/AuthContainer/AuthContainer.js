import { useState } from 'react'
import { Button, Container, Segment,Icon, Header, Form } from 'semantic-ui-react'
import styles from './authcontainer.module.css'
const AuthContainer = (props) => {
    const [usrInfo, setUsrInfo] = useState({
        _email: '',
        _password: '',
    })
    const onEmailChange = (e) => {
        setUsrInfo({
        _email: e.target.value,
        _password: usrInfo._password
        })
    }
    const onPasswordChange = (e) => {
        setUsrInfo({
            _email: usrInfo._email,
            _password: e.target.value
        })
    }

    return (
        <Container className={styles.AuthContainer} >
        <Segment textAlign="center" color="blue">
            <Form size="big">
                <Header as='h3'>Veuillez vous connecter</Header>
                <Form.Field>
                <input required onChange={onEmailChange} placeholder='Email' type="email"/>
                </Form.Field>
                <Form.Field>
                <input required onChange={onPasswordChange} placeholder='Mot de passe' type="password" />
                </Form.Field>
                <Button onClick={() => props.authenticateFunction(usrInfo)}basic color="blue" icon labelPosition='right'>Se connecter
                <Icon name='right arrow'/>
                </Button>
            </Form>
        </Segment>
        </Container>
    )
}

export default AuthContainer;