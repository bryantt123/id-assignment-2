const forms = document.querySelector(".forms"),
pwShowHide = document.querySelectorAll(".eye-icon"),
links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
eyeIcon.addEventListener("click", () => {
  let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
  
  pwFields.forEach(password => {
      if(password.type === "password"){
          password.type = "text";
          eyeIcon.classList.replace("bx-hide", "bx-show");
          return;
      }
      password.type = "password";
      eyeIcon.classList.replace("bx-show", "bx-hide");
  });
  
});
});      


links.forEach(link => {
  link.addEventListener("click", e => {
     e.preventDefault(); //preventing form submit
     forms.classList.toggle("show-signup");
  })
})


// api-key for login information: 63e63782478852088da68022 

document.getElementById("login-form").addEventListener("submit", async event => {
  event.preventDefault();
  const email = document.getElementById("email-address").value;
  const password = document.getElementById("password").value;
  const loginResponse = await checkLogin(email, password);
  if (loginResponse.isValid) {
    localStorage.setItem("email", JSON.stringify({ email }));
    localStorage.setItem("username", JSON.stringify(loginResponse.username));
    window.location.href = "main.html";
  } else {
    alert("Incorrect email or password");
  }
});

document.getElementById('sign-up-form').addEventListener('submit', event => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password1').value;
  savePlayer(email, username, password);
  alert("Successfully signed up!");
});

async function checkLogin(email, password) {
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://idasg2-e717.restdb.io/rest/players",    
  "method": "GET",
  "headers": {
  "content-type": "application/json",
  "x-apikey": "63e63782478852088da68022",
  "cache-control": "no-cache"
  }
  };
  
  const response = await $.ajax(settings);
  console.log(response);
  if (response.length === 0) {
  return false;
  } else if (response[0].password === password) {

  return { isValid: true, username: response[0].username, response };
  } else {
  return false;
  }
}

function savePlayer(email, username, password) {
  var jsondata = {
    "email": email,
    "username": username,
    "password": password,
  };

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://idasg2-e717.restdb.io/rest/players",
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "63e63782478852088da68022",
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(jsondata),
    "beforeSend": function(){
      $("#sign-up-form").trigger("reset");
    }
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });

  var jsondata2 = {"level": 1,"xpPoints": 0, "coins": 100, "username":username};
  var settings2 = {
    "async": true,
    "crossDomain": true,
    "url": "https://idasg2-e717.restdb.io/rest/stats",
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "63e63782478852088da68022",
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(jsondata2)
  };

  $.ajax(settings2).done(function (response) {
    console.log(response);
  });
}