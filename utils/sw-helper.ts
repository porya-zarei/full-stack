export const registerServiceWorker = () => {
    console.log("in activate sw", "serviceWorker" in navigator);
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker.register("/sw.js", {scope: "/"}).then(
                function (registration) {
                    console.log(
                        "Service Worker registration successful with scope: ",
                        registration.scope,
                    );
                },
                function (err) {
                    console.log("Service Worker registration failed: ", err);
                },
            );
        });
    }
};
