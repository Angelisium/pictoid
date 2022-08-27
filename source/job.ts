
import process from 'process';
import Queue from 'bee-queue';
import jobsDict from "./jobs";

type JobNames = keyof typeof jobsDict;
type JobArgs<T extends JobNames> = Parameters<typeof jobsDict[T]>;
type JobResults<T extends JobNames> = Awaited<ReturnType<typeof jobsDict[T]>>;

const queue = new Queue('jobs', {
	redis: {
		host: process.env.REDIS_HOST || '127.0.0.1',
		port: process.env.REDIS_PORT || 6379,
	},
});

queue.on('ready', () => {
	console.log('Job queue now ready');
});

queue.on('failed', (job, err) => {
	console.log(`Job ${job.id} failed with error: ${err.message}`);
});

queue.on('succeeded', (job, result) => {
	console.log(`Job ${job.id} succeeded with result: ${result}`);
});

queue.process(<T extends JobNames>(job: Queue.Job<{ name: T, args: JobArgs<T> }>, done: Queue.DoneCallback<JobResults<T>>) => {
	console.log(`Processing job ${job.data.name}`);
	// @ts-expect-error Why ???
	const promise: Promise<JobResults<T>> = jobsDict[job.data.name](...job.data.args);
	promise.then(res => done(null, res)).catch(err => done(err));
});

// Use this function to add a job to the queue:
// runJob(name, arg1, arg2);
// Fully type safe ;)
export async function runJob<T extends JobNames>(jobName: T, ...args: JobArgs<T>): Promise<JobResults<T>> {
	return new Promise<JobResults<T>>((resolve, reject) => {
		const job = queue.createJob({ name: jobName, args: args });
		job.save();
		job.on('succeeded', (result: JobResults<T>) => {
			resolve(result);
		});
		job.on('failed', (err) => {
			reject(err);
		});
	});
}

export default queue;