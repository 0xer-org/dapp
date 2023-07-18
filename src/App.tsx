import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import withContext from "@/context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Main from "@/pages/Main";
import Mission from "@/pages/Mission";
import DID from "@/pages/DID";
import Explore from "@/pages/Explore";

const App = () => (
  <Router>
    <Navbar />
    <Box marginTop="94px">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/explore" component={Explore} />
        <Route path="/mission" component={Mission} />
        <Route path="/did" component={DID} />
      </Switch>
    </Box>
    <Footer />
  </Router>
);

export default withContext(App);
