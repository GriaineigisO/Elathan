import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../App.css";
import { Link } from "react-router-dom";
import AddInterfaceLanguageModal from "../Components/addInterfaceLanguageModal.jsx";
import EditInterfaceLanguageModal from "../Components/editInterfaceLanguageModal.jsx";
import { useTranslate } from "../Functions/TranslateUI";

const Account = () => {
  const { id } = useParams();
  const [userName, setUserName] = useState();
  const [totalWordCount, setTotalWordCount] = useState();
  const [userLanguage, setUserLanguage] = useState();
  const [showAddLanguageModal, setShowAddLanguageModal] = useState(false);
  const [showEditInterfaceLanguageModal, setShowEditInterfaceLanguageModal] =
    useState(false);
  const [interfaceLanguages, setInterfaceLanguages] = useState([]);
  const [languageToEditId, setLanguageToEditId] = useState();
  const [allInterfaceLanguages, setAllInterfaceLanguages] = useState([]);
  const [refreshLanguagesTrigger, setRefreshLanguagesTrigger] = useState(0);
  const [userInterfaceLanguage, setUserInterfaceLanguage] = useState();
  const { translate } = useTranslate();

  const fetchInterfaceLanguages = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getInterfaceLanguages`,
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
      setInterfaceLanguages(data);
    } else {
      console.error(`Error fetching interface languages: ${data.message}`);
    }
  };

  const fetchAllInterfaceLanguages = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getAllInterfaceLanguages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      setAllInterfaceLanguages(data);
    } else {
      console.error(`Error fetching all interface languages: ${data.message}`);
    }
  };

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
      setUserLanguage(data.userLanguage);
    } else {
      console.error(`Error fetching user info: ${data.message}`);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchInterfaceLanguages();
    fetchAllInterfaceLanguages();
  }, [refreshLanguagesTrigger]);

  const OpenChangePassword = () => {
    window.open(
      `${import.meta.env.VITE_FRONTEND_URL}/changepassword`,
      "_blank"
    );
  };

  const addNewInterfaceLanguage = () => {
    setShowAddLanguageModal(true);
  };

  const refreshInterfaceLanguage = () => {
    fetchInterfaceLanguages();
    fetchAllInterfaceLanguages();
  };

  const handleEditLanguage = (languageId) => {
    setLanguageToEditId(languageId);
    setShowEditInterfaceLanguageModal(true);
  };

  const getInterfaceLanguage = async (language) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getUserLanguage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id, language }),
      }
    );

    const data = await response.json();
    setUserInterfaceLanguage(data.interface_language);
  };

  useEffect(() => {
    getInterfaceLanguage();
  }, [id]);

  const changeInterfaceLanguage = async (language) => {
    setUserInterfaceLanguage(language)
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/editUserLanguage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id, language }),
      }
    );
    window.location.reload();
  };



  return (
    <div style={{ textAlign: "center" }}>
      <h1>{translate("Account Settings")}</h1>
      <p className="word-link" onClick={OpenChangePassword}>
        {translate("Change Password")}
      </p>
      <div className="settings-section thin-white-border">
        <h3>{translate("Interface Language")}</h3>

        <div className="settings-section thin-white-border">
          <h4>{translate("Change Interface Language")}</h4>
          <select
            value={userInterfaceLanguage}
            onChange={(e) => changeInterfaceLanguage(e.target.value)}
            
          >
            {allInterfaceLanguages.map((language, index) => (
              <option key={index} value={language.id}>
                {language.language_name} by {language.creator_username}
              </option>
            ))}
          </select>
        </div>

        <div className="settings-section thin-white-border">
          <h4>{translate("Your Custom Interface Languages")}</h4>

          <p>
            {translate("Here you can create and manage your own translations of Elatha's interface.")}
          </p>

          <button onClick={addNewInterfaceLanguage}>
            {translate("Add New Interface Language")}
          </button>

          <table
            className="language-list"
            style={{ marginLeft: "300px", marginTop: "30px" }}
          >
            <tbody>
              {interfaceLanguages.map((language, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "left" }}>
                    {language.language_name}
                  </td>
                  <td>
                    <button
                      className="edit-button-no-icon"
                      onClick={() => handleEditLanguage(language.id)}
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

      <AddInterfaceLanguageModal
        show={showAddLanguageModal}
        setShow={setShowAddLanguageModal}
        onSuccess={refreshInterfaceLanguage}
      />

      {languageToEditId ? (
        <EditInterfaceLanguageModal
          show={showEditInterfaceLanguageModal}
          setShow={setShowEditInterfaceLanguageModal}
          id={languageToEditId}
          onSuccess={refreshInterfaceLanguage}
          triggerRefresh={() => setRefreshLanguagesTrigger((prev) => prev + 1)}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Account;
