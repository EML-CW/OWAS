import { Menu, Icon } from "semantic-ui-react"

const BottomMenu = (props) => {
    return (
        <Menu color="blue" icon="labeled" size="large" fluid widths={4} className="ui bottom fixed menu">
            <Menu.Item
                name='Clients'
                active={props.activeItem === 'clients'}
                onClick={() => props.setActiveItem('clients')}
            >
                <Icon size="small" name='users' />
            Clients
            </Menu.Item>
            <Menu.Item
                name='Motos'
                active={props.activeItem === 'parc'}
                onClick={() => props.setActiveItem('parc')}

            >
                <Icon size="small" name='motorcycle' />
            Parc
            </Menu.Item>
            <Menu.Item
                name="Calendrier"
                active={props.activeItem === 'calendrier'}
                onClick={() => props.setActiveItem("calendrier")}
            >
                <Icon size="small" name="calendar"/>
                Calendrier

            </Menu.Item>
            <Menu.Item
                name='Paramètres'
                active={props.activeItem === 'parametres'}
                onClick={() => props.setActiveItem('parametres')}

            >
                <Icon size="small" name='setting' />
            Paramètres
            </Menu.Item>
        </Menu>
    )
}

export default BottomMenu;