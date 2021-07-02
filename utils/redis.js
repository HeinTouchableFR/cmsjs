const Redis = require('ioredis');

const redis = new Redis('redis://:40e0f41cc3344026891f1ae47812559c@eu1-expert-cheetah-32309.upstash.io:32309');

export default redis;
