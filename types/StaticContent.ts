/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StaticContent
// ====================================================

export interface StaticContent_static {
  __typename: "StaticContent";
  id: string | null;
  title: string | null;
  body: string | null;
}

export interface StaticContent {
  static: StaticContent_static | null;
}

export interface StaticContentVariables {
  id: string;
}
