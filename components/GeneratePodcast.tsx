import { GeneratePodcastProps } from '@/types'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/components/ui/use-toast"


import {useUploadFiles} from '@xixixao/uploadstuff/react';

const useGeneratePodcast = ({setAudio,voiceType,voicePrompt,setAudioStorageId} : GeneratePodcastProps) =>{
  const [isGenerating,setIsGenerating] = useState(false);
  const {toast} = useToast() 

  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const{startUpload} = useUploadFiles(generateUploadUrl)
  
  const  getPodcastAudio = useAction(api.openai.generateAudioAction)

  const getAudioUrl = useMutation(api.podcasts.getUrl)

  const generatePodcast = async()=>{
    setIsGenerating(true);
    setAudio('');

    if(!voicePrompt){
      toast({
        title: "Please provide voice type",
      })
      return setIsGenerating(false);
    }

    try{
      const response = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt
      })
      const blob = new Blob([response],{type:'audio/mpeg'});
      const fileName = `podcast-${uuidv4()}.mp3`
      const file = new File([blob],fileName,{type:'audio/mpeg'});

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId);
      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      setIsGenerating(false);
      toast({
        title: "Generated Successfully",
      })
    }

   
    catch(error){
      console.log('error',error);
      toast({
        title: "Error creating podcast",
        variant:'destructive'
      })
      setIsGenerating(false)
    }

  }

  return{
    isGenerating,
    generatePodcast
  }
}

const GeneratePodcast = (props:GeneratePodcastProps)=> {
  const {isGenerating,generatePodcast} = useGeneratePodcast(props)
  return (
    <div>
      <div className='flex flex-col  gap-2.5'>
        <Label className='text-16 font-bold text-white-1'>
          AI Prompt to generate Podcast
        </Label>
        <Textarea 
        className='input-classs text-20 mt-2 font-light bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1'
        rows={5}
        placeholder='Provide text for Podcast' 
        value={props.voicePrompt}
        onChange={(e)=> props.setVoicePrompt(e.target.value)}/>
      </div>
      <div className='mt-5 w-full max-w-[200px]'>
      <Button type="submit" className="text-16  bg-orange-1 py-4 font-bold text-white-1 " onClick={generatePodcast}>
       {isGenerating ? (
         <>
         <Loader size={20} className="animate-spin ml-2" />
         Generating
          </>
        ) :(
          'Generate Voice'
        )}
            </Button>
      </div>
      {props.audio && (
        <audio
          controls
          src={props.audio}
          className="mt-5"
          onLoadedMetadata={(e)=>props.setAudioDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  )
}

export default GeneratePodcast
