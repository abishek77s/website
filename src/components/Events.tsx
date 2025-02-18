import RiveIcon from "./RiveIcon";

const sections = [
  {
    icon: "/Joystick.riv",
    title: "Understand",
    text: "To create the best design, we first need to understand. Our straightforward process uncovers who you are, what your business is about, and what your goals are...",
  },
  {
    icon: "/Joystick.riv",
    title: "Design",
    text: "With insights from the brief, we’re equipped to move seamlessly into the design phase. Concepts are crafted to align with your audience...",
  },
  {
    icon: "/Joystick.riv",
    title: "Refine",
    text: "Refinement happens through structured revision rounds. Our process empowers you to make informed decisions to meet your goals...",
  },
];

export default function DesignPage() {
  return (
    <div className="bg-black text-white min-h-screen p-10">
      <div className="grid md:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-lg border border-gray-500/50 relative"
          >
            <div className="absolute -top-4 right-4 bg-black px-2">
              <RiveIcon src={section.icon} />
            </div>
            <h2 className="text-2xl font-semibold mb-2 mt-8">
              {section.title}
            </h2>
            <p className="text-gray-300">{section.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
