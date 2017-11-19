import delay from "./delay";
import data from "./sample";
import random from "simple-random";

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

const remoteAPI = "/api/applications/";

const applications = [...data];

const callAPI = (path, options) => {
  return fetch(remoteAPI + path, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    ...options
  });
};

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = application => {
  return random();
};

class ApplicationApi {
  static getAllApplications() {
    return new Promise(resolve => {
      callAPI("").then(r => resolve(r.json()));
    });
  }

  static saveApplication(application) {
    application = Object.assign({}, application); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      if (application.id) {
        const options = { method: "post", body: JSON.stringify(application) };
        callAPI(`update/${application.id}`, options).then(r =>
          resolve(application)
        );
      } else {
        const options = { method: "post", body: JSON.stringify(application) };
        callAPI("add", options).then(r => resolve(application));
      }
    });
  }

  static deleteApplication(applicationId) {
    return new Promise(resolve => {
      callAPI(applicationId).then(r => resolve());
      setTimeout(() => {
        const indexOfApplicationToDelete = applications.findIndex(
          application => application.id === applicationId
        );
        applications.splice(indexOfApplicationToDelete, 1);
        resolve();
      }, delay);
    });
  }

  static getApplication(applicationId) {
    return new Promise(resolve => {
      callAPI(applicationId).then(r => resolve(r.json()));
    });
  }
}

export default ApplicationApi;
