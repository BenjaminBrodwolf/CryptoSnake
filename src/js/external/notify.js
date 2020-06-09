const fireNotify = (message, color = "#ff5417") => {
    const notify = document.getElementById("notify");
    notify.style.backgroundColor = color;
    
    if (!notify) {
        console.error("Es wurde kein Notifyer auf der View gesetzt!");
        return;
    }

    if (notify.classList.contains("show")) {
        notify.classList.remove("show");
        notify.style.webkitAnimation = 'none';
        setTimeout(function() {
            notify.style.webkitAnimation = '';
        }, 140);
    }

    notify.innerText = message;
    notify.className = "show";
    notify.addEventListener("animationend", () => notify.classList.remove("show"));
};