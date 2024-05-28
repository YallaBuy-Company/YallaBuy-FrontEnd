export function loadGoogleMapsScript(apiKey, callback) {
    const scriptId = 'google-maps';
    if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.onload = () => {
            console.log('Google Maps script loaded.');
            callback();
        };
        document.head.appendChild(script);
    } else {
        console.log('Google Maps script already present.');
        callback();
    }
}
