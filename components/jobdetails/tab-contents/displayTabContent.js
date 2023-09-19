import { Specifics, JobAbout } from '../'
import { TABS } from '../../../constants'

const ABOUT = TABS.jobs[0]
const QUALIFICATIONS = TABS.jobs[1]
const RESPONSIBILITIES = TABS.jobs[2]
console.log(ABOUT)
console.log(QUALIFICATIONS)
console.log(RESPONSIBILITIES)

const displayTabContent = ({ data }) => {
  switch (activeTab) {
    case QUALIFICATIONS:
      return (
        <Specifics
          title={QUALIFICATIONS}
          points={data[0].job_highlights?.Qualifications ?? ['N/A']}
        />
      )
    case ABOUT:
      return <JobAbout info={data[0].job_description ?? 'Empty'} />
    case RESPONSIBILITIES:
      return (
        <Specifics
          title={RESPONSIBILITIES}
          points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
        />
      )
    default:
      return null
  }
}

export default displayTabContent
