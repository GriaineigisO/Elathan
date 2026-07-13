import { useRef } from "react";
import meaningKeys from "../assets/meaningKeys";
import { useTranslate } from "../Functions/TranslateUI";


const ScrollTabs = ({viewPartOfSpeech}) => {
  const scrollRef = useRef(null);
    const { translate } = useTranslate();
  

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const amount = 150;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="scrollWrapper">
      <div
        className="scrollArrow left"
        onClick={() => scroll("left")}
      >
        ‹
      </div>

      <div className="scrollContainer" ref={scrollRef}>
        {meaningKeys.map((key) => (
          <span
            key={key.type}
            onClick={() => viewPartOfSpeech(key.type)}
            className="partOfSpeechTab"
          >
            {translate(key.type)}
          </span>
        ))}
      </div>

      <div
        className="scrollArrow right"
        onClick={() => scroll("right")}
      >
        ›
      </div>
    </div>
  );
};

export default ScrollTabs;