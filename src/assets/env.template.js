(function(window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["springboot_url"] = "http://${SPRINGBOOT_URL}:8080";
  window["env"]["fastapi_url"] = "http://${FASTAPI_URL}:8000";
})(this);
