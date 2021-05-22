const express = require("express");
const app = express();
const client = require("./db");
const cors = require("cors");

// Enable cors-access for remote testing
app.use(cors());

// Basic Configuration
let port = process.env.PORT || 3000;

// ------- Routes ------- //

// Explain your APIs here
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Get all matches based on BRANCH NAME (Ordered by IFSC Code)
app.get("/branches/autocomplete", (req, response) => {
  console.log("autocomplete");
  let branch_name = req.query.q;
  let limit = req.query.limit;
  let offset = req.query.offset || 0;

  const text =
    "SELECT * FROM branches WHERE branch LIKE $1 ORDER BY ifsc ASC LIMIT $3 OFFSET $2";
  const values = ["%" + branch_name + "%", offset, limit];

  // Query Database
  client
    .query(text, values)
    .then((res) => {
      let result = {
        branches: res.rows,
      };
      response.json(result);
    })
    .catch((err) => console.error(err.stack));
});

// Get all matches across all columns and all rows (Ordered by IFSC Code)
app.get("/branches", (req, response) => {
  console.log("branches");
  let query_string = req.query.q;
  let limit = req.query.limit;
  let offset = req.query.offset || 0;

  const text =
    "SELECT ifsc, bank_id, branch, address, city, district, state FROM branches WHERE text_with_idx @@ to_tsquery($1) ORDER BY ifsc ASC LIMIT $3 OFFSET $2";
  const values = [query_string, offset, limit];

  // Query Database
  client
    .query(text, values)
    .then((res) => {
      let result = {
        branches: res.rows,
      };
      response.json(result);
    })
    .catch((err) => console.error(err.stack));
});

// Get all matches for a city (Ordered by IFSC Code) (FOR MY OWN TESTING)
app.get("/branches/city", (req, response) => {
  console.log("city query");
  let query_string = req.query.q;
  let limit = req.query.limit;
  let offset = req.query.offset || 0;

  const text =
    "SELECT ifsc, bank_id, branch, address, city, district, state FROM branches WHERE city ILIKE $1 ORDER BY ifsc ASC LIMIT $3 OFFSET $2";
  const values = ["%" + query_string + "%", offset, limit];

  // Query Database
  client
    .query(text, values)
    .then((res) => {
      let result = {
        branches: res.rows,
      };
      response.json(result);
    })
    .catch((err) => console.error(err.stack));
});

// 404 Page
app.use((req, res) => {
  res
    .status(404)
    .send(
      "You have hit the wrong URL. Visit <a href='/'>homepage</a> to learn about this API endpoints"
    );
});

// Spin up our server
app.listen(port, () => {
  console.log(`Node.js listening on port ${port}...`);
});
