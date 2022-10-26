
import { Container } from "@mui/system";
import { useEffect } from "react";
import { getAppointments } from "../services/appointmentService";
import Appointment from "./Appointment";
import CustomTabs from "./common/CustomTabs";

const Home = () => {

    const tabs = [{label: 'Book appointment', component: Appointment}]

    return ( <Container>
        <CustomTabs tabs={tabs}/>
    </Container> );
}
 
export default Home;