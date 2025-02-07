import Aurora from "./components/Aurora";
import Dock from "./components/Dock";
import TextPressure from "./components/TextPressure";

// Note:
// Make sure the font you're using supports all the variable properties.
// React Bits does not take responsibility for the fonts used

function App() {
  return (
    <div className="font-geist min-h-screen relative">
      <div className="fixed inset-0">
        <Aurora colorStops={["#00E1FF", "#68FF5C", "#00E1FF"]} speed={0.5} />
      </div>

      <Dock collapsible={false} position="top" responsive="bottom" />
      <div
        className="py-40 px-32"
        style={{ position: "relative", height: "800px" }}
      >
        <TextPressure
          text="TECH FIRM"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#ffffff"
          strokeColor="#ff0000"
          minFontSize={36}
        />
      </div>
    </div>
  );
}

export default App;
