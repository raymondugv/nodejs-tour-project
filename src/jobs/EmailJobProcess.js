import sendEmail from "@controllers/sendEmail";

async function emailProcess(job, done) {
	try {
		// sendEmail(to, subject, template, fields);
		await sendEmail(
			job.data.to,
			job.data.subject,
			job.data.template,
			job.data.fields
		);

		done();
	} catch (err) {
		done(new Error(err.message));
	}
}

export default emailProcess;
