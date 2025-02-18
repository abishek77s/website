import { Contact } from "./components/Contact";
import Dock from "./components/Dock";
import EventDetails from "./components/EventDetails";
import Events from "./components/Events";

function App() {
  return (
    <div className="">
      <Dock />
      <Events />
      <EventDetails />
      <Contact />
    </div>
  );
}

export default App;
