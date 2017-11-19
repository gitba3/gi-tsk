// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use strict";

const express = require("express");
const bodyParser = require("body-parser");

function getModel() {
  return require(`./model-${require("./config").get("DATA_BACKEND")}`);
}

const router = express.Router();

// Automatically parse request body as form data
router.use(bodyParser.urlencoded({ extended: false }));

// Set Content-Type for all responses for these routes
router.use((req, res, next) => {
  res.set("Content-Type", "application/json");
  next();
});

/**
 * GET applications
 *
 * Display a page of books (up to ten at a time).
 */
router.get("/", (req, res, next) => {
  getModel().list(10, req.query.pageToken, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.json(entities);
  });
});

/**
 * POST
 *
 * Create a application.
 */
// [START add_application]
router.post("/add", (req, res, next) => {
  const data = req.body;

  // Save the data to the database.
  getModel().create(data, (err, savedData) => {
    if (err) {
      next(err);
      return;
    }
    res.json({});
  });
});
// [END add_application]

/**
 * POST /books/:id/edit
 *
 * Update a application.
 */
router.post("/update/:id", (req, res, next) => {
  const data = req.body;
  getModel().update(req.params.id, data, (err, savedData) => {
    if (err) {
      next(err);
      return;
    }
    res.json({});
  });
});

/**
 * GET 
 *
 * Display a application.
 */
router.get("/:id", (req, res, next) => {
  getModel().read(req.params.id, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.json(entity);
  });
});

/**
 * GET /books/:id/delete
 *
 * Delete a application.
 */
router.get("/delete/:id", (req, res, next) => {
  getModel().delete(req.params.book, err => {
    if (err) {
      next(err);
      return;
    }
    res.redirect(req.baseUrl);
  });
});

/**
 * Errors on "/applications/*" routes.
 */
router.use((err, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = err.message;
  next(err);
});

module.exports = router;
