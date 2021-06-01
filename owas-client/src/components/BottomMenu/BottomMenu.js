import { Menu, Icon } from "semantic-ui-react"

const BottomMenu = (props) => {
    return (
        <Menu color="blue" icon="labeled" size="large" fluid widths={3} className="ui bottom fixed menu">
            <Menu.Item
                name='Clients'
                active={props.activeItem === 'clients'}
                onClick={() => props.setActiveItem('clients')}
            >
                <Icon size="big" name='users' />
            Clients
            </Menu.Item>
            <Menu.Item
                name='Motos'
                active={props.activeItem === 'parc'}
                onClick={() => props.setActiveItem('parc')}

            >
                <Icon size="big" name='motorcycle' />
            Parc
            </Menu.Item>
            <Menu.Item
                name='Paramètres'
                active={props.activeItem === 'parametres'}
                onClick={() => props.setActiveItem('parametres')}

            >
                <Icon size="big" name='setting' />
            Paramètres
            </Menu.Item>
        </Menu>
    )
}

export default BottomMenu;