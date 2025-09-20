import GraphQLClientFactory from 'lib/GraphQLClientFactory';
import config from 'temp/config';
import { ApolloProvider } from '@apollo/client';

const ApolloCachingClient = (props: any) => {
  const { children } = props;
  // useEffect(() => {
  //   const ssrRawJson: any = document.getElementById('__NEXT_DATA__');
  //   setNextData(JSON.parse(ssrRawJson?.innerHTML));
  // }, []);
  // const initialGraphQLState = nextData && nextData.APOLLO_STATE ? nextData.APOLLO_STATE : null;

  // const graphQLClient = GraphQLClientFactory(config.graphQLEndpoint, false, initialGraphQLState);
  const graphQLClient = GraphQLClientFactory(config.graphQLEndpoint, false, {});

  return <ApolloProvider client={graphQLClient}>{children}</ApolloProvider>;
};

export default ApolloCachingClient;
