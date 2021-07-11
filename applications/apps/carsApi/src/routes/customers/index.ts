import express from "express";
import { addEntryPoint } from "../../infra"
import { handler, customerCityHandler } from "./handlers";
const customersRouter = express.Router();
var amqp = require('amqplib/callback_api');


function handlerRmq(req, res, next) {



    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            channel.assertQueue('', {
                exclusive: true
            }, function (error2, q) {
                if (error2) {
                    throw error2;
                }
                var correlationId = generateUuid();

                const msg = req.query.city
                console.log(' [x] Requesting the operation(%d)', msg);

                channel.consume(q.queue, function (msg) {
                    if (msg.properties.correlationId == correlationId) {
                        console.log((msg.content.toString()))
                        console.log(' [.] Got In Producer ');
                        const bufferedPayload = Buffer.from(JSON.stringify(msg.content));
                        console.log(bufferedPayload, Buffer.from(msg.content, "base64"))
                        console.log(' [.] Got In Producer ');
                        res.json({ result: JSON.parse(msg.content) })
                    }
                }, {
                    noAck: true
                });

                channel.sendToQueue('getCustomers',
                    Buffer.from(msg.toString()), {
                    correlationId: correlationId,
                    replyTo: q.queue
                });
            });
        });
    });

    function generateUuid() {
        return Math.random().toString() +
            Math.random().toString() +
            Math.random().toString();
    }




}


const entries = [

    {
        name: "carsEntry",
        path: "/:city",
        methodType: "get",
        callbacks: [customValidator, customerCityHandler]
    },
    {
        name: "carsEntry",
        path: "/rmq/producer", //?city=Seattle
        methodType: "get",
        callbacks: [handlerRmq]
    }

]
function customValidator(req, res, next) {
    const { city } = req.params;
    if (city.length > 20) return next({ ...new Error(), isBadReuqest: true })
    return next();
}
export type IEntry = typeof entries[0];

function init() {
    entries.forEach((entry: IEntry) => {
        addEntryPoint(customersRouter, entry)
    });
}
init();



export { customersRouter }
// export default carsRouter;