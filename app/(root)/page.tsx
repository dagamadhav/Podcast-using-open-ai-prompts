"use client";
import { Button } from '@/components/ui/button'
import { podcastData } from '@/constants'
import { Podcast } from 'lucide-react'
import React from 'react'
import PodcastCard from '@/components/ui/PodcastCard'

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";


const Home = () => {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcast);
  return (
    <div className='mt-9 flex flex-col gap-9'>
      <section className='flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-white-1 mb-8 '>Trending Podcast</h1>
        
        {/* FOR SAMPLE CONST DATA */}
        <div className="podcast_grid gap-10">
        {podcastData.map(({id,title,description,imgURL})=>(
          <PodcastCard 
            key={id}
            imgUrl ={imgURL}
            title ={title}
            description={description}
            podcastId={id}
          />
        ))}
        </div>

        {/* FOR REAL GENERATED DATA  */}

        {/* <div className="podcast_grid gap-10">
        {trendingPodcasts?.map(({_id,podcastTitle,podcastDescription,imageUrl})=>(
          <PodcastCard 
            key={_id}
            // imageUrl ={imageUrl}
            title ={podcastTitle}
            description={podcastDescription}
            // podcastId={_id}
          />
        ))}
        </div> */}
        
      </section>
      
    </div>
  )
}

export default Home
