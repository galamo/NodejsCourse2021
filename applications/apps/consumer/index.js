
const amqp = require('amqplib/callback_api');
const mysql = require("mysql2/promise")


async function getCustomerByCity(city) {
    if (typeof city !== 'string') return;
    const [result] = await getConnection().execute("select * from customers where city = ?", [city])
    if (!Array.isArray(result)) return [];

    const customers = result.map(customer => {
        return {
            ...customer, role: getRoleByJobTitle(roleMapping, customer["job_title"]),
            mail: getEmailAddress(customer["first_name"], customer["last_name"], "gmail")
        }
    })
    return customers;
}

const DefaultRole = "Viewer"

const roleMapping = {
    "Purchasing Representative": "Admin",
    "Owner": "Admin",
    "Purchasing Manager": DefaultRole
}
function getRoleByJobTitle(roleMapping, jobTitle) {
    if (!jobTitle) return DefaultRole
    return roleMapping[jobTitle]
}
function getEmailAddress(first, last, emailDomain) {
    if (!first || !last || !emailDomain) return;
    return `${first}_${last}@${emailDomain}.com`;
}



amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        const queue = 'getCustomers';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.prefetch(1);
        console.log(' [x] Awaiting RPC requests');

        channel.consume(queue, async function reply(msg) {
            const city = msg.content.toString()
            console.log(`city in consumer [${city}]`);

            const result = await getCustomerByCity(city)
            console.log(result)
            channel.sendToQueue(msg.properties.replyTo,
                Buffer.from(JSON.stringify(result)), {
                correlationId: msg.properties.correlationId
            });

            channel.ack(msg);
        });
    });
});



const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'northwind'
});

function getConnection() {
    return pool;
}

