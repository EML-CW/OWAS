import { Segment, Container, Button, Icon } from "semantic-ui-react";

const SettingsView = (props) => {
    const logOut = () => {
        props.setUsrInfo({
            _username: "",
            _email: "",
            _arToken: ""
        })
        localStorage.clear();
    }
    const host = process.env.REACT_APP_HOST;
    return (
        <Container>
        <Segment textAlign="center" color="grey">
            OWAS v0.2<br/>
            This is alpha software. It is not ready for business use. Use at your own risk<br/>
            Copyright OWAS 2021
        </Segment>
        <Segment color="grey">
            Server host: { host }
        </Segment>
        <Button onClick={logOut} fluid color="red" basic icon>
            Se déconnecter
            <Icon name="sign-out"/>
        </Button>
        </Container>
    )
}

export default SettingsView;