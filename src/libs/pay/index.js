import pingpp from 'pingpp-js'

export const createPayment = (charge, callback) => {
    pingpp.createPayment(charge, callback)
}
