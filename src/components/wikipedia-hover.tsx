import { useQuery } from '@tanstack/react-query'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import ky from 'ky'
import { WikipediaResponse } from '@/types/wikipedia'

const WikipediaHover = ({ text }: { text: string }) => {
  const infoQuery = useQuery({
    queryKey: ['info'],
    queryFn: async () => {
      const response = await ky(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${text}`,
      ).json<WikipediaResponse>()

      return response
    },
  })

  if (!infoQuery.data) return

  return (
    <HoverCard>
      <HoverCardTrigger>{text}</HoverCardTrigger>
      <HoverCardContent>
        <img
          src={infoQuery.data.originalimage.source}
          className='rounded-lg'
          alt={infoQuery.data.title}
        />
        {infoQuery.data.extract.slice(0, 200)}...
      </HoverCardContent>
    </HoverCard>
  )
}

export default WikipediaHover
