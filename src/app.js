const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid, v4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // Destructuring the body
  const { title, url, techs } = request.body;

  // create a new repo with 0 likes, and assign a unique ID
  const newRepo = {
    id: v4(),
    title,
    url,
    techs,
    likes: 0
  };

  // add to the list of repositories
  repositories.push(newRepo);

  // return a response
  return response.json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  // Destructure id from route params and body data from body
  const { id } = request.params;
  const { title, url, techs } = request.body;

  // tries to find index
  const repoIndex = repositories.findIndex(repo => repo.id === id);
  if(repoIndex < 0){
    return response.status(400).json({ error: 'Cannot find project' });
  }
  
  // create a new repo with the updated data
  const updatedRepo = {
    id,
    title,
    url,
    techs
  };

  // replace at the same location as the previous one
  repositories[repoIndex] = updatedRepo;
  return response.json(updatedRepo);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
