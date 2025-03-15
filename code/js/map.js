function initMap() {
    const styles = {
        default: [
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#d3d3d3"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "color": "#808080"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#b3b3b3"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "weight": 1.8
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#d7d7d7"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ebebeb"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#a7a7a7"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#efefef"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#696969"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#737373"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#d6d6d6"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {},
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            }
        ]

    };
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 46.890493957105264, lng: 8.387944227317798 },
        zoom: 11,
        mapTypeControl: false,
        streetViewControl: false
    });

    map.setOptions({ styles: styles['default'] });

    const locations = [
        { lat: 46.96304, lng: 8.385601 },
        { lat: 46.908607, lng: 8.252112 },
        { lat: 46.859988, lng: 8.647938 }
    ]; // Static locations

    const icons = [
        {
            url: 'https://cdn.prod.website-files.com/66e05c1ce7b07d2a655b633e/67d56e4539b868e7cafb4093_production-map-marker.svg', // Replace with the URL of your first SVG icon
            scaledSize: new google.maps.Size(26, 40) // This can be adjusted depending on the size of your icon
        },
        {
            url: 'https://cdn.prod.website-files.com/66e05c1ce7b07d2a655b633e/67d56e459a3768e0b8d2d0cd_map-marker.svg', // Replace with the URL of your second SVG icon
            scaledSize: new google.maps.Size(26, 40) // This can be adjusted depending on the size of your icon
        },
        {
            url: 'https://cdn.prod.website-files.com/66e05c1ce7b07d2a655b633e/67d56e459a3768e0b8d2d0cd_map-marker.svg', // Replace with the URL of your third SVG icon
            scaledSize: new google.maps.Size(26, 40) // This can be adjusted depending on the size of your icon
        }
    ];

    for (let i = 0; i < locations.length; i++) {
        const marker = new google.maps.Marker({
            position: locations[i],
            map: map,
            icon: icons[i] // Use the corresponding icon for each location
        });

        marker.addListener("click", () => {
            const url = `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${locations[i].lat},${locations[i].lng}`;
            window.open(url, '_blank');
        });
    }
}

$(document).ready(function () {
    initMap();
});
