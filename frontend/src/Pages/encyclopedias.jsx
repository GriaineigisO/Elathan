import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../App.css";
import { Link } from "react-router-dom";
import EditEncyclopediaModal from "../Components/EditEncyclopediaModal.jsx";
import AddEncyclopediaModal from "../Components/addEncyclopediaModal.jsx";
import { useTranslate } from "../Functions/TranslateUI";
import { getEncyclopedias } from "../services/encyclopediaService.js";

const Encyclopedias = () => {
  const [hasNoEncyclopedias, setHasNoEncyclopedias] = useState(false);
  const [encyclopediaToEdit, setEncyclopediaToEdit] = useState(null);
  const [showAddEncyclopediaModal, setShowAddEncyclopediaModal] = useState(false);
  const [showEditEncyclopediaModal, setShowEditEncyclopediaModal] = useState(false);
  const [encyclopediaList, setEncyclopediaList] = useState([]);
  const [originalEncyclopediaList, setOriginalEncyclopediaList] = useState([]);
  const [collabEncyclopediaList, setCollabEncyclopediaList] = useState([]);
  const [originalCollabEncyclopediaList, setOriginalCollabEncyclopediaList] = useState(
    []
  );
  const [refreshEncyclopediasTrigger, setRefreshEncyclopediasTrigger] = useState(0);
  const [userName, setUserName] = useState();
  const [totalEntryCount, setTotalEntryCount] = useState();
  const { translate } = useTranslate();
  const [encyclopediaCount, setEncyclopediaCount] = useState(0);


 

  const fetchEncylopedias = async () => {
   let data = await window.electron.getEncyclopedias();
      setEncyclopediaList([...data]);
      setOriginalEncyclopediaList([...data]);
      setHasNoEncyclopedias(data.length === 0);
      setUserName();
    
  };
  useEffect(() => {
    fetchEncylopedias();
  }, [refreshEncyclopediasTrigger]);
  
  const handleOpenEncyclopedia = (id) => {
   window.location.href = `/encyclopedia/${id}`;
  };

   const openCreateEncyclopediaPage = (id) => {
   window.location.href = `/createEncyclopedia`;
  };



  const handleEditEncyclopedia = (EncyclopediaId) => {
    // find the latest version of the Encyclopedia from the updated list
    const latest = encyclopediaList.find((lang) => lang.encyclopedia_id === EncyclopediaId);
    if (latest) {
      setEncyclopediaToEdit(latest);
      setShowEditEncyclopediaModal(true);
    }
  };

  const handleEncyclopediaAdded = () => {
    fetchEncyclopedias();
  };

  
  const searchEncyclopedia = (value) => {
    const Encyclopedia = originalEncyclopediaList.filter((Encyclopedia) =>
      Encyclopedia.Encyclopedia_name.toLowerCase().startsWith(value.toLowerCase())
    );
    setEncyclopediaList(Encyclopedia);
  };

  return (
    <div className="home-div">
      <AddEncyclopediaModal
        show={showAddEncyclopediaModal}
        setShow={setShowAddEncyclopediaModal}
        onSuccess={handleEncyclopediaAdded}
      />

      {showEditEncyclopediaModal && encyclopediaToEdit && (
        <EditEncyclopediaModal
          show={showEditEncyclopediaModal}
          setShow={setShowEditEncyclopediaModal}
          name={encyclopediaToEdit.encyclopedia_name}
          id={encyclopediaToEdit.encyclopedia_id}
          triggerRefresh={() => setRefreshEncyclopediasTrigger((prev) => prev + 1)}
        />
      )}

      <button
        className="home-buttons"
        onClick={() => {
          setShowAddEncyclopediaModal(true);
        }}
      >
        {translate("Add New Encyclopedia")}
      </button>
     

      {totalEntryCount ? (
        <p style={{ marginTop: "20px" }}>
          <i>
            {translate("{userName} has added {totalEntryCount} entries in total across {EncyclopediaCount} Encyclopedias.", {
              userName,
              totalEntryCount: totalEntryCount.toLocaleString(),
              EncyclopediaCount: originalEncyclopediaList.length.toLocaleString(),
            })}
          </i>
        </p>
      ) : (
        <></>
      )}

    
      {hasNoEncyclopedias ? (
        <>
          <h2>{translate("You have no Encyclopedias!")}</h2>
          <button
            onClick={() => {
              setShowAddEncyclopediaModal(true);
            }}
          >
            {translate("Add your first Encyclopedia")}
          </button>
        </>
      ) : null}

     

      {!hasNoEncyclopedias ? (
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
              {/* Encyclopedias */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "200px",
                }}
              >
                <h4>{translate("Encyclopedias")}</h4>
                <p>{translate("{EncyclopediaCount} Encyclopedias", {
                  EncyclopediaCount: originalEncyclopediaList.length.toLocaleString()
                })}</p>
               
                <input
                  placeholder={translate("search Encyclopedias")}
                  onChange={(e) => searchEncyclopedia(e.target.value)}
                />

                <div className="language-list-div">
                  <div className="language-list-container">
                    <table className="language-list">
                      <tbody>
                        {encyclopediaList.map((Encyclopedia, index) => (
                          <tr key={index}>
                            <td
                              onClick={() =>
                                handleOpenEncyclopedia(Encyclopedia.encyclopedia_id)
                              }
                              style={{ textAlign: "left" }}
                            >
                              {Encyclopedia.encyclopedia_name}
                            </td>
                            <td>
                              <button
                                className="edit-button-no-icon"
                                onClick={() =>
                                  handleEditEncyclopedia(Encyclopedia.encyclopedia_id)
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
              
            </div>
          </div>
        </>
      ) : null}

      <hr style={{ marginTop: "40px" }} />
      {/* <h2>{translate("Collaborations")}</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
       
        <div
          className="Encyclopedia-list-div"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h4>{translate("Encyclopedias")}</h4>
          <p>{translate("{EncyclopediaCount} Encyclopedias", {
            EncyclopediaCount: originalCollabEncyclopediaList.length.toLocaleString()
          })}</p>
          <input
            placeholder={translate("search Encyclopedias")}
            onChange={(e) => searchCollabEncyclopedia(e.target.value)}
          />
          <div className="Encyclopedia-list-container">
            <table className="Encyclopedia-list">
              <tbody>
                {collabEncyclopediaList.map((Encyclopedia, index) => (
                  <tr key={index}>
                    <td
                      onClick={() => handleOpenEncyclopedia(Encyclopedia.Encyclopedia_id)}
                      style={{ textAlign: "left" }}
                    >
                      {Encyclopedia.Encyclopedia_name}
                    </td>
                    <td>
                      <button
                        className="edit-button-no-icon"
                        onClick={() =>
                          handleEditCollabEncyclopedia(Encyclopedia.Encyclopedia_id)
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

       */}
    </div>
  );
};

export default Encyclopedias;
