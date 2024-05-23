import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useRecursosHumanos } from "../../context/RecursosHumanosContext";

function AuthS({ session, setSession }) {
  const { auth } = useRecursosHumanos();
  const [email, setEmail] = useState("admin@recursoshumanos.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();

  const initializeAuth = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError(null);

    try {
      const success = await auth(email, password, setSession);
      if (!success) {
        setError("Error during authentication. Please try again.");
      }
    } catch (err) {
      setError("Error during authentication. Please try again.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <div style={{ margin: "30px", marginLeft: "55px", padding: "5px" }}>
      <form className="mb-3 row" onSubmit={initializeAuth}>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Email</label>
          <select
            className="form-select"
            aria-label="Default select example"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            <option value="admin@recursoshumanos.com">
              admin@recursoshumanos.com
            </option>
            <option value="usuario@recursoshumanos.com">
              usuario@recursoshumanos.com
            </option>
          </select>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
        </div>
        {error && <Alert severity="error">{error}</Alert>}
        <button
          type="submit"
          className="btn btn-primary btn btn-dark"
          disabled={isAuthenticating}
        >
          {isAuthenticating ? "Authenticating..." : "Confirm identity"}
        </button>
      </form>
    </div>
  );
}

export { AuthS };
