const ID = {
  jobId: (job) => `/${job.job_id}`,
}

const PATH = {
  jobDetails: `/job-details`,
}

// dirname for routes
const directPath = (path, subLink) => {
  return path + subLink
}

const ROUTES = {
  jobDetails: (job) => directPath(PATH.jobDetails, ID.jobId(job)),
}

export default ROUTES
