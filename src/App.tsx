import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import withContext from "@/context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WalletConnnectHandler from "@/components/WalletConnnectHandler";
import Main from "@/pages/Main";
import DNA from "@/pages/DNA";
import TaskIntroduction from "@/pages/TaskIntroduction";
import Tasks from "@/pages/Tasks";

const App = () => (
  <Router>
    <Navbar />
    <Box marginTop="94px">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/task-introduction/:id" component={TaskIntroduction} />
        <Route path="/tasks/:id" component={Tasks} />
        <Route path="/dna" component={DNA} />
      </Switch>
    </Box>
    <Footer />
    <WalletConnnectHandler />
  </Router>
);

export default withContext(App);
