import delay from "./delay";
import data from "./sample";
import random from "simple-random";

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

const remoteAPI = "/api/applications";

const applications = [...data];

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
      setTimeout(() => {
        resolve(Object.assign([], applications));
      }, delay);
    });
  }

  static saveApplication(application) {
    application = Object.assign({}, application); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        // const minApplicationTitleLength = 1;
        // // if (application.name.length < minApplicationTitleLength) {
        // //     reject(`Title must be at least ${minApplicationTitleLength} characters.`);
        // // }

        if (application.id) {
          const existingApplicationIndex = applications.findIndex(
            a => a.id === application.id
          );
          applications.splice(existingApplicationIndex, 1, application);
        } else {
          //Just simulating creation here.
          //Cloning so copy returned is passed by value rather than by reference.
          application.id = generateId(application);
          applications.push(application);
        }

        resolve(application);
      }, delay);
    });
  }

  static deleteApplication(applicationId) {
    return new Promise(resolve => {
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
      setTimeout(() => {
        const existingApplicationIndex = applications.findIndex(
          application => application.id === applicationId
        );

        const applicationFound = Object.assign(
          {},
          applications[existingApplicationIndex]
        );

        resolve(applicationFound);
      }, delay);
    });
  }
}

export default ApplicationApi;
