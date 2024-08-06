import {myQueue} from '#queues/queue.js';

const forgotPasswordEmailJob = async (data) => {
	await myQueue.add('forgot-password-mail-job', data, {
		attempts: 3,
		backoff: 5000 // retry after 5 seconds
	})
}

export {forgotPasswordEmailJob};