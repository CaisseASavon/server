var rabbitmq = require('sails-rabbitmq');
function GeolocationController() {
    return {
        test: function (req, res) {
            var geolocation = Geolocation.create({deviceid: 1, type: 'driver', location: [10,11,12]}).exec(function(err, geolocation) {
               console.log(geolocation);

               rabbitmq.create(geolocation, function() {
                    console.log("coucou");
               });

            } );
        }
    }
};

module.exports = GeolocationController();
