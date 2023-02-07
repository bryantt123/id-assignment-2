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
  })
  
})
})      

links.forEach(link => {
link.addEventListener("click", e => {
 e.preventDefault(); //preventing form submit
 forms.classList.toggle("show-signup");
})
})

// api-key for login information: 63e28b26478852088da67e80 
async function checkLogin(email, password) {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://idasg2-7926.restdb.io/rest/players?q={"email":"${email}"}`,
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "63e28b26478852088da67e80",
      "cache-control": "no-cache"
    }
  };

  const response = await $.ajax(settings);
  if (response.length === 0) {
    return false;
  } else if (response[0].password === password) {
    return true;
  } else {
    return false;
  }
}

document.getElementById("login-form").addEventListener("submit", async event => {
  event.preventDefault();
  const email = document.getElementById("email-address").value;
  const password = document.getElementById("password").value;
  const isValid = await checkLogin(email, password);
  if (isValid) {
    localStorage.setItem("user", JSON.stringify({ email }));
    window.location.href = "yes.html";
  } else {
    alert("Incorrect email or password");
  }
});

function savePlayer(email, password) {
  var jsondata = {
    "email": email,
    "password": password,
    "xp": 0
  };

  var settings = {
    "crossDomain": true,
    "url": "https://idasg2-7926.restdb.io/rest/players",
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "63e28b26478852088da67e80 "
    },
    "data": JSON.stringify(jsondata),
    "beforeSend": function(){
      $("#sign-up").prop("disabled", true);
      $("#sign-up-form").trigger("reset");
    }
  };
    
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}

document.getElementById('sign-up-form').addEventListener('submit', event => {
  event.preventDefault();
  const email = document.getElementById('email-address').value;
  const password = document.getElementById('password').value;
  savePlayer(email, password);
});

