const get_date_as_string_short = (d) => {
    let year = d.getUTCFullYear()
    let month = d.getUTCMonth()
    let day = d.getDate()

    month = `${(month + 1 < 10)? '0' : ''}${month + 1}`
    day = `${(day < 10)? '0' : ''}${day}`
    
    return `${year}-${month}-${day}`
}
const convert_time_string_fromInt = (num) => {
    let hours = (num < 60) ? 0 : parseInt(num / 100)
    let minutes = (num < 60) ? num : parseFloat(num - (hours * 100))
    return `${(hours < 10) ? '0' + hours : hours}:${(minutes < 10) ? '0' + minutes : minutes}`
}
const get_timeInt_from_datetime = (d) => {
    let hour = d.getHours() * 100
    let minutes = d.getMinutes()

    return hour + minutes
}

exports.get_date_as_string_short = get_date_as_string_short
exports.convert_time_string_fromInt = convert_time_string_fromInt
exports.get_timeInt_from_datetime = get_timeInt_from_datetime