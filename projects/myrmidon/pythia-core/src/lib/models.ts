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
