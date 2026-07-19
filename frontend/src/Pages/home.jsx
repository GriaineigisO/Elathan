import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../App.css";
import { Link } from "react-router-dom";
import AddLanguageModal from "../Components/addLanguageModal.jsx";
import EditLanguageModal from "../Components/EditLanguageModal.jsx";
import AddGroupModal from "../Components/addGroupModal.jsx";
import EditGroupModal from "../Components/editGroupModal.jsx";
import { useTranslate } from "../Functions/TranslateUI";
import { getLanguages, getGroups } from "../services/languageService.js";


const Home = () => {
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
  const [totalWordCount, setTotalWordCount] = useState();
  const { translate } = useTranslate();

  const fetchLanguages = async () => {
   let data = await window.electron.getLanguages();

    if (data) {
      setLanguageList([...data]);
      setOriginalLanguageList([...data]);
      setHasNoLanguages(data.length === 0);
    } else {
      console.error(`Error fetching languages`);
    }
  };
  useEffect(() => {
    fetchLanguages();
  }, [refreshLanguagesTrigger]);


  const fetchGroups = async () => {
    let data = await window.electron.getGroups();

    if (data) {
      setGroupList([...data]);
      setOriginalGroupList([...data]);
    } else {
      console.error(`Error fetching groups`);
    }
  };
  useEffect(() => {
    fetchGroups();
  }, [refreshGroupsTrigger]);


  const handleOpenLanguage = (id) => {
   window.location.href = `/dictionary/${id}`;
  };

  const openCreateLanguagePage = () => {
    window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/createLanguage`,
      "_blank"
    );
  }

  const handleOpenGroup = (id) => {
    window.open(`${import.meta.env.VITE_FRONTEND_URL}/group/${id}`, "_blank");
  };

  const openDevTools = (id) => {
    const userId = localStorage.getItem("userId")
    window.open(`${import.meta.env.VITE_FRONTEND_URL}/devTools/${userId}`, "_blank");
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
    <div className="home-div">
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
        group={groupToEdit ? groupToEdit : ""}
        assignedLanguages={groupToEdit ? groupToEdit.languages : ""}
        assignedWordForms={groupToEdit ? groupToEdit.word_forms : ""}
        assignedWordCategories={groupToEdit ? JSON.parse(groupToEdit.word_categories) : ""}
        triggerRefresh={() => setRefreshGroupsTrigger((prev) => prev + 1)}
      />

      <button
        className="home-buttons"
        onClick={() => {
          setShowAddLanguageModal(true);
        }}
      >
        {translate("Add New Language")}
      </button>
      <button
        className="home-buttons"
        onClick={() => {
          setShowAddGroupModal(true);
        }}
      >
        {translate("Add New Group")}
      </button>

      <p style={{marginTop:"10px"}} className="word-link" onClick={openCreateLanguagePage}>{translate("Create New Language")}</p>

      {totalWordCount ? (
        <p style={{ marginTop: "20px" }}>
          <i>
            {translate("{userName} has added {totalWordCount} words in total across {languageCount} languages.", {
              userName,
              totalWordCount: totalWordCount.toLocaleString(),
              languageCount: originalLanguageList.length.toLocaleString(),
            })}
          </i>
        </p>
      ) : (
        <></>
      )}

        <p className="word-link" onClick={openDevTools}>{translate("Tools")}</p>
      

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
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <div
              className="lang-group-list-div"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {/* Languages */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "200px",
                }}
              >
                <h4>{translate("Languages")}</h4>
                <p>{translate("{languageCount} languages", {
                  languageCount: originalLanguageList.length.toLocaleString()
                })}</p>
                <input
                  placeholder={translate("search languages")}
                  onChange={(e) => searchLanguage(e.target.value)}
                />

                <div className="language-list-div">
                  <div className="language-list-container">
                    <table className="language-list">
                      <tbody>
                        {languageList.map((language, index) => (
                          <tr key={index}>
                            <td
                              onClick={() =>
                                handleOpenLanguage(language.language_id)
                              }
                              style={{ textAlign: "left" }}
                            >
                              {language.language_name}
                            </td>
                            <td>
                              <button
                                className="edit-button-no-icon"
                                onClick={() =>
                                  handleEditLanguage(language.language_id)
                                }
                              >
                                {translate("Edit")}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Groups */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>{translate("Groups")}</h4>
                <p>{translate("{groupCount} groups", {
                  groupCount: groupList.length.toLocaleString()
                })}</p>
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
                            <button
                              className="edit-button-no-icon"
                              onClick={() => handleEditGroup(group.group_id)}
                            >
                              {translate("Edit")}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              
            </div>
          </div>
        </>
      ) : null}

    </div>
  );
};

export default Home;
