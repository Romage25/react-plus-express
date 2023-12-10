import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [form, setForm] = useState({
    name: "",
    grade: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch("/api/users", {
      method: "POST",
      headers: {'Content-Type': 'application/json '},
      body: JSON.stringify(form),
    })
      .then(()=> {
        console.log("User added successfully");
        navigate("/");
      })
      .catch((err)=> {
        console.log(err)
      })
  };

  return (
    <div>
      <h1>Add a User</h1>
      <div className="form-container">
        <form action="" id="form-add-user" onSubmit={submitHandler}>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
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
              onInput={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

Add.propTypes = {};

export default Add;
