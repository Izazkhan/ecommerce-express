import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';

const conn = new IORedis();
console.log(conn);

// worker for email-jobs
const worker = new Worker('email-jobs', async (job) => {
	switch (job.name) {
	case 'forgot-password-mail-job':
		console.log('Sending email to...', job.data.to)
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