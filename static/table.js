var settings = {
    "url": "http://127.0.0.1:5005/alldata",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "X-API-KEY": "votre_cle_api_1"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });