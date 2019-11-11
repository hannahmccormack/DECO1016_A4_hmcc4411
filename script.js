var constraints1 = {
  email: {
    presence: true,
    email: true
  }
}

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

  //NAUGHTY ELEMENTS GO HERE

  DOB: {
    presence: true
  }, 

  gender: {
    presence: true
  }, 



}

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

//page 1

var form = document.querySelector("#emailPg1Form");
if(form){
  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    handleFormSubmit(form);
  });
}

function handleFormSubmit(form, input) {
  console.log(form);
  var errors = validate(form, constraints1);
  showErrors(form, errors || {});
  if (!errors) {
    redirect();
  }
}

function redirect() {
  window.location = "index2.html";
}

//page 2
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
  }
}

function redirectPg2() {
  window.location = "index3.html";
}

//page 3

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

// Updates the inputs with the validation errors
function showErrors(form, errors) {
  // We loop through all the inputs and show the errors for that input
  form.querySelectorAll("input[name], select[name]").forEach( function(input) {
    // Since the errors can be null if no errors were found we need to handle
    // that
    showErrorsForInput(input, errors && errors[input.name]);
  });
}

// Shows the errors for a specific input
function showErrorsForInput(input, errors) {
  // This is the root of the input
  var formGroup = closestParent(input.parentNode, "form-group")
    // Find where the error messages will be insert into
    , messages = formGroup.querySelector(".messages");
  // First we remove any old messages and resets the classes
  resetFormGroup(formGroup);
  // If we have errors
  if (errors) {
    // we first mark the group has having errors
    formGroup.classList.add("has-error");
    // then we append all the errors
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

// Adds the specified error with the following markup
// <p class="help-block error">[message]</p>
function addError(messages, error) {
  var block = document.createElement("p");
  block.classList.add("help-block");
  block.classList.add("error");
  block.innerText = error;
  messages.appendChild(block);
}


//STUFF TO ADD NAME INTO FINAL PAGE

//APPENDING NODES / GET ELEMENT BY ID STUFF ??

var congratsMessage = document.getElementById("congratsName");
var userName = document.getElementsById("firstName"); 
var nameNode = document.createTextNode("Test"); 

congratsMessage.appendChild(nameNode); 

//append name to new text thing
//then append text thing to div for congrats message

//append username to congrats message ?? but somehow have to add name in