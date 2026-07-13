import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import MyEditor from "../vendor/ckEditor-build/App.jsx";

import { useTranslate } from "../Functions/TranslateUI";


const Grammar = () => {
  const { id } = useParams();
    const { translate } = useTranslate();
  
  const [languageName, setLanguageName] = useState();
  const [loading, setLoading] = useState(false);
  const [creatorUsername, setCreatorUsername] = useState();
  const [creatorId, setCreatorId] = useState();
  const [collaborators, setCollaborators] = useState([]);
  const [canEdit, setCanEdit] = useState(false);
  const [canView, setCanView] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [showPermissionMessage, setShowPermissionMessage] = useState(false);
  const [grammar, setGrammar] = useState();
  const [showEditGrammar, setShowEditGrammar] = useState(false);

  const getGrammar = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getGrammar`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    let data = await response.json();
    setGrammar(data.grammar);
  };

  useEffect(() => {
    getGrammar();
  }, [id]);

  useEffect(() => {
    const checkIfProto = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/getLanguage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      let data = await response.json();
      setPrivacy(data[0].privacy);
      setLanguageName(data[0].language_name);
      setCreatorId(data[0].user_id);
      getUserInfo(data[0].user_id, setCreatorUsername);
    };
    checkIfProto();
  }, [id]);

  const checkPermission = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/checkPermission`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, userId }),
      }
    );
    const data = await response.json();
    setCanEdit(data);
  };

  useEffect(() => {
    checkPermission();
  }, [id]);

  const checkPrivacy = async () => {
    const userId = localStorage.getItem("userId");

    //if user is not logged in
    if (!userId && privacy === "private") {
      setCanView(false);
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/checkPrivacy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, userId }),
      }
    );
    const data = await response.json();
    setCanView(data);
  };

  useEffect(() => {
    checkPrivacy();
  }, [id]);

  const hasFetchedCollaborators = useRef(false);

  useEffect(() => {
    if (hasFetchedCollaborators.current) return;
    hasFetchedCollaborators.current = true;

    const getCollaborators = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/getLanguage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      const data = await response.json();

      if (!data[0]?.collaborators?.length) return;

      const newCollaborators = [];

      for (const collaborator of data[0].collaborators) {
        const username = await getUsername(collaborator);
        newCollaborators.push({
          username: collaborator.username,
          userId: collaborator.user_id,
        });
      }

      setCollaborators((prev) => {
        const existingIds = new Set(prev.map((c) => c.userId));
        const filtered = newCollaborators.filter(
          (c) => !existingIds.has(c.userId)
        );
        return [...prev, ...filtered];
      });
    };

    getCollaborators();
  }, [id]);

  const getUserInfo = async (id, setUsername) => {
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

    if (setUsername === null) {
      return data.username;
    }

    setUsername(data.username);
  };

  const getUsername = (id) => {
    return getUserInfo(id, null);
  };

  const handleOpenUser = (id) => {
    window.open(`${import.meta.env.VITE_FRONTEND_URL}/user/${id}`, "_blank");
  };

  const saveGrammar = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/saveGrammar`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, grammar }),
      }
    );
  };

  const handleEditGrammar = () => {
    if (showEditGrammar) {
      setShowEditGrammar(false);
      saveGrammar();
    } else {
      setShowEditGrammar(true);
    }
  };

  const handleCancelEditing = () => {
    setShowEditGrammar(false);
  }

    const openDictionary = (id) => {
    window.open(`${import.meta.env.VITE_FRONTEND_URL}/dictionary/${id}`, "_blank");
  };

  const printGrammar = () => {

  }

  return (
    <div style={{ width: "100%" }}>
      {canView ? (
        <>
          {loading ? (
            <div className="spinner-container">
              <div className="spinner" />
              <p>{translate("Loading...")}</p>
            </div>
          ) : (
            <div >
                <div style={{ textAlign: "center" }}>
              {canEdit && !showEditGrammar ? (
                <button
                  className="hide-for-printing"
                  onClick={handleEditGrammar}
                >
                  {translate("Edit Grammar")}
                </button>
              ) : (
                <></>
              )}

              {canEdit && showEditGrammar ? (
                <div>
                <button
                  className="hide-for-printing"
                  onClick={handleEditGrammar}
                >
                  {translate("Save Grammar")}
                </button>

                <button
                  className="hide-for-printing"
                  onClick={handleCancelEditing}
                >
                  {translate("Cancel")}
                </button>
                </div>
              ) : (
                <></>
              )}

              {!showEditGrammar && (
                <button
                  className="hide-for-printing"
                  onClick={() => {
                    printGrammar();
                  }}
                >
                  {translate("Print")}
                </button>
              )}

              {!showEditGrammar && (

              <div>
              <h1 className="dictionary-title">{translate("{languageName} Grammar", {languageName})}</h1>

              <p>
                {translate("Created by")}{" "}
                <span
                  className="word-link"
                  onClick={() => handleOpenUser(creatorId)}
                >
                  {creatorUsername}
                </span>
              </p>

              {collaborators.length > 0 ? (
                <p>
                  {translate("Collaborators")}:{" "}
                  {collaborators.map((collaborator) => (
                    <span
                      className="word-link"
                      onClick={() => handleOpenUser(collaborator.userId)}
                    >
                      {collaborator.username}
                    </span>
                  ))}
                </p>
              ) : (
                <></>
              )}

              <p onClick={() => openDictionary(id)} className="word-link">{translate("View {languageName} Dictionary", {languageName})}</p>

              </div>)}

              </div>

              <div>
                {showEditGrammar ? (
                  <div>
                    <MyEditor
                      value={grammar || ""}
                      onChange={(content) => setGrammar(content)}
                      editorContainerWidth="80%"
                      marginLeft="300px"
                    />
                  </div>
                ) : grammar ? (
                  <div>
                    <div
                    className="rendered-content"
                      style={{
                        marginLeft: "100px",
                        marginRight: "100px",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: grammar,
                      }}
                    />
                  </div>
                ) : (
                  <p>{translate("Begin adding {languageName}'s grammar!", {languageName})}</p>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {showPermissionMessage ? (
            <h2>{translate("You do not have permission to view this grammar")}</h2>
          ) : (
            <h1>{translate("Loading...")}</h1>
          )}
        </>
      )}
    </div>
  );
};

export default Grammar;
