import {ListMeta, ObjectMeta, Time} from "../meta/v1.ts"

/**
 * Describes a certificate signing request
 */
export interface CertificateSigningRequest {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
   */
  apiVersion?: "certificates.k8s.io/v1beta1"

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
   */
  kind?: "CertificateSigningRequest"
  metadata?: ObjectMeta

  /**
   * The certificate request itself and any additional information.
   */
  spec?: CertificateSigningRequestSpec

  /**
   * Derived information about the request.
   */
  status?: CertificateSigningRequestStatus
}

export interface CertificateSigningRequestCondition {
  /**
   * timestamp for the last update to this condition
   */
  lastUpdateTime?: Time

  /**
   * human readable message with details about the request state
   */
  message?: string

  /**
   * brief reason for the request state
   */
  reason?: string

  /**
   * request approval state, currently Approved or Denied.
   */
  type: string
}

export interface CertificateSigningRequestList {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
   */
  apiVersion?: "certificates.k8s.io/v1beta1"
  items: Array<CertificateSigningRequest>

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
   */
  kind?: "CertificateSigningRequestList"
  metadata?: ListMeta
}

/**
 * This information is immutable after the request is created. Only the Request and Usages fields can be set on creation, other fields are derived by Kubernetes and cannot be modified by users.
 */
export interface CertificateSigningRequestSpec {
  /**
   * Extra information about the requesting user. See user.Info interface for details.
   */
  extra?: {[name: string]: Array<string>}

  /**
   * Group information about the requesting user. See user.Info interface for details.
   */
  groups?: Array<string>

  /**
   * Base64-encoded PKCS#10 CSR data
   */
  request: string

  /**
   * UID information about the requesting user. See user.Info interface for details.
   */
  uid?: string

  /**
   * allowedUsages specifies a set of usage contexts the key will be valid for. See: https://tools.ietf.org/html/rfc5280#section-4.2.1.3
   *      https://tools.ietf.org/html/rfc5280#section-4.2.1.12
   */
  usages?: Array<string>

  /**
   * Information about the requesting user. See user.Info interface for details.
   */
  username?: string
}

export interface CertificateSigningRequestStatus {
  /**
   * If request was approved, the controller will place the issued certificate here.
   */
  certificate?: string

  /**
   * Conditions applied to the request, such as approval or denial.
   */
  conditions?: Array<CertificateSigningRequestCondition>
}
