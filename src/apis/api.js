export const GOOGLE_MAPS_API_KEY = 'AlonIsAfraidToPayToMuchToGoogle';

export function loadGoogleMapsScript(apiKey) {
    const scriptId = 'google-maps';
    if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        document.head.appendChild(script);
    }
}

