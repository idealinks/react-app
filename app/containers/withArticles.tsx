import { graphql } from 'react-apollo';
import getConfig from 'next/config';
import { GET_ARTICLES } from '../../graphql/queries';
import { Articles, ArticlesVariables } from 'types/Articles';

const { publicRuntimeConfig } = getConfig();

export type ArticlesInputProps = {
  alias: string;
  count: number;
  start?: number;
  end?: number;
  title: string;
  icon?: React.ReactChild | React.ReactChildren;
  link?: { label: string; url: string };
};

export default graphql<ArticlesInputProps, Articles, ArticlesVariables>(
  GET_ARTICLES,
  {
    options: props => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        siteOptions: {
          alias: props.alias,
          location: '',
          portalid: publicRuntimeConfig.dnnPortalId,
          websiteid: publicRuntimeConfig.zuzaWebsiteId
        },
        pagination: {
          count: props.count,
          start: props.start || 1,
          end: props.end || props.count
        }
      }
    })
  }
);
