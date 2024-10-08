'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Homecard from './homecard'
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/hooks/use-toast"

const MeetingTypelist = () => {
    const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);
    const router=useRouter();
    const {user}=useUser();
    const { toast } = useToast()

    const client=useStreamVideoClient();
    const [values, setvalues] = useState({
      dateTime:new Date(),
      description:"",
      link:""
    });
    const[callDetails,setcallDetails]=useState<Call>()
    const createMeeting=async ()=>{
      if(!client||!user) return;
      try{
        if(!values.dateTime){
          toast({
            title: "Please select date and time"
          })
          return;
        }
        const id=crypto.randomUUID()
        const call=client.call('default',id)
        if(!call) throw new Error('Failed to create call')

          const startsat=values.dateTime.toISOString()||new Date(Date.now()).toISOString();
          const description=values.description||'Instant Meeting'
          await call.getOrCreate({
            data:{
              starts_at:startsat,
              custom:{
                description

              }
              
            }
          })
          setcallDetails(call)
          if(!values.description){
            router.push(`/meeting/${call.id}`)
          }
          toast({
            title: "Meeting Created"
          })
      }catch (error){
        toast({
          title: "Failed to create meeting"
        })
      }

    }
  return (

    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 pt-5'>
        <Homecard className='bg-orange-1'
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <Homecard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <Homecard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <Homecard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push('/recordings')}
      />

      <MeetingModal isOpen={meetingState === 'isInstantMeeting'}
      onClose={() => setMeetingState(undefined)}
      title="Start an instant meeting" className="text-center"
      buttonText="Start Meeting" handleClick={createMeeting} />
     
    </section>
  )
}

export default MeetingTypelist
