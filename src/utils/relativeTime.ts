import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/es'

dayjs.extend(relativeTime)
dayjs.locale('es')

const TimeSinceDate = (date: Date) => {
  return dayjs().from(dayjs(date).locale('es').format(), true)
}

export default TimeSinceDate
