import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import withContext from "@/context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WalletConnnectHandler from "@/components/WalletConnnectHandler";
import Main from "@/pages/Main";
import Verify from "@/pages/Verify";
import Invite from "@/pages/Invite";
import DID from "@/pages/DID";

const App = () => (
  <Router>
    <Navbar />
    <Box marginTop="94px">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/mission/1" component={Verify} />
        <Route path="/mission/2" component={Invite} />
        <Route path="/did" component={DID} />
      </Switch>
    </Box>
    <Footer />
    <WalletConnnectHandler />
  </Router>
);

export default withContext(App);
