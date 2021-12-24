(function() {
    var url = "http://127.0.0.1:5500/"

    if ('caches' in window) {
        // console.log("hello")


        // e.respondWith(
        //     caches.match(e.request).then(function(response) {
        //         console.log('[ServiceWorker] Fetch Only', e.request.url);

        //         return response
        //     })


        // );
        // console.log(caches)
        // caches.match(url).then(function(response) {
        //     console.log(response)



        //     // response.json().then(function(json) {
        //     //     json.key = key;
        //     //     json.label = label;
        //     //     app.updateForecastCard(json);
        //     // });

        // });
    }

    // var ready = ""


    // setTimeout(function() {
    //     var request = new XMLHttpRequest();
    //     request.onreadystatechange = function() {
    //         // if (request.readyState === XMLHttpRequest.DONE) {
    //         //     if (request.status === 200) {
    //         //         // var response = JSON.parse(request.response);

    //         //     }
    //         // }
    //         // console.log("Ready")
    //         // var req = new XMLHttpRequest()
    //         // request.open('GET', "http://127.0.0.1:5500/index.html");
    //         // request.send();



    //     };
    //     request.open('GET', "http://127.0.0.1:5500/");
    //     request.send();
    // }, 2000)











    if ("serviceWorker" in navigator) {

        navigator.serviceWorker.register('sw.js')
            .then(function() {
                console.log('Service Worker Registered');
            })




    }
})();