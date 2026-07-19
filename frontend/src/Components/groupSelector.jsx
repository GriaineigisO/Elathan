import { useState, useEffect, useRef } from "react";
import { useTranslate } from "../Functions/TranslateUI";
import { getGroups } from "../services/languageService";

const GroupSelector = ({ name, id, onGroupSelect, loanerLanguage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [allGroups, setAllGroups] = useState([]);
    const { translate } = useTranslate();


  const containerRef = useRef(null); // 👈 Create a ref

  useEffect(() => {
    const getGroups = async () => {
     const data = await window.electron.getGroups();
      setAllGroups(data);
    };
    getGroups();
  }, []);

  const filteredGroups = allGroups.filter(
    (group) =>
      group.group_id !== id &&
      group.group_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    setSearchTerm("");
    setShowDropdown(false);
    if (typeof onGroupSelect === "function") {
      onGroupSelect(group);
    }
  };

  // 👇 New effect: handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "300px" }}>
      <input
        type="text"
        placeholder={translate("Search groups...")}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        style={{ width: "100%", padding: "8px" }}
      />

      {showDropdown && filteredGroups.length > 0 && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "#242424",
            border: "1px solid #ccc",
            width: "100%",
            maxHeight: "300px",
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          {filteredGroups.map((group, index) => (
            <div
              key={index}
              onClick={() => handleSelectGroup(group)}
              className="dropdown-list"
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              {group.group_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupSelector;
