export const parseTime = (stringTime) => {
    if (!stringTime) {
        return null
    }
    const date = new Date()
    date.setHours(stringTime.substring(0,2))
    date.setMinutes(stringTime.substring(2,2))
    return date
}