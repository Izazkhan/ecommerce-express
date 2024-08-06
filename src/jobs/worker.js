import { Worker, Job } from 'bullmq';
import { Redis } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const connection = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    maxRetriesPerRequest: null
};

const conn = new Redis(connection);

// worker for email-jobs
const worker = new Worker('email-jobs', async (job) => {
	switch (job.name) {
	case 'forgot-password-mail-job':
		console.log('Sending email to...', job.data)
		break;
	default:
		throw new Error("Unknown job name " + job.name);
	}
}, {connection: conn});

worker.on('completed', job => {
  // Do something with the return value.
	console.log('job done');
});

worker.on('failed', job => {
  // Do something with the return value.
	console.log('job failed');
});