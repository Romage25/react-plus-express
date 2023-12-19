const express = require("express");
const app = express();
const fs = require("fs");
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/users", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data/data.json", "utf-8"));
  res.json(data.users);
});

app.post("/api/users/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data/data.json", "utf-8"));
  const newUser = req.body;
  newUser.id = data.id_count + 1;
  data.users.push(newUser);
  fs.writeFileSync("./data/data.json", JSON.stringify({...data, "id_count": data.id_count + 1}, null, 2));
  res.json(newUser);
});

app.get("/api/users/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data/data.json", "utf-8"));
  const userId = parseInt(req.params.id);
  const singleUser = data.users.find((user) => user.id === userId);

  if (singleUser) {
    res.json(singleUser);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.put("/api/users/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data/data.json", "utf-8"));
  const updatedUser = req.body;
  const userId = parseInt(req.params.id);
  const userIndex = data.users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    data.users[userIndex] = { ...data.users[userIndex], ...updatedUser };
    fs.writeFileSync("./data/data.json", JSON.stringify(data, null, 2));
    res.json(data.users[userIndex]);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.delete("/api/users/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data/data.json", "utf-8"));
  const userId = parseInt(req.params.id);
  const userIndex = data.users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    const deletedUser = data.users.splice(userIndex, 1);
    fs.writeFileSync("./data/data.json", JSON.stringify(data, null, 2));
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
