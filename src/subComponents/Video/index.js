import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ReactPlayerCustomDebes from './ReactPlayerCustomDebes';
// import ReactPlayerCustom from './ReactPlayerCustom';

// const ReactPlayerCustom = dynamic(() => import('./ReactPlayerCustomDebes'), {
//   ssr: false,
// });

export default function Video(props) {
  // const [shouldLoadPopupAfterPageLoad, setShouldLoadPopupAfterPageLoad] = useState(false);

  // useEffect(() => {
  //   const loadVideo = () => {
  //     setShouldLoadPopupAfterPageLoad(true);
  //   };
  //   // Listen for the window load event
  //   window.addEventListener('load', loadVideo);

  //   // Cleanup event listener on component unmount
  //   setTimeout(() => {
  //     loadVideo();
  //   }, 1500);
  //   return () => {
  //     window.removeEventListener('load', loadVideo);
  //   };
  // }, []);

  // return shouldLoadPopupAfterPageLoad ? <ReactPlayerCustom {...props} /> : <></>;
  return <ReactPlayerCustomDebes {...props} />;
}
