import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import EditLanguageModal from "../Components/EditLanguageModal.jsx";

const Group = () => {
  const { id } = useParams();
  const [group, setGroup] = useState();
  const [languageToEdit, setLanguageToEdit] = useState(null);
  const [showEditLanguageModal, setShowEditLanguageModal] = useState(false);
  const [languageList, setLanguageList] = useState([]);
  const [originalLanguageList, setOriginalLanguageList] = useState([]);

  const fetchGroup = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/getGroup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );
      const data = await response.json();
      setGroup(data[0]);
      setLanguageList(data[0].languages)
      setOriginalLanguageList(data[0].languages)
    } catch (err) {
      console.error("Error in fetchGroup:", err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchGroup();
    }
  }, [id]);

  const handleOpenLanguage = (id) => {
    window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/dictionary/${id}`,
      "_blank"
    );
  };

  const handleEditLanguage = (languageId) => {
    // find the latest version of the language from the updated list
    const latest = group.languages.find(
      (lang) => lang.language_id === languageId
    );
    if (latest) {
      setLanguageToEdit(latest);
      setShowEditLanguageModal(true);
    }
  };

  const searchLanguage = (value) => {
    const language = originalLanguageList.filter((language) =>
      language.language_name.toLowerCase().startsWith(value.toLowerCase())
    );
    setLanguageList(language);
  };

  if (!group) return <p>Loading...</p>;
  return (
    <div>
      {showEditLanguageModal && languageToEdit && (
        <EditLanguageModal
          show={showEditLanguageModal}
          setShow={setShowEditLanguageModal}
          name={languageToEdit.language_name}
          id={languageToEdit.language_id}
          is_proto={languageToEdit.is_proto}
          triggerRefresh={() => setRefreshLanguagesTrigger((prev) => prev + 1)}
        />
      )}

      <h1>{group.group_name}</h1>

      <p><i>{originalLanguageList.length} languages</i></p>

      <input
        placeholder={`search ${group.group_name}`}
        onChange={(e) => searchLanguage(e.target.value)}
        style={{width:"400px"}}
      />

      <div
        className="language-list-container"
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <table className="language-list">
          <tbody>
            {languageList.map((language, index) => (
              <tr key={index}>
                <td
                  style={{ textAlign: "left" }}
                  onClick={() => handleOpenLanguage(language.language_id)}
                >
                  {language.language_name}
                </td>
                <td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Group;
