import { useState } from "react";
import { useTranslate } from "../Functions/TranslateUI";
import FindWordsDescendants from "./findWOrdsDescendants.jsx";
import React from "react";
import EditEntryModal from "../Components/editEntryModal.jsx";

function PaginatedEncyclopedia({
  visibleEntries,
  pageSize,
  showPrintedDictionary,
  onSuccess,
  topics
}) {
  const { translate } = useTranslate();
  const [page, setPage] = useState(1);
  const [showEditEntryModal, setShowEditEntryModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const totalPages = Math.ceil(visibleEntries.length / Number(pageSize));

  const start = (page - 1) * Number(pageSize);
  const end = start + Number(pageSize);
  const pageItems = Number(pageSize)
    ? visibleEntries.slice(start, end)
    : visibleEntries;

  return (
    <>
      {editingEntry && (
        <EditEntryModal
          show={true}
          setShow={() => setEditingEntry(null)}
          onSuccess={onSuccess}
          id={editingEntry.entry_id}
          topics={topics}
        />
      )}

      {pageItems.map((entry, index) => (
        <div
          key={index}
          onClick={() => setEditingEntry(entry)}
          className="dictionary-entry"
        >
          <div>
            <span>
              <b style={{ fontWeight: "bolder" }}>
                <span className="headword" style={{ fontSize: "18px" }}>
                  {entry.headword}
                </span>
              </b>
              <i style={{ marginLeft: "5px" }}>{entry.topic}</i>
              <span
                style={{ marginLeft: "10px" }}
                dangerouslySetInnerHTML={{
                  __html: entry.entry_text
                    .replace(/^<p>/, "")
                    .replace(/<\/p>$/, ""),
                }}
              />
            </span>
          </div>
        </div>
      ))}

      {/* Pagination controls */}

      {!showPrintedDictionary && (
        <div
          style={{
            marginTop: "0.75rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>

          <span style={{ margin: "0 1rem" }}>
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default PaginatedEncyclopedia;
