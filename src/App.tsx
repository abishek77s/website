// Note:
// Make sure the font you're using supports all the variable properties.
// React Bits does not take responsibility for the fonts used

import Dock from "./components/Dock";
import bg from "./assets/bg3.webp";

function App() {
  return (
    <div
      className="bg-black font-geist min-h-screen relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Dock />
    </div>
  );
}

export default App;
