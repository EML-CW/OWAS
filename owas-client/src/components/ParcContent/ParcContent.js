import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Icon, Menu, Segment } from 'semantic-ui-react';
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
    const [bikeList, setBikeList] = useState([]);
    const [segmentLoadingState, setSegmentLoadingState] = useState(true);
    useEffect(() => {
        let bikeArray = [];
        setSegmentLoadingState(true);
        console.log(`http://192.168.1.103:42069/bikes/fetchbikes?token=${props.usrInfo._arToken}`)
        axios.get(`http://192.168.1.103:42069/bikes/fetchbikes?token=${props.usrInfo._arToken}`)
        .then(res => {
            console.log(res.data)
            console.log(res.data.list.length)
            bikeArray = res.data.list.map((bike) => {
                return (<BikeCard key={bike._id} mileage={bike._mileage} displacement={bike._displacement} title={`${bike._bikeMake} ${bike._bikeModel}`}/>)
            })
            setBikeList(bikeArray);
            setSegmentLoadingState(false);
        })
        .catch((err) => {
            setSegmentLoadingState(false)
        })

    }, [setBikeList, props.usrInfo._arToken])
    return (
        <Segment basic loading={segmentLoadingState}>
            <ParcContentMenu activeItem={activeItem} setActiveItem={setActiveItem}/>
            <Button icon basic color="blue">
                Nouvelle moto<Icon name="plus" />
            </Button>
            {bikeList}
        </Segment>
    )
}

export default ParcContent