/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PrimaryHeader
// ====================================================

export interface PrimaryHeader_tophat {
  __typename: "TopHatItem";
  label: string | null;
  navigationUrl: string | null;
  enabled: boolean | null;
}

export interface PrimaryHeader {
  tophat: (PrimaryHeader_tophat | null)[] | null;
}
