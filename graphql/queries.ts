import gql from 'graphql-tag';

export const GET_TOPHAT = gql`
  query PrimaryHeader {
    tophat {
      label
      navigationUrl
      enabled
    }
  }
`;

export const GET_PRIMARY_NAV = gql`
  query PrimaryNavigation($siteAlias: String!) {
    navigation(siteAlias: $siteAlias) {
      label
      children {
        label
        navigationUrl
        enabled
      }
    }
  }
`;

export const GET_PRIMARY_FOOTER = gql`
  query PrimaryFooter($siteOptions: SiteOptions!) {
    footer(options: $siteOptions) {
      label
      children {
        label
        navigationUrl
        enabled
        openNewWindow
        noFollow
      }
    }
  }
`;

export const GET_STATIC_CONTENT = gql`
  query StaticContent($id: String!) {
    static(id: $id) {
      id
      title
      body
    }
  }
`;

export const GET_ARTICLES = gql`
  query Articles($siteOptions: SiteOptions!, $pagination: PaginationOptions!) {
    articles(options: $siteOptions, pagination: $pagination) {
      assetId
      title
      description
      imageAlt
      category
      displayPublishDate
      navigationUrl
      openNewWindow
      thumbnails {
        large
        small
      }
    }
  }
`;

export const GET_WEATHER = gql`
  query Weather($location: String!) {
    weather(location: $location) {
      obs {
        temperature
        icon_ltr
        date
      }
    }
  }
`;

export const GET_PUBLICATION = gql`
  query Publication($userId: String) {
    publication(userId: $userId) {
      property
      publication
      tag
      isPilotZone
    }
  }
`;
