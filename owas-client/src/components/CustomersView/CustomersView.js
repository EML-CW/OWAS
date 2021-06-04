import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import CustomerCard from "../App/CustomerCard/CustomerCard";

const CustomersView = (props) => {
    const [customerComponentArray, setCustomerComponentArray] = useState([]);
    const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {
        setLoadingState(true);
        let customerArray = [];
        const host = process.env.REACT_APP_HOST;
        axios.get(`http://${host}/clients/fetchclientlist?token=${props.token}`)
            .then((res) => {
                console.log(res.data);
                customerArray = res.data.clientList.map(data => {
                    return (
                        <CustomerCard clientName={data._clientName}
                            clientLastName={data._clientLastName}
                            clientStreet={data._clientStreet}
                            clientZIP={data._clientZIP}
                            clientCity={data._clientCity} />
                    )
                })
                setCustomerComponentArray(customerArray);
                setLoadingState(false);
            })
            .catch((err) => {
                setLoadingState(false);
            })
    }, [setCustomerComponentArray, props.token])
    return (
        <Segment basic loading={loadingState}>
            <Button basic color="blue" onClick={() => props.setActiveMenu("newcustomer")}>Nouveau client</Button>
            {customerComponentArray}
        </Segment>
    )
}

export default CustomersView;