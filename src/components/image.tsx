import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { Skeleton } from './ui/skeleton'

const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const imageQuery = useQuery({
    queryKey: ['image'],
    queryFn: async () => {
      const res = await ky(props.src!, {})
      const blob = await res.blob()

      return URL.createObjectURL(blob)
    },
  })

  if (imageQuery.isFetching) {
    return <Skeleton style={{ width: props.width, height: props.height }} />
  }

  return <img alt={props.alt} src={imageQuery.data} {...props} />
}

export default Image
