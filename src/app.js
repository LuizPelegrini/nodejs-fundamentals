const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid, v4 } = require('uuid');

// create express app
const app = express();

// add express.json() middleware to work with json data in requests/responses
app.use(express.json());
app.use(cors());

// stores all repos
const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // De-structuring the body
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
  // De-structure id from route params and body data from body
  const { id } = request.params;
  const { title, url, techs } = request.body;

  // tries to find index
  const repoIndex = repositories.findIndex(repo => repo.id === id);
  if(repoIndex < 0){
    return response.status(400).json({ error: 'No repo has been found' });
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
  // Extracting id from route params
  const { id } = request.params;

  // tries to find index
  const repoIndex = repositories.findIndex(repo => repo.id === id);
  if(repoIndex < 0){
    return response.status(400).json({ error: 'No repo has been found' });
  }

  // remove repo from repositories
  repositories.splice(repoIndex, 1);

  // return empty response
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // Extracting the id from route params
  const { id } = request.params;

  // find the repo
  const repoIndex = repositories.findIndex(repo => repo.id === id);
  if(repoIndex < 0){
    return response.status(400).json({ error: 'No repo has been found. '});
  }

  // add one more like when this request is sent
  repositories[repoIndex].likes++;

  return response.json(repositories[repoIndex]);
});

module.exports = app;
