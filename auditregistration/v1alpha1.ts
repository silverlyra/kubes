import {ListMeta, ObjectMeta} from "../meta/v1.ts"

/**
 * AuditSink represents a cluster level audit sink
 */
export interface AuditSink {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
   */
  apiVersion?: "auditregistration.k8s.io/v1alpha1"

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
   */
  kind?: "AuditSink"
  metadata?: ObjectMeta

  /**
   * Spec defines the audit configuration spec
   */
  spec?: AuditSinkSpec
}

/**
 * AuditSinkList is a list of AuditSink items.
 */
export interface AuditSinkList {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
   */
  apiVersion?: "auditregistration.k8s.io/v1alpha1"

  /**
   * List of audit configurations.
   */
  items: Array<AuditSink>

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
   */
  kind?: "AuditSinkList"
  metadata?: ListMeta
}

/**
 * AuditSinkSpec holds the spec for the audit sink
 */
export interface AuditSinkSpec {
  /**
   * Policy defines the policy for selecting which events should be sent to the webhook required
   */
  policy: Policy

  /**
   * Webhook to send events required
   */
  webhook: Webhook
}

/**
 * Policy defines the configuration of how audit events are logged
 */
export interface Policy {
  /**
   * The Level that all requests are recorded at. available options: None, Metadata, Request, RequestResponse required
   */
  level: string

  /**
   * Stages is a list of stages for which events are created.
   */
  stages?: Array<string>
}

/**
 * ServiceReference holds a reference to Service.legacy.k8s.io
 */
export interface ServiceReference {
  /**
   * `name` is the name of the service.
   */
  name: string

  /**
   * `namespace` is the namespace of the service.
   */
  namespace: string

  /**
   * `path` is an optional URL path which will be sent in any request to this service.
   */
  path?: string

  /**
   * If specified, the port on the service that hosting webhook. Default to 443 for backward compatibility. `port` should be a valid port number (1-65535, inclusive).
   */
  port?: number
}

/**
 * Webhook holds the configuration of the webhook
 */
export interface Webhook {
  /**
   * ClientConfig holds the connection parameters for the webhook required
   */
  clientConfig: WebhookClientConfig

  /**
   * Throttle holds the options for throttling the webhook
   */
  throttle?: WebhookThrottleConfig
}

/**
 * WebhookClientConfig contains the information to make a connection with the webhook
 */
export interface WebhookClientConfig {
  /**
   * `caBundle` is a PEM encoded CA bundle which will be used to validate the webhook's server certificate. If unspecified, system trust roots on the apiserver are used.
   */
  caBundle?: string

  /**
   * `service` is a reference to the service for this webhook. Either `service` or `url` must be specified.
   * 
   * If the webhook is running within the cluster, then you should use `service`.
   */
  service?: ServiceReference

  /**
   * `url` gives the location of the webhook, in standard URL form (`scheme://host:port/path`). Exactly one of `url` or `service` must be specified.
   * 
   * The `host` should not refer to a service running in the cluster; use the `service` field instead. The host might be resolved via external DNS in some apiservers (e.g., `kube-apiserver` cannot resolve in-cluster DNS as that would be a layering violation). `host` may also be an IP address.
   * 
   * Please note that using `localhost` or `127.0.0.1` as a `host` is risky unless you take great care to run this webhook on all hosts which run an apiserver which might need to make calls to this webhook. Such installs are likely to be non-portable, i.e., not easy to turn up in a new cluster.
   * 
   * The scheme must be "https"; the URL must begin with "https://".
   * 
   * A path is optional, and if present may be any string permissible in a URL. You may use the path to pass an arbitrary string to the webhook, for example, a cluster identifier.
   * 
   * Attempting to use a user or basic auth e.g. "user:password@" is not allowed. Fragments ("#...") and query parameters ("?...") are not allowed, either.
   */
  url?: string
}

/**
 * WebhookThrottleConfig holds the configuration for throttling events
 */
export interface WebhookThrottleConfig {
  /**
   * ThrottleBurst is the maximum number of events sent at the same moment default 15 QPS
   */
  burst?: number

  /**
   * ThrottleQPS maximum number of batches per second default 10 QPS
   */
  qps?: number
}
