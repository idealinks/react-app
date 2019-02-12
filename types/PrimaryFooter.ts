/* tslint:disable */
// This file was automatically generated and should not be edited.

import { SiteOptions } from "./globalTypes";

// ====================================================
// GraphQL query operation: PrimaryFooter
// ====================================================

export interface PrimaryFooter_footer_children {
  __typename: "SecondaryNavItem";
  label: string | null;
  navigationUrl: string | null;
  enabled: boolean | null;
  openNewWindow: boolean | null;
  noFollow: boolean | null;
}

export interface PrimaryFooter_footer {
  __typename: "PrimaryNavItem";
  label: string | null;
  children: (PrimaryFooter_footer_children | null)[] | null;
}

export interface PrimaryFooter {
  footer: (PrimaryFooter_footer | null)[] | null;
}

export interface PrimaryFooterVariables {
  siteOptions: SiteOptions;
}
