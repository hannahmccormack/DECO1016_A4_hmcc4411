//SETTING UP CUSTOM CONSTRAINTS FOR EACH PAGE

var constraints1 = {
  email: {
    presence: true,
    email: true
  }
}

//PAGE 2 CONSTRAINTS
var constraints2 = {

  firstName: {
    presence: true,
    length: {
      minimum: 2,
    },
    format: {
      pattern: "[a-z ]+",
      flags: "i",
      message: "Can only contain letters"
    }
  },

  lastName: {
    presence: true,
    length: {
      minimum: 2,
    },
    format: {
      pattern: "[a-z ]+",
      flags: "i",
      message: "Can only contain letters"
    }
  },

    email: {
    presence: true,
    email: true
  },
  password: {
    presence: true,
    length: {
      minimum: 5
    }
  },

  DOB: {
    presence: true
  }, 

  gender: {
    presence: true
  }, 

}

//PAGE THREE CONSTRAINTS
var constraints3 = {
  
  paymentInfo: {
    presence: true
  },

  cardName: {
    presence: true
  },

  cardNumber: {
    presence:true
  }, 

  cardExpiry: {
    presence: true
  }, 

  CVV: {
    presence: true
  }, 

  //this is real funky but its the only way I can make the checkbox work
  agreeConditions: {
    presence: {
      message: "^You need to check the checkbox"
    }, 
    inclusion: {
      within: [true], 
      message: "^You need to check the checkbox"
    }, 
  }, 
}

//Making the constraints take action 

//PAGE 1

//this function goes through the process of validating the form against the criteria
//and then when successful submits the form and goes to the next page
var form = document.querySelector("#emailPg1Form");
if(form){
  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    handleFormSubmit(form);
  });
}

//this is the function for validating and submitting the forms
function handleFormSubmit(form, input) {
  console.log(form);
  var errors = validate(form, constraints1);
  showErrors(form, errors || {});
  if (!errors) {
    redirect();
  }
}

//this is the function for going to the next page
function redirect() {
  window.location = "index2.html";
}

//PAGE 2

//same functions just different names and variables
var form2 = document.querySelector("#formPg2");
if(form2){
  form2.addEventListener("submit", function(ev) {
    ev.preventDefault();
    handleFormSubmit2(form2);
  });
}

function handleFormSubmit2(form2, input) {
  console.log(form2);
  var errors = validate(form2, constraints2);
  showErrors(form2, errors || {});
  if (!errors) {
    redirectPg2();
    storeName();
  }
}

function redirectPg2() {
  window.location = "index3.html";
}

//PAGE 3

var form3 = document.querySelector("#formPg3");
if(form3){
  form3.addEventListener("submit", function(ev) {
    ev.preventDefault();
    handleFormSubmit3(form3);
  });
}

function handleFormSubmit3(form3, input) {
  console.log(form3);
  var errors = validate(form3, constraints3);
  showErrors(form3, errors || {});
  if (!errors) {
    redirectPg3();
  }
}

function redirectPg3() {
  window.location = "index4.html";
}

//SECTION FOR THE ACTUAL VALIDATION FUNCTION

// This is the function to show the erros 
function showErrors(form, errors) {
  form.querySelectorAll("input[name], select[name]").forEach( function(input) {
    showErrorsForInput(input, errors && errors[input.name]);
  });
}

// Shows the errors for a specific input
function showErrorsForInput(input, errors) {
  var formGroup = closestParent(input.parentNode, "form-group")
    , messages = formGroup.querySelector(".messages");
  resetFormGroup(formGroup);
  if (errors) {
    formGroup.classList.add("has-error");
    errors.forEach(function(error) {
      addError(messages, error);
    });
  } else {
    // otherwise we simply mark it as success
    formGroup.classList.add("has-success");
  }
}

// Recusively finds the closest parent that has the specified class
function closestParent(child, className) {
  if (!child || child == document) {
    return null;
  }
  if (child.classList.contains(className)) {
    return child;
  } else {
    return closestParent(child.parentNode, className);
  }
}

function resetFormGroup(formGroup) {
  // Remove the success and error classes
  formGroup.classList.remove("has-error");
  formGroup.classList.remove("has-success");
  // and remove any old messages
  formGroup.querySelectorAll(".help-block.error").forEach(function(el) {
    el.parentNode.removeChild(el);
  });
}

//this is the function for showing the error on the screen
function addError(messages, error) {
  var block = document.createElement("p");
  block.classList.add("help-block");
  block.classList.add("error");
  block.innerText = error;
  messages.appendChild(block);
}

showName(); 

//ADDING NAME TO CONFIRMATION MESSAGE
function storeName(){
  //creating a variable for the persons name
  var userName = document.getElementById("firstName").value; 
  //storing the name in local storage
  localStorage.setItem("firstName", userName); 
}

function showName(){
    //creating a variable for the item retrieved from local storage
  var storedName = localStorage.getItem("firstName");
    //appending the name to the empty name paragraph
  document.getElementById("congratsName").innerHTML += storedName; 

}
