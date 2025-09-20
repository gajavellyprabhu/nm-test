// import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
// import NotFound from 'src/NotFound';
import Layout from 'src/Layout';
import {
  // RenderingType,
  SitecoreContext,
  ComponentPropsContext,
  // EditingComponentPlaceholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
// import { handleEditorFastRefresh } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import { componentBuilder } from 'temp/componentBuilder';
// import dynamic from 'next/dynamic';

// const Layout = dynamic(() => import('../Layout'), {
//   // ssr: false,
// });

const SitecorePage = ({
  // notFound,
  componentProps,
  layoutData,
  headLinks,
}: SitecorePageProps): JSX.Element => {
  // useEffect(() => {
  //   // Since Sitecore editors do not support Fast Refresh, need to refresh editor chromes after Fast Refresh finished
  //   handleEditorFastRefresh();
  // }, []);

  // if (notFound || !layoutData.sitecore.route) {
  //   // Shouldn't hit this (as long as 'notFound' is being returned below), but just to be safe
  //   return <NotFound />;
  // }

  const isEditing = layoutData.sitecore.context.pageEditing;
  // const isComponentRendering =
  //   layoutData.sitecore.context.renderingType === RenderingType.Component;

  return (
    <ComponentPropsContext value={componentProps}>
      <SitecoreContext
        componentFactory={componentBuilder.getComponentFactory({ isEditing })}
        layoutData={layoutData}
      >
        {/*
          Sitecore Pages supports component rendering to avoid refreshing the entire page during component editing.
          If you are using Experience Editor only, this logic can be removed, Layout can be left.
        */}
        {/* {isComponentRendering ? (
          <EditingComponentPlaceholder rendering={layoutData.sitecore.route} />
        ) : ( */}
        <Layout layoutData={layoutData} headLinks={headLinks} />
        {/* )} */}
      </SitecoreContext>
    </ComponentPropsContext>
  );
};

// This function gets called at request time on server-side.
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   let props = await sitecorePagePropsFactory.create(context);

//   if (!props.layoutData?.sitecore?.route) {
//     const path = '/_404';
//     props = await sitecorePagePropsFactory.create({
//       ...context,
//       params: { ...context.params, path: path },
//     });
//   }
//   return {
//     props,
//     notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
//   };
// };
export const getServerSideProps: GetServerSideProps = async (context) => {
  // const userAgent: any = context.req.headers['user-agent'];
  const req: any = context.req;

  let userAgent;
  if (!!req) {
    // if you are on the server and you get a 'req' property from your context
    userAgent = context.req.headers['user-agent']; // get the user-agent from the headers
  } else {
    userAgent = navigator.userAgent; // if you are on the client you can access the navigator from the window object
  }
  // console.log({ userAgent });

  const isDesktopLayout = Boolean(
    !userAgent?.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
  );
  // console.log({ isMobile });

  const props = await sitecorePagePropsFactory.create(context);
  // console.log('props', props);
  return {
    props: {
      ...props,
      layoutData: {
        ...props.layoutData,
        sitecore: {
          ...props.layoutData.sitecore,
          context: { ...props.layoutData.sitecore.context, isDesktopLayout },
        },
      },
    },
    notFound: props.notFound, // Returns custom 404 page with a status code of 404 when true
  };
};
export default SitecorePage;
