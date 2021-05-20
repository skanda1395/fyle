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
  res.end("Hi");
});

// Get all matches based on BRANCH NAME (Ordered by IFSC Code)
app.get("/branches/autocomplete", (req, response) => {
  let branch_name = req.query.q;
  let limit = req.query.limit;
  let offset = req.query.offset || 0;

  const text =
    "SELECT * FROM branches WHERE branch = $1 ORDER BY ifsc ASC OFFSET $2 LIMIT $3";
  const values = [branch_name, offset, limit];

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
  let query_string = req.query.q;
  let limit = req.query.limit;
  let offset = req.query.offset || 0;

  const text =
    "SELECT * FROM branches WHERE ifsc = $1 OR branch = $1 OR address = $1 OR city = $1 OR district = $1 OR state = $1 ORDER BY ifsc ASC OFFSET $2 LIMIT $3";
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

// 404 Page
app.use((req, res) => {
  res
    .status(404)
    .end(
      "You have hit the wrong URL. Visit homepage to learn about this API endpoints"
    );
});

// Spin up our server
app.listen(port, () => {
  console.log(`Node.js listening on port ${port}...`);
});
