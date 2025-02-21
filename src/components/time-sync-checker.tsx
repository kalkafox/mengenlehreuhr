import { TimeResponse } from '@/types/time-sync'
import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { DateTime, Duration } from 'luxon'
import { motion } from 'motion/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Skeleton } from './ui/skeleton'

const TimeSyncChecker = () => {
  const { t } = useTranslation()
  const [localTime, setLocalTime] = useState<DateTime | null>(null)
  const [serverTime, setServerTime] = useState<DateTime | null>(null)
  const [timeDifference, setTimeDifference] = useState<Duration | null>(null)

  const timeQuery = useQuery({
    queryKey: ['time'],
    queryFn: async () => {
      try {
        const response = await ky
          .get('https://worldtimeapi.org/api/ip')
          .json<TimeResponse>() // Using ky to make the request
        const localDateTime = DateTime.now()
        const serverDateTime = DateTime.fromISO(response.utc_datetime)
        const difference = serverDateTime.diff(localDateTime)

        setLocalTime(localDateTime)
        setServerTime(serverDateTime)

        setTimeDifference(difference)

        return response
      } catch (error) {
        console.error('Error fetching server time:', error)
      }
    },
  })

  return (
    <div className='max-w-xl mx-auto mt-4 p-4 bg-neutral-900 rounded-lg shadow-lg font-["Poppins"]'>
      {timeQuery.data ? (
        <motion.div style={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="mb-4">
            <div className="flex justify-center gap-2 text-gray-300">
              <span>{t('timesync.localtime')}:</span>
              <span className="font-bold">
                {localTime?.toFormat('HH:mm:ss.S')}
              </span>
            </div>
            <div className="flex justify-center gap-2 text-gray-300">
              <span>{t('timesync.servertime')}:</span>
              <span className="font-bold">
                {serverTime?.toFormat('HH:mm:ss.S')}
              </span>
            </div>
          </div>
          {timeDifference !== null && (
            <div
              className={`text-center font-semibold ${
                timeDifference.as('seconds') === 0
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {timeDifference.as('seconds') === 0
                ? 'Times are perfectly in sync!'
                : `${t('timesync.timedifference')}: ${Math.abs(
                    timeDifference.as('seconds')
                  )}ms`}
            </div>
          )}
        </motion.div>
      ) : (
        <div className="flex justify-center items-center gap-2 flex-col">
          <Skeleton className="w-96 h-5 rounded-full" />
          <Skeleton className="w-96 h-5 rounded-full" />
          <Skeleton className="w-72 h-5 my-4 rounded-full" />
        </div>
      )}
    </div>
  )
}

export default TimeSyncChecker
