import MeetingTypelist from '@/components/MeetingTypelist';
import React from 'react'

const Home = () => {
  const currentDate = new Date();
  const customDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long', // e.g., "Tuesday"
    year: 'numeric',
    month: 'long', // e.g., "September"
    day: 'numeric',
  });
  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // This ensures that the time is displayed in 12-hour format with AM/PM
  });
  return (
    <section className='flex size-full flex-col gap 10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
       <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
        <h2 className='glassmorphism max-w-[270px]
        rounded py-2 text-center text-base font-normal'>Upcoming Meeting at:12:30pm</h2>
        <div className='flex flex-col gap-2'>
          <h1 className='text-4xl font-extrabold lg:text-7xl'>
            {formattedTime}</h1>
            <p className='text-lg font-medium text-sky-1'>{customDate}</p></div>  
        </div>
  
        </div>
        <MeetingTypelist/>
         
    </section>
  )
}

export default Home