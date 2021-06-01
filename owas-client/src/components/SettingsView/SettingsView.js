import { Segment, Container, Button, Icon } from "semantic-ui-react";

const SettingsView = (props) => {
    return (
        <Container>
        <Segment textAlign="center">
            OWAS v0.1<br/>
            This is alpha software. It is not ready for business use. Use at your own risk<br/>
            Copyright OWAS 2021
        </Segment>
        <Button fluid color="red" basic icon>
            Log out
            <Icon name="sign-out"/>
        </Button>
        </Container>
    )
}

export default SettingsView;