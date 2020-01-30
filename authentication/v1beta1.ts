import {ObjectMeta} from "../meta/v1.ts"

/**
 * TokenReview attempts to authenticate a token to a known user. Note: TokenReview requests may be cached by the webhook token authenticator plugin in the kube-apiserver.
 */
export interface TokenReview {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: "authentication.k8s.io/v1beta1"

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: "TokenReview"
  metadata?: ObjectMeta

  /**
   * Spec holds information about the request being evaluated
   */
  spec: TokenReviewSpec

  /**
   * Status is filled in by the server and indicates whether the request can be authenticated.
   */
  status?: TokenReviewStatus
}

/**
 * TokenReviewSpec is a description of the token authentication request.
 */
export interface TokenReviewSpec {
  /**
   * Audiences is a list of the identifiers that the resource server presented with the token identifies as. Audience-aware token authenticators will verify that the token was intended for at least one of the audiences in this list. If no audiences are provided, the audience will default to the audience of the Kubernetes apiserver.
   */
  audiences?: Array<string>

  /**
   * Token is the opaque bearer token.
   */
  token?: string
}

/**
 * TokenReviewStatus is the result of the token authentication request.
 */
export interface TokenReviewStatus {
  /**
   * Audiences are audience identifiers chosen by the authenticator that are compatible with both the TokenReview and token. An identifier is any identifier in the intersection of the TokenReviewSpec audiences and the token's audiences. A client of the TokenReview API that sets the spec.audiences field should validate that a compatible audience identifier is returned in the status.audiences field to ensure that the TokenReview server is audience aware. If a TokenReview returns an empty status.audience field where status.authenticated is "true", the token is valid against the audience of the Kubernetes API server.
   */
  audiences?: Array<string>

  /**
   * Authenticated indicates that the token was associated with a known user.
   */
  authenticated?: boolean

  /**
   * Error indicates that the token couldn't be checked
   */
  error?: string

  /**
   * User is the UserInfo associated with the provided token.
   */
  user?: UserInfo
}

/**
 * UserInfo holds the information about the user needed to implement the user.Info interface.
 */
export interface UserInfo {
  /**
   * Any additional information provided by the authenticator.
   */
  extra?: {[name: string]: Array<string>}

  /**
   * The names of groups this user is a part of.
   */
  groups?: Array<string>

  /**
   * A unique value that identifies this user across time. If this user is deleted and another user by the same name is added, they will have different UIDs.
   */
  uid?: string

  /**
   * The name that uniquely identifies this user among all active users.
   */
  username?: string
}
