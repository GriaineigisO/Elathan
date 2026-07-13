import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../App.css";
import { Link } from "react-router-dom";
import AddLanguageModal from "../Components/addLanguageModal.jsx";
import EditLanguageModal from "../Components/EditLanguageModal.jsx";
import AddGroupModal from "../Components/addGroupModal.jsx";
import EditGroupModal from "../Components/editGroupModal.jsx";
import { useTranslate } from "../Functions/TranslateUI";

const Home = () => {
  const [hasNoLanguages, setHasNoLanguages] = useState(false);
  const [languageToEdit, setLanguageToEdit] = useState(null);
  const [groupToEdit, setGroupToEdit] = useState(null);
  const [showAddLanguageModal, setShowAddLanguageModal] = useState(false);
  const [showEditLanguageModal, setShowEditLanguageModal] = useState(false);
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  const [languageList, setLanguageList] = useState([]);
  const [originalLanguageList, setOriginalLanguageList] = useState([]);
  const [collabLanguageList, setCollabLanguageList] = useState([]);
  const [originalCollabLanguageList, setOriginalCollabLanguageList] = useState(
    []
  );
  const [refreshLanguagesTrigger, setRefreshLanguagesTrigger] = useState(0);
  const [refreshGroupsTrigger, setRefreshGroupsTrigger] = useState(0);
  const [groupList, setGroupList] = useState([]);
  const [originalGroupList, setOriginalGroupList] = useState([]);
  const [collabGroupList, setCollabGroupList] = useState([]);
  const [collabOriginalGroupList, setCollabOriginalGroupList] = useState([]);
  const [refreshGroupTrigger, setRefreshGroupTrigger] = useState(0);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [userName, setUserName] = useState();
  const [totalWordCount, setTotalWordCount] = useState();
  const { translate } = useTranslate();
  const [isInsularBellBeaker, setIsInsularBellBeaker] = useState(false);


  const fetchUserInfo = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getUserInfo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
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

    const userId = localStorage.getItem("userId");
    if (userId === "1745767579287") {
      setIsInsularBellBeaker(true);
    }

  }, []);

  const fetchLanguages = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getLanguages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
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

  const fetchCollabLanguages = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getCollabLanguages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      setCollabLanguageList([...data]);
      setOriginalCollabLanguageList([...data]);
    } else {
      console.error(`Error fetching collab languages: ${data.message}`);
    }
  };
  useEffect(() => {
    fetchCollabLanguages();
  }, [refreshLanguagesTrigger]);

  const fetchGroups = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getGroups`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
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

  const fetchCollabGroups = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getCollabGroups`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setCollabGroupList([...data]);
      setCollabOriginalGroupList([...data]);
    } else {
      console.error(`Error fetching groups: ${data.message}`);
    }
  };
  useEffect(() => {
    fetchCollabGroups();
  }, [refreshGroupsTrigger]);

  const handleOpenLanguage = (id) => {
    window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/dictionary/${id}`,
      "_blank"
    );
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

  const handleEditCollabLanguage = (languageId) => {
    // find the latest version of the language from the updated list
    const latest = collabLanguageList.find(
      (lang) => lang.language_id === languageId
    );
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

  const handleEditCollabGroup = (groupId) => {
    const latest = collabGroupList.find((group) => group.group_id === groupId);
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

  const searchCollabLanguage = (value) => {
    const language = originalCollabLanguageList.filter((language) =>
      language.language_name.toLowerCase().startsWith(value.toLowerCase())
    );
    setCollabLanguageList(language);
  };

  const searchGroup = (value) => {
    const group = originalGroupList.filter((group) =>
      group.group_name.toLowerCase().startsWith(value.toLowerCase())
    );
    setGroupList(group);
  };

  const searchCollabGroup = (value) => {
    const group = collabOriginalGroupList.filter((group) =>
      group.group_name.toLowerCase().startsWith(value.toLowerCase())
    );
    setCollabGroupList(group);
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
        assignedWordCategories={groupToEdit ? groupToEdit.word_categories : ""}
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

      {isInsularBellBeaker && (
        //DEV TOOLS - FOR MY ACCOUNT ONLY - NO OTHER USER CAN SEE THIS
        <p className="word-link" onClick={openDevTools}>{translate("Dev Tools")}</p>
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

      <hr style={{ marginTop: "40px" }} />
      <h2>{translate("Collaborations")}</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {/* Languages */}
        <div
          className="language-list-div"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h4>{translate("Languages")}</h4>
          <p>{translate("{languageCount} languages", {
            languageCount: originalCollabLanguageList.length.toLocaleString()
          })}</p>
          <input
            placeholder={translate("search languages")}
            onChange={(e) => searchCollabLanguage(e.target.value)}
          />
          <div className="language-list-container">
            <table className="language-list">
              <tbody>
                {collabLanguageList.map((language, index) => (
                  <tr key={index}>
                    <td
                      onClick={() => handleOpenLanguage(language.language_id)}
                      style={{ textAlign: "left" }}
                    >
                      {language.language_name}
                    </td>
                    <td>
                      <button
                        className="edit-button-no-icon"
                        onClick={() =>
                          handleEditCollabLanguage(language.language_id)
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

        {/* Groups */}
        <div
          className="language-list-div"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h4>{translate("Groups")}</h4>
          <p>{translate("{groupCount} groups", {
            groupCount: collabGroupList.length.toLocaleString()
          })}</p>
          <input
            placeholder={translate("search groups")}
            onChange={(e) => searchCollabGroup(e.target.value)}
          />
          <div className="language-list-container">
            <table className="language-list">
              <tbody>
                {collabGroupList.map((group, index) => (
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
                        onClick={() => handleEditCollabGroup(group.group_id)}
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
  );
};

export default Home;
