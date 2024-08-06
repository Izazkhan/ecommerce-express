import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis();


const myQueue = new Queue('email-jobs', { connection });

export {myQueue};