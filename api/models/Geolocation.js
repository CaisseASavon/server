// api/models/Geolocation
module.exports = {
    connection:  [ 'rabbitCluster', 'mongoServer'],
    routingKey: [ 'geolocation' ],
    attributes: {
        deviceid: {
            type: 'integer'
        },
        type:{
            type: 'string',
            enum: ['driver','technician'],
            defaultsTo: 'driver'
        },
        location:{
            type:'array'
        }
    }
}
