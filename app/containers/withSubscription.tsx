import { graphql } from 'react-apollo';
import { GET_PUBLICATION } from '../../graphql/queries';
import { Publication, PublicationVariables } from 'types/Publication';

export type PublicationInputPropsType = {
  userId: string;
  isVisible?: boolean;
};

export default graphql<
  PublicationInputPropsType,
  Publication,
  PublicationVariables
>(GET_PUBLICATION, {
  options: props => ({
    fetchPolicy: 'cache-first',
    variables: {
      userId: props.userId
    }
  })
});
