import { cn } from '@/lib/utils'
import { CallControls, CallParticipantsList, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

type callLayoutType='grid'|'speaker-left'|'speaker-right'

const MeetingRoom = () => {

    const [layout,setLayout]=useState<callLayoutType>('speaker-left')
    const [showParticipant,setshowParticipant]=useState(false)

    const callLayout=()=>{
        switch(layout){
            case 'grid':
                return <PaginatedGridLayout/>
            case 'speaker-left':
                return <SpeakerLayout participantsBarPosition="right"/>
            default:
                return <SpeakerLayout participantsBarPosition="left"/>


        }

    }
    return (
      <section className='relative h-screen w-full 
      overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full 
      items-center justify-center'>
        <div className='flex size-full 
        max-w-[1000px] items-center'>
        {callLayout()}
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2',{'show-block':showParticipant})}>
            <CallParticipantsList onClose={()=>setshowParticipant(false)}/>
        </div>
      </div>
      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5'>
        <CallControls/>
      </div>
    </section>
  )
}

export default MeetingRoom
