import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const connection = new IORedis();


const myQueue = new Queue('email-jobs', { connection });

export {myQueue};