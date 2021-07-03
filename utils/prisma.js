/*exports.__esModule = true;
const client_1 = require('@prisma/client');

const prisma = global.prisma || new client_1.PrismaClient();
if (process.env.NODE_ENV === 'development') global.prisma = prisma;
exports.default = prisma;
*/
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'stdout',
            level: 'error',
        },
        {
            emit: 'stdout',
            level: 'info',
        },
        {
            emit: 'stdout',
            level: 'warn',
        },
    ],
});

prisma.$on('query', e => {
    console.log("Query: " + e.query)
    console.log("Duration: " + e.duration + "ms")
})
export default prisma
