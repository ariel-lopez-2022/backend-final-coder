

const fecha = () =>{
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let horas =date.getHours()
    let minutos = date.getMinutes()
    let fecha = (`${day}/${month}/${year} ${horas}:${minutos}`)
    return fecha
}

module.exports = fecha()