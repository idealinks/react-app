import { graphql } from 'react-apollo';
import getConfig from 'next/config';
import PrimaryNavComponent from '../components/PrimaryNav/PrimaryNav';
import { GET_PRIMARY_NAV } from '../../graphql/queries';
import {
  PrimaryNavigation,
  PrimaryNavigationVariables
} from 'types/PrimaryNavigation';

const { publicRuntimeConfig } = getConfig();

export type PrimaryNavInputProps = {
  isVisibleMobile: boolean;
  onCloseClick: () => void;
  onSecondaryNavVisibleChange: (isVisible: boolean) => void;
};

export default graphql<
  PrimaryNavInputProps,
  PrimaryNavigation,
  PrimaryNavigationVariables
>(GET_PRIMARY_NAV, {
  options: () => ({
    fetchPolicy: 'cache-first',
    variables: {
      siteAlias: publicRuntimeConfig.siteAlias
    }
  })
})(PrimaryNavComponent);
