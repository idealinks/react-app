/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PrimaryNavigation
// ====================================================

export interface PrimaryNavigation_navigation_children {
  __typename: "SecondaryNavItem";
  label: string | null;
  navigationUrl: string | null;
  enabled: boolean | null;
}

export interface PrimaryNavigation_navigation {
  __typename: "PrimaryNavItem";
  label: string | null;
  children: (PrimaryNavigation_navigation_children | null)[] | null;
}

export interface PrimaryNavigation {
  navigation: (PrimaryNavigation_navigation | null)[] | null;
}

export interface PrimaryNavigationVariables {
  siteAlias: string;
}
