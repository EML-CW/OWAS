import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import CustomerCard from "../App/CustomerCard/CustomerCard";

const CustomersView = (props) => {
    const [customerComponentArray, setCustomerComponentArray] = useState([]);
    const [loadingState, setLoadingState] = useState(false);
    const [loadCustomers, setLoadCustomers] = useState(true);

    useEffect(() => {
        console.log(loadCustomers);
        if (loadCustomers === false) {
            console.log("Not reloading")
            return;
        }
        setLoadingState(true);
        let customerArray = [];
        const host = process.env.REACT_APP_HOST;
        axios.get(`http://${host}/clients/fetchclientlist?token=${props.token}`)
            .then((res) => {
                console.log(res.data);
                customerArray = res.data.clientList.map(data => {
                    return (
                        <CustomerCard
                            setLoadCustomers={setLoadCustomers}
                            key={data._id}
                            id={data._id}
                            token={props.token}
                            clientName={data._clientName}
                            clientLastName={data._clientLastName}
                            clientStreet={data._clientStreet}
                            clientZIP={data._clientZIP}
                            clientCity={data._clientCity}
                            clientPhone={data._clientPhone} />
                    )
                })
                setCustomerComponentArray(customerArray);
                setLoadingState(false);
                setLoadCustomers(false);
            })
            .catch((err) => {
                setLoadCustomers(false);
                setLoadingState(false);
            })
    }, [setCustomerComponentArray, props.token, setLoadCustomers, loadCustomers])
    return (
        <Segment basic loading={loadingState}>
            <Button basic color="blue" onClick={() => props.setActiveMenu("newcustomer")}>Nouveau client</Button>
            {customerComponentArray}
        </Segment>
    )
}

export default CustomersView;