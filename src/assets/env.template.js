(function(window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["springboot_url"] = "${SPRINGBOOT_URL}";
  window["env"]["fastapi_url"] = "${FASTAPI_URL}";
})(this);
