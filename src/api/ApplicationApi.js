import delay from "./delay";
import data from "./sample";

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
// const applications = [
//     {
//         id: "react-flux-building-applications",
//         title: "Building Applications in React and Flux",
//         watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
//         authorId: "cory-house",
//         length: "5:08",
//         category: "JavaScript"
//     },
//     {
//         id: "clean-code",
//         title: "Clean Code: Writing Code for Humans",
//         watchHref: "http://www.pluralsight.com/courses/writing-clean-code-humans",
//         authorId: "cory-house",
//         length: "3:10",
//         category: "Software Practices"
//     },
//     {
//         id: "architecture",
//         title: "Architecting Applications for the Real World",
//         watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
//         authorId: "cory-house",
//         length: "2:52",
//         category: "Software Architecture"
//     },
//     {
//         id: "career-reboot-for-developer-mind",
//         title: "Becoming an Outlier: Reprogramming the Developer Mind",
//         watchHref: "http://www.pluralsight.com/courses/career-reboot-for-developer-mind",
//         authorId: "cory-house",
//         length: "2:30",
//         category: "Career"
//     },
//     {
//         id: "web-components-shadow-dom",
//         title: "Web Component Fundamentals",
//         watchHref: "http://www.pluralsight.com/courses/web-components-shadow-dom",
//         authorId: "cory-house",
//         length: "5:10",
//         category: "HTML5"
//     }
// ];

const applications = [data];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = application => {
  return replaceAll(application.title, " ", "-");
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
        const minApplicationTitleLength = 1;
        // if (application.title.length < minApplicationTitleLength) {
        //     reject(`Title must be at least ${minApplicationTitleLength} characters.`);
        // }

        if (application.id) {
          const existingApplicationIndex = applications.findIndex(
            a => a.id === application.id
          );
          applications.splice(existingApplicationIndex, 1, application);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new applications in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          // application.id = generateId(application);
          // application.watchHref = `http://www.pluralsight.com/courses/${application.id}`;
          // applications.push(application);
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
