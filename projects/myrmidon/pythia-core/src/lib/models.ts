/**
 * A page of data.
 */
 export interface DataPage<T> {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  total: number;
  items: T[];
}

/**
 * A wrapper for a value and an error message. Any of the two should
 * be provided by the server.
 */
export interface ResultWrapper<T> {
  error?: string;
  value?: T;
}

export interface Corpus {
  id: string;
  title: string;
  description: string;
  documentIds?: number[];
}

export interface Attribute {
  targetId: number;
  name: string;
  value: string;
}

export interface Profile {
  id: string;
  content?: string;
}

export interface Document {
  id: number;
  author: string;
  title: string;
  dateValue: number;
  sortKey: string;
  source: string;
  profileId: string;
  lastModified: Date;
  attributes: Attribute[];
  content?: string;
}

export interface IndexTerm {
  value: string;
  count: number;
}

export interface TextMapNode {
  label: string;
  location: string;
  start: number;
  end: number;
  selected?: boolean;
  children?: TextMapNode[];
  parent?: TextMapNode;
}

/**
 * Essential information about a user.
 */
 export interface UserInfo {
  userName: string;
  firstName: string;
  lastName: string;
}

/**
 * Authenticated user data.
 */
export interface User {
  userName: string;
  email: string;
  roles: string[];
  emailConfirmed?: boolean;
  firstName: string;
  lastName: string;
  lockoutEnabled?: boolean;
  lockoutEnd?: Date;
}

/**
 * User filter parameters.
 */
export interface UserFilter {
  pageNumber: number;
  pageSize: number;
  name?: string;
}
