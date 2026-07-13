import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../App.css";
import { Link } from "react-router-dom";
import AddLanguageModal from "../Components/addLanguageModal.jsx";
import EditLanguageModal from "../Components/EditLanguageModal.jsx";
import AddGroupModal from "../Components/addGroupModal.jsx";
import EditGroupModal from "../Components/editGroupModal.jsx";
import { useTranslate } from "../Functions/TranslateUI";


const User = () => {
  const { id } = useParams();
    const { translate } = useTranslate();
  
  const [hasNoLanguages, setHasNoLanguages] = useState(false);
  const [languageToEdit, setLanguageToEdit] = useState(null);
  const [groupToEdit, setGroupToEdit] = useState(null);
  const [showAddLanguageModal, setShowAddLanguageModal] = useState(false);
  const [showEditLanguageModal, setShowEditLanguageModal] = useState(false);
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  const [languageList, setLanguageList] = useState([]);
  const [originalLanguageList, setOriginalLanguageList] = useState([]);
  const [refreshLanguagesTrigger, setRefreshLanguagesTrigger] = useState(0);
  const [refreshGroupsTrigger, setRefreshGroupsTrigger] = useState(0);
  const [groupList, setGroupList] = useState([]);
  const [originalGroupList, setOriginalGroupList] = useState([]);
  const [refreshGroupTrigger, setRefreshGroupTrigger] = useState(0);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [userName, setUserName] = useState();
  const [totalWordCount, setTotalWordCount] = useState();

  const fetchUserInfo = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getUserInfo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setUserName(data.username);
      setTotalWordCount(data.totalWordCount);
    } else {
      console.error(`Error fetching user info: ${data.message}`);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchLanguages = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getLanguages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setLanguageList([...data]);
      setOriginalLanguageList([...data]);
      setHasNoLanguages(data.length === 0);
      setUserName();
    } else {
      console.error(`Error fetching languages: ${data.message}`);
    }
  };
  useEffect(() => {
    fetchLanguages();
  }, [refreshLanguagesTrigger]);

  const fetchGroups = async () => {
    
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getGroups`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setGroupList([...data]);
      setOriginalGroupList([...data]);
    } else {
      console.error(`Error fetching groups: ${data.message}`);
    }
  };
  useEffect(() => {
    fetchGroups();
  }, [refreshGroupsTrigger]);

  const handleOpenLanguage = (id) => {
    window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/dictionary/${id}`,
      "_blank"
    );
  };

  const handleOpenGroup = (id) => {
    window.open(`${import.meta.env.VITE_FRONTEND_URL}/group/${id}`, "_blank");
  };

  const handleEditLanguage = (languageId) => {
    // find the latest version of the language from the updated list
    const latest = languageList.find((lang) => lang.language_id === languageId);
    if (latest) {
      setLanguageToEdit(latest);
      setShowEditLanguageModal(true);
    }
  };

  const handleEditGroup = (groupId) => {
    const latest = groupList.find((group) => group.group_id === groupId);
    if (latest) {
      setGroupToEdit(latest);
      setShowEditGroupModal(true);
    }
  };

  const handleLanguageAdded = () => {
    fetchLanguages();
  };

  const handleGroupAdded = () => {
    fetchGroups();
  };

  const searchLanguage = (value) => {
    const language = originalLanguageList.filter((language) =>
      language.language_name.toLowerCase().startsWith(value.toLowerCase())
    );
    setLanguageList(language);
  };

  const searchGroup = (value) => {
    const group = originalGroupList.filter((group) =>
      group.group_name.toLowerCase().startsWith(value.toLowerCase())
    );
    setGroupList(group);
  };

  return (
    <div style={{ marginLeft: "100px", textAlign:"center" }}>
      <AddLanguageModal
        show={showAddLanguageModal}
        setShow={setShowAddLanguageModal}
        onSuccess={handleLanguageAdded}
      />

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

      <AddGroupModal
        show={showAddGroupModal}
        setShow={setShowAddGroupModal}
        onSuccess={handleGroupAdded}
      />

      <EditGroupModal
        show={showEditGroupModal}
        setShow={setShowEditGroupModal}
        name={groupToEdit ? groupToEdit.group_name : ""}
        id={groupToEdit ? groupToEdit.group_id : ""}
        assignedLanguages={groupToEdit ? groupToEdit.languages : ""}
        assignedWordForms={groupToEdit ? groupToEdit.word_forms : ""}
        assignedWordCategories={groupToEdit ? groupToEdit.word_categories : ""}
        group={groupToEdit ? groupToEdit : ""}
        triggerRefresh={() => setRefreshGroupsTrigger((prev) => prev + 1)}
      />


      {totalWordCount ? (
        <p style={{ marginTop: "20px" }}>
          <i>
            {translate("{userName} has added {totalWordCount} words in total across {languageCount} languages.", {userName, totalWordCount: totalWordCount.toLocaleString(), languageCount: originalLanguageList.length.toLocaleString()})}
          </i>
        </p>
      ) : (
        <></>
      )}

      {hasNoLanguages ? (
        <>
          <h2>{translate("You have no languages!")}</h2>
          <button
            onClick={() => {
              setShowAddLanguageModal(true);
            }}
          >
            {translate("Add your first language")}
          </button>
        </>
      ) : null}

      {!hasNoLanguages ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4>{translate("Languages")}</h4>
            <p>{translate("{languageCount} languages", {languageCount: originalLanguageList.length})}</p>
            <input
              placeholder={translate("search languages")}
              onChange={(e) => searchLanguage(e.target.value)}
            />
            <div className="language-list-container">
              <table className="language-list">
                <tbody>
                  {languageList.map((language, index) => (
                    <tr key={index}>
                      <td
                        onClick={() => handleOpenLanguage(language.language_id)}
                        style={{ textAlign: "left" }}
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

          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4>{translate("Groups")}</h4>
            <p>{translate("{groupCount} groups", {groupCount: groupList.length})}</p>
            <input
              placeholder={translate("search groups")}
              onChange={(e) => searchGroup(e.target.value)}
            />
            <div className="language-list-container">
              <table className="language-list">
                <tbody>
                  {groupList.map((group, index) => (
                    <tr key={index}>
                      <td
                        style={{ textAlign: "left" }}
                        onClick={() => handleOpenGroup(group.group_id)}
                      >
                        {group.group_name}
                      </td>
                      <td>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default User;
