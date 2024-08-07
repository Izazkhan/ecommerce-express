import { Worker, Job } from 'bullmq';
import { Redis } from 'ioredis';
import dotenv from 'dotenv';
import jobs from '#jobs/registery.js';

dotenv.config();

const connection = {
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
	maxRetriesPerRequest: null
};

const conn = new Redis(connection);

// worker for email-jobs
const worker = new Worker('email-jobs', async (job) => {
	const handler = jobs[job.name];

	if (!handler) {
		throw new Error(`Unknown job name: ${job.name}`);
	}

	// Process Job
	await handler(job);

}, { connection: conn });

worker.on('completed', job => {
	// Do something with the return value.
	console.log('job done');
});

worker.on('failed', job => {
	// Do something with the return value.
	console.log('job failed');
});