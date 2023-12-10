import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch("/api/users/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(() => {
        console.log("User updated successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  };

  const deleteUser = () => {
    fetch("/api/users/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((deletedUser) => {
        console.log("User deleted succesfully: ", deletedUser);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch("/api/users/" + id)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      <h1>Edit User</h1>
      <div className="form-container">
        {user !== null && (
          <>
            <h3>Current User Information</h3>
            <h4>Name: {user.name}</h4>
            <h4>Grade: {user.grade}</h4>
            <form action="" id="form-edit-user" onSubmit={submitHandler}>
              <div>
                <h2>Edit Here</h2>
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name || ""}
                  required
                  onInput={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div>
                <label htmlFor="grade">Grade: </label>
                <input
                  type="text"
                  id="grade"
                  name="grade"
                  required
                  value={user.grade || ""}
                  onInput={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <button type="submit">Edit</button>
              <button type="button" onClick={deleteUser}>
                Delete
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Edit;
