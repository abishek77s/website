const sections = [
  {
    icon: "\u2753",
    title: "Understand",
    text: "To create the best design, we first need to understand. Our straightforward process uncovers who you are, what your business is about, and what your goals are...",
  },
  {
    icon: "\u2728",
    title: "Design",
    text: "With insights from the brief, we’re equipped to move seamlessly into the design phase. Concepts are crafted to align with your audience...",
  },
  {
    icon: "\u1F4A1",
    title: "Refine",
    text: "Refinement happens through structured revision rounds. Our process empowers you to make informed decisions to meet your goals...",
  },
];

export default function DesignPage() {
  return (
    <div className="bg-black text-white min-h-screen p-10">
      <h1 className="text-5xl font-bold mb-4">Events</h1>
      <div className="flex gap-4 mb-8">
        <button className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black">
          see plans
        </button>
        <button className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black">
          latest work
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-lg border border-gray-500/50 relative"
          >
            <div className="absolute -top-4 right-4 bg-black px-2 text-lime-400 text-2xl">
              {section.icon}
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
