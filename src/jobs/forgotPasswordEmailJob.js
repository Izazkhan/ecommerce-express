import {myQueue} from '#queues/queue.js';

const forgotPasswordEmailJob = async (data) => {
	await myQueue.add('forgot-password-mail-job', data)
}

export {forgotPasswordEmailJob};