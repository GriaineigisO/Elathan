import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../App.css";

const ChangePassword = () => {
  const { id } = useParams();
  const [password, setPassword] = useState();
  const [confirmedPassword, setConfirmedPassword] = useState();
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
   const [failure, setFailure] = useState(false);

  const changePassword = async () => {
    if (password === confirmedPassword) {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/changePassword`,
        {
          userId,
          password,
          confirmedPassword,
        }
      );

      if (response.status === 200) {
      setSuccess(true)
      setFailure(false)
      setPassword("")
      setConfirmedPassword("")
    }

    if (response.status !== 200) {
      setFailure(true)
    }


    } else {
        setWarning(true);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <div>
        <label className="form-label">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update state without clearing error
          required
        />
      </div>
      <div>
        <label className="form-label">Confirm Password:</label>
        <input
          type="password"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)} // Update state without clearing error
          required
        />
      </div>

      <button onClick={changePassword}>Change Password</button>
      {warning ? (<p className="warning">Passwords do not match!</p>) : (<></>)}
      {success ? (<p>Password successfully changed!</p>) : (<></>)}
      {failure ? (<p className="warning">Error changing password</p>) : (<></>)}
            
    </div>
  );
};

export default ChangePassword;
