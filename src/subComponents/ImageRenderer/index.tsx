// import dynamic from 'next/dynamic';
import { FC } from 'react';
import ImageRendererComponent, { ImageRendererComponentProps } from './ImageRendererComponent';

// const ImageRendererComponent = dynamic(() => import('./ImageRendererComponent'), {
//   ssr: false,
//   // loading: () => <>Loading...</>,
// });

const ImageRenderer: FC<ImageRendererComponentProps> = (props) => {
  return <ImageRendererComponent {...props} />;
};
export default ImageRenderer;
