import React, { useMemo, useCallback } from "react";
import ScrollTabs from "./scrollTabs";
import meaningKeys from "../assets/meaningKeys";

const WordRow = React.memo(function WordRow({
  index,
  pos,
  meaningKey,
  value,
  themes,
  progress,
  activeRowRef,
  selectWordFromViewer,
  saveProgress,
}) {
  const isActive = index === progress.index && progress.partOfSpeech === pos;

  const handleClick = useCallback(() => {
    selectWordFromViewer(value, meaningKey, index);
  }, [selectWordFromViewer, value, meaningKey, index]);

  const handleDoubleClick = useCallback(() => {
    saveProgress(pos, index);
  }, [saveProgress, pos, index]);

  return (
    <div
      ref={isActive ? activeRowRef : null}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`word-viewer-row ${isActive ? "active" : ""}`}
    >
      <span className="word-text">{value}</span>
      {themes.length > 0 && <i className="word-themes">{themes.join(", ")}</i>}
    </div>
  );
});

const WordViewer = ({
  viewPartOfSpeech,
  viewedList,
  progress,
  saveProgress,
  activeRowRef,
  selectWordFromViewer,
  selectedIndex,
}) => {
  // Flatten the list once
  const rows = useMemo(() => {
    return viewedList.flatMap((word, index) =>
      meaningKeys
        .filter((key) => word[key.meaning])
        .map((key) => ({
          index,
          pos: key.type,
          meaningKey: key.meaning,
          value: word[key.meaning],
          themes: word.themes ?? [],
        }))
    );
  }, [viewedList]);

  return (
    <div className="word-viewer thin-white-border">
      <ScrollTabs viewPartOfSpeech={viewPartOfSpeech} />
      <div className="word-viewer-list">
        {rows.map((row) => (
          <WordRow
            key={`${row.index}-${row.pos}`}
            {...row}
            progress={progress}
            activeRowRef={activeRowRef}
            selectWordFromViewer={selectWordFromViewer}
            saveProgress={saveProgress}
          />
        ))}
      </div>
      <div className="word-viewer-footer">
        {selectedIndex + 1}/{viewedList.length.toLocaleString()} words
      </div>
    </div>
  );
};

export default React.memo(WordViewer);
