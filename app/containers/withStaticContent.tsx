import { graphql } from 'react-apollo';
import { GET_STATIC_CONTENT } from '../../graphql/queries';
import { StaticContent, StaticContentVariables } from 'types/StaticContent';

type InputProps = {
  id: string;
};

export default graphql<InputProps, StaticContent, StaticContentVariables>(
  GET_STATIC_CONTENT,
  {
    options: props => ({
      fetchPolicy: 'cache-first',
      variables: {
        id: props.id
      }
    })
  }
);
