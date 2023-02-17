"use strict";

function setAppVersion() {
  const APP_VERSION = "0.1.0";
  const label_version = document.querySelector("#versionApp");

  label_version.textContent = APP_VERSION;
}

setAppVersion();