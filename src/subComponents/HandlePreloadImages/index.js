import React from 'react';

const HandlePreloadImages = ({ externalSrcs, icons }) => {
  // const { sitecoreContext } = useSitecoreContext();
  // let images = [];
  // if (!!icons) {
  //   icons.forEach((icon) => {
  //     let staticSrc = sitecoreIconsMap.get(icon);
  //     if (!!staticSrc) {
  //       staticSrc = staticSrc.replace('{site}', sitecoreContext?.site?.name); // SNB-WEB
  //       staticSrc = staticSrc.replace('{theme}', sitecoreContext?.theme);
  //       return images.push(staticSrc);
  //     }
  //   });
  // }
  // if (!!externalSrcs) {
  //   externalSrcs.forEach((externalSrc) => {
  //     const regexSubstringLink = /\/-\/.+.svg/gi;
  //     const extractedExternalSrc = externalSrc?.value?.src ?? externalSrc?.src;
  //     const output = renderSVG
  //       ? regexSubstringLink.exec(extractedExternalSrc)?.[0]
  //       : extractedExternalSrc;
  //     images.push(output);
  //   });
  // }
  // useEffect(() => {
  //   images.forEach((picture) => {
  //     const img = new Image();
  //     img.src = picture;
  //   });
  // }, []);
  return <></>;
};
export default HandlePreloadImages;
// export default useSitecoreContext()(SitecoreIcon);
