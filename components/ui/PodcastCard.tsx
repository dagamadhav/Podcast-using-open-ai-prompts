import React from 'react'
import Image from 'next/image'
import { PodcastCardProps } from '@/types'
import { useRouter } from 'next/navigation'

const PodcastCard = ({
    imgUrl,title,description,podcastId
}:PodcastCardProps) => {

    const router = useRouter();
    const handleViews = () =>{
        router.push(`/podcast/${podcastId}`);
    }

  return (
    <div className='cursor-pointer' onClick={handleViews}>
        <figure className='flex flex-col gap-2'>
            <Image src={imgUrl} width={400} height={400} className='aspect-sqaure h-fit w-full rounded-xl 2xl:size-[200]' />
            <div className='felx flex-col'>
                <h1 className='text-16 truncate fonr-bold text-white-1'>{title}</h1>
                <h3 className='text-12 truncate font-normal capitalize text-white-1'>{description}</h3>
            </div>
        </figure>
      
    </div>
  )
}

export default PodcastCard
