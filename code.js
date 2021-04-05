const { Observable } = rxjs;

let quakes = Observable.create((observer) => {
    window.eqfeed_callback = (response) => {
        let quakes = response.features;
        quakes.forEach((quake) => {
            observer.next(quake);
        });
    };

    loadJSONP(QUAKE_URL);
});

quakes.subscribe((quake) => {
    let coords = quake.geometry.coordinates;
    let size = quake.properties.mag * 10000;

    L.circle([coords[1], coords[0]], size).addTo(map);
})