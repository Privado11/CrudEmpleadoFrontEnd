import React, { useEffect, useState } from "react";
import { useRecursosHumanos } from "../../context/RecursosHumanosContext";

function EditAccount({ session }) {
  const { updateUser } = useRecursosHumanos();
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [email1, setEmail1] = useState(session.user.email);
  const [email2, setEmail2] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleEditEmail = () => {
    setEditingEmail(true);
  };

  const handleEditPassword = () => {
    setEditingPassword(true);
  };

  const handleSaveEmail = () => {
    if (email1 === email2) {
      updateUser(email2, session.user.password);
      setEditingEmail(false);
      setEmail1(session.user.email);
      setEmail2("");
    } else {
      alert("Los emails no coinciden");
    }
  };

  const handleSavePassword = () => {
    if (password1 === password2) {
      updateUser(session.user.email, password2);
      setEditingPassword(false);
      setPassword2("");
    } else {
      alert("Las contraseñas no coinciden");
    }
  };

  useEffect(() => {
    console.log("email", email2, "password", password2);
  }, [email2, password2]);

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Edit Account</h3>
      </div>
      <div className="mb-3 row">
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-8">
          {!editingEmail ? (
            <input
              type="text"
              readOnly
              className="form-control"
              id="staticEmail"
              value={session.user.email}
            />
          ) : (
            <div>
              <input
                type="text"
                className="form-control"
                value={email1}
                onChange={(e) => setEmail1(e.target.value)}
              />
              <input
                type="text"
                className="form-control mt-2"
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
                placeholder="Confirm your email"
              />
            </div>
          )}
        </div>
        <div className="col-sm-2">
          {!editingEmail ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleEditEmail}
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveEmail}
            >
              Save
            </button>
          )}
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col-sm-8">
          {!editingPassword ? (
            <input
              type="password"
              readOnly
              className="form-control"
              id="inputPassword"
              value="********"
            />
          ) : (
            <div>
              <input
                type="password"
                className="form-control"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
              <input
                type="password"
                className="form-control mt-2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Confirm your password"
              />
            </div>
          )}
        </div>
        <div className="col-sm-2">
          {!editingPassword ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleEditPassword}
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSavePassword}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export { EditAccount };
