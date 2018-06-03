export default function getDistanceLocations(fromLocation, toLocation) {
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

export const getCenterLocations = (locations) => {
    const center = locations.reduce((firstValue, secondValue) => {
        return {
            latitude: (firstValue.latitude + secondValue.latitude) ,/// locations.length,
            longitude: (firstValue.longitude + secondValue.longitude) ,/// locations.length,
        }
    })

    return { lat: center.latitude / locations.length, lng: center.longitude / locations.length }
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}