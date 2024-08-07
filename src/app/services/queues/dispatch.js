import { myQueue } from "#services/queues/queue.js"

export const dispatch = async (jobName, data) => {
    await myQueue.add(jobName, data);
}