import { WikipediaResponse } from '@/types/wikipedia'
import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import Image from './image'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'

const WikipediaHover = ({ text }: { text: string }) => {
  const infoQuery = useQuery({
    queryKey: [`info-${text}`],
    queryFn: async () => {
      const response = await ky(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${text}`
      ).json<WikipediaResponse>()

      return response
    },
  })

  if (!infoQuery.data) return

  return (
    <a
      target="_blank"
      className="text-neutral-400"
      href="https://en.wikipedia.org/wiki/Mengenlehreuhr"
    >
      <HoverCard>
        <HoverCardTrigger>{text}</HoverCardTrigger>
        <HoverCardContent className="w-80 flex flex-col items-center">
          <Image
            src={infoQuery.data.thumbnail.source}
            className="rounded-lg"
            alt={infoQuery.data.title}
            width={infoQuery.data.thumbnail.width * 0.7}
            height={infoQuery.data.thumbnail.height * 0.7}
          />
          <div className="bg-neutral-900 p-2 rounded-lg m-1">
            {infoQuery.data.extract.slice(0, 250)}
            {infoQuery.data.extract
              .slice(250, 260)
              .trim()
              .concat('...')
              .split('')
              .map((s, i, arr) => (
                <span
                  key={`info-fade-${s}-${i}`}
                  style={{ opacity: (arr.length - i) / arr.length }}
                >
                  {s}
                </span>
              ))}
          </div>
        </HoverCardContent>
      </HoverCard>
    </a>
  )
}

export default WikipediaHover
