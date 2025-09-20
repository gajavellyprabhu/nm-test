import Head from 'next/head';
/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>404: NotFound</title>
      </Head>
      <div style={{ padding: 10 }}>
        <h1>1 We’re sorry, but we can’t find the page that you’re looking for</h1>
        <p>
          It may no longer exist, changed location, or is temporarily unavailable. Please consider
          one of the links below
        </p>
        <a href="/">Go to the Home page</a>
      </div>
    </>
  );
};
export default NotFound;
