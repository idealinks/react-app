/* tslint:disable */
// This file was automatically generated and should not be edited.

import { SiteOptions, PaginationOptions } from "./globalTypes";

// ====================================================
// GraphQL query operation: Articles
// ====================================================

export interface Articles_articles_thumbnails {
  __typename: "ImagesBySize";
  large: string | null;
  small: string | null;
}

export interface Articles_articles {
  __typename: "Article";
  assetId: string | null;
  title: string | null;
  description: string | null;
  imageAlt: string | null;
  category: string | null;
  displayPublishDate: string | null;
  navigationUrl: string | null;
  openNewWindow: boolean | null;
  thumbnails: Articles_articles_thumbnails | null;
}

export interface Articles {
  articles: (Articles_articles | null)[] | null;
}

export interface ArticlesVariables {
  siteOptions: SiteOptions;
  pagination: PaginationOptions;
}
