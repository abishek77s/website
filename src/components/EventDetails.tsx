import React, { useState } from "react";
import TitledCard from "./TitledCard";

interface EventCategory {
  title: string;
  cardCount: number;
  events: string[];
}

interface EventCard {
  imageSrc: string;
  containerHeight: string;
  containerWidth: string;
  imageHeight: string;
  imageWidth: string;
  rotateAmplitude: number;
  scaleOnHover: number;
  showTooltip: boolean;
  displayOverlayContent: boolean;
  overlayContent: React.ReactNode;
}

const eventCategories: EventCategory[] = [
  {
    title: "Technical Events",
    cardCount: 4,
    events: ["Hackathon", "Code Quest", "Tech Talk", "Web Workshop"],
  },
  {
    title: "Non-Technical Events",
    cardCount: 4,
    events: [
      "Art Exhibition",
      "Music Night",
      "Quiz Competition",
      "Talent Show",
    ],
  },
  {
    title: "Online Events",
    cardCount: 1,
    events: ["Virtual Conference"],
  },
];

const createEventCard = (title: string): EventCard => ({
  imageSrc: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",
  containerHeight: "280px",
  containerWidth: "100%",
  imageHeight: "250px",
  imageWidth: "100%",
  rotateAmplitude: 12,
  scaleOnHover: 1.2,
  showTooltip: false,
  displayOverlayContent: true,
  overlayContent: (
    <div className="backdrop-blur-sm rounded-[15px] w-full h-full flex flex-col items-center justify-center p-4 text-white">
      <h3 className="text-xl font-bold mb-2 bg-black/50 px-4 py-2 rounded-lg">
        {title}
      </h3>
    </div>
  ),
});

const EventsDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const renderCards = (cardCount: number) => {
    return eventCategories[activeTab].events
      .slice(0, cardCount)
      .map((eventTitle, cardIndex) => (
        <div
          key={cardIndex}
          className={`${cardCount === 1 ? "w-80" : "w-full"}`}
        >
          <TitledCard {...createEventCard(eventTitle)}>Hello</TitledCard>
        </div>
      ));
  };

  return (
    <div className="container mx-auto mt-36 lg:px-16 sm:px-8 px-12">
      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4 mb-8 mt-12">
        {eventCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 
              ${
                activeTab === index
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-300">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4
          ${
            eventCategories[activeTab].cardCount === 1
              ? "lg:grid-cols-1 place-items-center"
              : ""
          }`}
        >
          {renderCards(eventCategories[activeTab].cardCount)}
        </div>
      </div>
    </div>
  );
};

export default EventsDetail;
