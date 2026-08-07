import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../App.css";
import { Link } from "react-router-dom";
import AddInterfaceLanguageModal from "../Components/addInterfaceLanguageModal.jsx";
import EditInterfaceLanguageModal from "../Components/editInterfaceLanguageModal.jsx";
import { useTranslate } from "../Functions/TranslateUI";
import {
  getInterfaceLanguages,
  editUserLanguage,
  getAuthorName,
  saveAccountSettings,
} from "../services/languageService.js";

const Account = () => {
  const { id } = useParams();
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
  const [authorName, setAuthorName] = useState("");

   useEffect(() => {
      const fetchAuthorName = async () => {
        const data = await window.electron.getAuthorName();
        console.log(data)
        setAuthorName(data);
      };
      fetchAuthorName();
    }, []);

  const fetchInterfaceLanguages = async () => {
    const data = await window.electron.getInterfaceLanguages();

   

    setInterfaceLanguages(data);

    const chosenLang = data.filter((lang) => lang.is_chosen);

    setUserInterfaceLanguage(chosenLang[0].id);
  };

  useEffect(() => {
    fetchInterfaceLanguages();
  }, [refreshLanguagesTrigger]);

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

  const changeInterfaceLanguage = async (language) => {
    setUserInterfaceLanguage(language);

    const data = await window.electron.editUserLanguage(language);
    if (data) {
      console.log(data);
      localStorage.setItem("cachedUserLanguage", data.id);
      localStorage.setItem("cachedTranslations", data.translations);
      localStorage.setItem("cachedLanguageName", data.language_name);
      window.location.reload();
    }
  };

  const showToast = (message) => {
    const toastContainer = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className =
      "toast align-items-center text-white bg-success border-0 show";
    toast.role = "alert";
    toast.ariaLive = "assertive";
    toast.ariaAtomic = "true";

    toast.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const saveSettings = async () => {
    const data = await window.electron.saveAccountSettings(authorName);

    console.log(data);

    if (!data.success) {
      console.error("error saving settings");
    }

    if (data.success) {
      showToast(translate("Settings saved"));
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>{translate("Account Settings")}</h1>

        <div className="settings-section thin-white-border">
          <h3>{translate("Author Name")}</h3>
          <p>
            {translate(
              "This will be the author's name that appears on exported PDFs",
            )}
          </p>

          <input
            placeholder={translate("author's name")}
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </div>

        <div className="settings-section thin-white-border">
          <h3>{translate("Interface Language")}</h3>

          <div className="settings-section thin-white-border">
            <h4>{translate("Change Interface Language")}</h4>
            <select
              value={userInterfaceLanguage}
              onChange={(e) => changeInterfaceLanguage(e.target.value)}
            >
              {interfaceLanguages.map((language, index) => (
                <option key={index} value={language.id}>
                  {language.language_name}
                </option>
              ))}
            </select>
          </div>

          <div className="settings-section thin-white-border">
            <h4>{translate("Your Custom Interface Languages")}</h4>

            <p>
              {translate(
                "Here you can create and manage your own translations of Elatha's interface.",
              )}
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
            triggerRefresh={() =>
              setRefreshLanguagesTrigger((prev) => prev + 1)
            }
          />
        ) : (
          <></>
        )}
      </div>

      <div
        style={{
          backgroundColor: "#464141",
          display: "fixed",
          borderTop: "3px white solid",
          marginTop: "10px",
          padding: "10px",
        }}
      >
        <button style={{ marginLeft: "45%" }} onClick={saveSettings}>
          {translate("Save")}
        </button>
      </div>
    </div>
  );
};

export default Account;
