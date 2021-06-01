import { useState } from 'react';
import { Container, Button, Icon, Menu, Segment } from 'semantic-ui-react';
import BikeCard from '../BikeCard';

const ParcContentMenu = (props) => {
    return (
        <Menu pointing secondary fluid
            widths={2}
            className="ui menu">
            <Menu.Item
                name='Garage'
                active={props.activeItem === 'garage'}
             onClick={() => props.setActiveItem('garage')}
            />
            <Menu.Item
                name='Dehors'
                active={props.activeItem === 'out'}
                onClick={() => props.setActiveItem('out')}
            />
        </Menu>
    )
}

const ParcContent = (props) => {
    const [activeItem, setActiveItem] = useState("garage");
    return (
        <Segment basic >
            <ParcContentMenu activeItem={activeItem} setActiveItem={setActiveItem}/>
            <Button icon basic color="blue">
                Nouvelle moto<Icon name="plus" />
            </Button>
            <BikeCard />
            <BikeCard/>
            <BikeCard/>
        </Segment>
    )
}

export default ParcContent