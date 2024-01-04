import React, { useRef,useLayoutEffect, useEffect, useState } from 'react';
import {gsap,} from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Countdown() {
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  const deadline = "January, 26 , 2024";

  const formatNumber = (number) => (number < 10 ? "0" + number : number);

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();
    setDay(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHour(formatNumber(Math.floor((time / (1000 * 60 * 60)) % 24)));
    setMin(formatNumber(Math.floor((time / (1000 * 60)) % 60)));
    setSec(formatNumber(Math.floor((time / 1000) % 60)));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getTime(deadline);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const comp=useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline()
  
      tl.from(".title", {
        x:-1000,
        delay:2,
        duration:0.5
      })
    }, comp)
    return () => {
      ctx.revert()
    }
  }, [])


  return (
    
      <div className="bg-black h-screen overflow-x-hidden overflow-y-hidden" ref={comp}>
        <div className=" top-28 sm:top-32 h-screen w-screen relative ">
        <h1 className='text-white text-xl pl-20 sm:text-3xl title'>SEE YOU THERE IN</h1>

        <div className="text-white text-xl top-0 absolute pl-3 sm:text-6xl">
          <div className="sm:pl-20 flex ">
            <div className="my-20  p-2">
              <div className="font-bold ml-8 z-10">{formatNumber(day)}</div>
              <div className='text-red-400 z-10'>Days</div>
            </div>
            <div className="my-20  p-2">
              <div className="font-bold ml-10">{hour}</div>
              <div className='text-red-400'>Hours</div>
            </div>
            <div className="my-20  p-2">
              <div className="font-bold ml-3">{min}</div>
              <div className='text-red-400'>Min</div>
            </div>
            <div className="my-20  p-2">
              <div className="font-bold ml-3">{sec}</div>
              <div className='text-red-400' >Sec</div>
            </div>
          </div>
        </div>

        <img className='mt-28 absolute -right-8 sm:top-28 sm:-mt-10 sm:-right-20' src="rockHero.png" alt="" />
             
        
        <img className='absolute hidden sm:-bottom-28 sm:block w-full' src="bottomRock.png" alt="" />
       
      </div>
    </div>
    
    
  );
}

export default Countdown;