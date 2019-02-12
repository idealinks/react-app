/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Publication
// ====================================================

export interface Publication_publication {
  __typename: "Publication";
  property: string | null;
  publication: string | null;
  tag: string | null;
  isPilotZone: boolean | null;
}

export interface Publication {
  publication: Publication_publication | null;
}

export interface PublicationVariables {
  userId?: string | null;
}
