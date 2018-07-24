export function getDistanceLocations(fromLocation, toLocation) {
    const R = 6371
    const dLat = deg2rad(toLocation.lat-fromLocation.lat)
    const dLng = deg2rad(toLocation.lng-fromLocation.lng)
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(fromLocation.lat)) * Math.cos(deg2rad(toLocation.lat)) *
      Math.sin(dLng/2) * Math.sin(dLng/2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c
}

export const formatShortAddress = (city, street) => {
    if (city && street) {
        return `${street}, ${city}`
    }
    return city
}

export const getBounds = (locations) => {
    const north = Math.max.apply(Math, locations.map(function (l) {
        return l.latitude
    }))
    const south = Math.min.apply(Math, locations.map(function (l) {
        return l.latitude;
    }))
    const west = Math.min.apply(Math, locations.map(function (l) {
        return l.longitude;
    }))
    const east = Math.max.apply(Math, locations.map(function (l) {
        return l.longitude;
    }))
    return {
        nw: {
            lat: north,
            lng: west,
        },
        se: {
            lat: south,
            lng: east,
        }
    }
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}