import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import withContext from "@/context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WalletConnnectHandler from "@/components/WalletConnnectHandler";
import Main from "@/pages/Main";
import Verify from "@/pages/Verify";
import Invite from "@/pages/Invite";
import KnowledgeTest from "@/pages/KnowledgeTest";
import DNA from "@/pages/DNA";
import HumanityIndex from "./pages/HumanityIndex";

const App = () => (
  <Router>
    <Navbar />
    <Box marginTop="94px">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/humanity-index" component={HumanityIndex} />
        <Route path="/proof-of-humanity" component={Verify} />
        <Route path="/community-contribution" component={Invite} />
        <Route path="/web3-knowledge-test" component={KnowledgeTest} />
        <Route path="/dna" component={DNA} />
      </Switch>
    </Box>
    <Footer />
    <WalletConnnectHandler />
  </Router>
);

export default withContext(App);
