import { graphql } from 'react-apollo';
import getConfig from 'next/config';
import PrimaryFooterComponent from '../components/PrimaryFooter/PrimaryFooter';
import { GET_PRIMARY_FOOTER } from '../../graphql/queries';
import { PrimaryFooterVariables, PrimaryFooter } from 'types/PrimaryFooter';

const { publicRuntimeConfig } = getConfig();

export default graphql<{}, PrimaryFooter, PrimaryFooterVariables>(
  GET_PRIMARY_FOOTER,
  {
    options: () => ({
      fetchPolicy: 'cache-first',
      variables: {
        siteOptions: {
          alias: publicRuntimeConfig.siteAlias,
          location: publicRuntimeConfig.majorLocationAlias,
          portalid: publicRuntimeConfig.dnnPortalId,
          websiteid: publicRuntimeConfig.zuzaWebsiteId
        }
      }
    })
  }
)(PrimaryFooterComponent);
