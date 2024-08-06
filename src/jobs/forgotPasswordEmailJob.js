import {myQueue} from '#queues/queue.js';

const forgotPasswordEmailJob = async (user) => {
	await myQueue.add('forgot-password-mail-job', user)
}

export {forgotPasswordEmailJob};