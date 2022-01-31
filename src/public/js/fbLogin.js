
let btn = document.getElementById("facebook-login");
import config from "./envConfig.js"

btn.addEventListener("click", () => {
    location = config.NGROK_NO_CALLBACK
});