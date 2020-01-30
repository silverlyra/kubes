import {LabelSelector, ListMeta, ObjectMeta} from "../meta/v1.ts"

/**
 * MutatingWebhook describes an admission webhook and the resources and operations it applies to.
 */
export interface MutatingWebhook {
  /**
   * AdmissionReviewVersions is an ordered list of preferred `AdmissionReview` versions the Webhook expects. API server will try to use first version in the list which it supports. If none of the versions specified in this list supported by API server, validation will fail for this object. If a persisted webhook configuration specifies allowed versions and does not include any versions known to the API Server, calls to the webhook will fail and be subject to the failure policy. Default to `['v1beta1']`.
   */
  admissionReviewVersions?: Array<string>

  /**
   * ClientConfig defines how to communicate with the hook.
   */
  clientConfig: WebhookClientConfig

  /**
   * FailurePolicy defines how unrecognized errors from the admission endpoint are handled - allowed values are Ignore or Fail. Defaults to Ignore.
   */
  failurePolicy?: string

  /**
   * matchPolicy defines how the "rules" list is used to match incoming requests. Allowed values are "Exact" or "Equivalent".
   * 
   * - Exact: match a request only if it exactly matches a specified rule. For example, if deployments can be modified via apps/v1, apps/v1beta1, and extensions/v1beta1, but "rules" only included `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]`, a request to apps/v1beta1 or extensions/v1beta1 would not be sent to the webhook.
   * 
   * - Equivalent: match a request if modifies a resource listed in rules, even via another API group or version. For example, if deployments can be modified via apps/v1, apps/v1beta1, and extensions/v1beta1, and "rules" only included `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]`, a request to apps/v1beta1 or extensions/v1beta1 would be converted to apps/v1 and sent to the webhook.
   * 
   * Defaults to "Exact"
   */
  matchPolicy?: string

  /**
   * The name of the admission webhook. Name should be fully qualified, e.g., imagepolicy.kubernetes.io, where "imagepolicy" is the name of the webhook, and kubernetes.io is the name of the organization.
   */
  name: string

  /**
   * NamespaceSelector decides whether to run the webhook on an object based on whether the namespace for that object matches the selector. If the object itself is a namespace, the matching is performed on object.metadata.labels. If the object is another cluster scoped resource, it never skips the webhook.
   * 
   * For example, to run the webhook on any objects whose namespace is not associated with "runlevel" of "0" or "1";  you will set the selector as follows: "namespaceSelector": {
   *   "matchExpressions": [
   *     {
   *       "key": "runlevel",
   *       "operator": "NotIn",
   *       "values": [
   *         "0",
   *         "1"
   *       ]
   *     }
   *   ]
   * }
   * 
   * If instead you want to only run the webhook on any objects whose namespace is associated with the "environment" of "prod" or "staging"; you will set the selector as follows: "namespaceSelector": {
   *   "matchExpressions": [
   *     {
   *       "key": "environment",
   *       "operator": "In",
   *       "values": [
   *         "prod",
   *         "staging"
   *       ]
   *     }
   *   ]
   * }
   * 
   * See https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/ for more examples of label selectors.
   * 
   * Default to the empty LabelSelector, which matches everything.
   */
  namespaceSelector?: LabelSelector

  /**
   * ObjectSelector decides whether to run the webhook based on if the object has matching labels. objectSelector is evaluated against both the oldObject and newObject that would be sent to the webhook, and is considered to match if either object matches the selector. A null object (oldObject in the case of create, or newObject in the case of delete) or an object that cannot have labels (like a DeploymentRollback or a PodProxyOptions object) is not considered to match. Use the object selector only if the webhook is opt-in, because end users may skip the admission webhook by setting the labels. Default to the empty LabelSelector, which matches everything.
   */
  objectSelector?: LabelSelector

  /**
   * reinvocationPolicy indicates whether this webhook should be called multiple times as part of a single admission evaluation. Allowed values are "Never" and "IfNeeded".
   * 
   * Never: the webhook will not be called more than once in a single admission evaluation.
   * 
   * IfNeeded: the webhook will be called at least one additional time as part of the admission evaluation if the object being admitted is modified by other admission plugins after the initial webhook call. Webhooks that specify this option *must* be idempotent, able to process objects they previously admitted. Note: * the number of additional invocations is not guaranteed to be exactly one. * if additional invocations result in further modifications to the object, webhooks are not guaranteed to be invoked again. * webhooks that use this option may be reordered to minimize the number of additional invocations. * to validate an object after all mutations are guaranteed complete, use a validating admission webhook instead.
   * 
   * Defaults to "Never".
   */
  reinvocationPolicy?: string

  /**
   * Rules describes what operations on what resources/subresources the webhook cares about. The webhook cares about an operation if it matches _any_ Rule. However, in order to prevent ValidatingAdmissionWebhooks and MutatingAdmissionWebhooks from putting the cluster in a state which cannot be recovered from without completely disabling the plugin, ValidatingAdmissionWebhooks and MutatingAdmissionWebhooks are never called on admission requests for ValidatingWebhookConfiguration and MutatingWebhookConfiguration objects.
   */
  rules?: Array<RuleWithOperations>

  /**
   * SideEffects states whether this webhookk has side effects. Acceptable values are: Unknown, None, Some, NoneOnDryRun Webhooks with side effects MUST implement a reconciliation system, since a request may be rejected by a future step in the admission change and the side effects therefore need to be undone. Requests with the dryRun attribute will be auto-rejected if they match a webhook with sideEffects == Unknown or Some. Defaults to Unknown.
   */
  sideEffects?: string

  /**
   * TimeoutSeconds specifies the timeout for this webhook. After the timeout passes, the webhook call will be ignored or the API call will fail based on the failure policy. The timeout value must be between 1 and 30 seconds. Default to 30 seconds.
   */
  timeoutSeconds?: number
}

/**
 * MutatingWebhookConfiguration describes the configuration of and admission webhook that accept or reject and may change the object.
 */
export interface MutatingWebhookConfiguration {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
   */
  apiVersion?: "admissionregistration.k8s.io/v1beta1"

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
   */
  kind?: "MutatingWebhookConfiguration"

  /**
   * Standard object metadata; More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata.
   */
  metadata?: ObjectMeta

  /**
   * Webhooks is a list of webhooks and the affected resources and operations.
   */
  webhooks?: Array<MutatingWebhook>
}

/**
 * MutatingWebhookConfigurationList is a list of MutatingWebhookConfiguration.
 */
export interface MutatingWebhookConfigurationList {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
   */
  apiVersion?: "admissionregistration.k8s.io/v1beta1"

  /**
   * List of MutatingWebhookConfiguration.
   */
  items: Array<MutatingWebhookConfiguration>

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
   */
  kind?: "MutatingWebhookConfigurationList"

  /**
   * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
   */
  metadata?: ListMeta
}

/**
 * RuleWithOperations is a tuple of Operations and Resources. It is recommended to make sure that all the tuple expansions are valid.
 */
export interface RuleWithOperations {
  /**
   * APIGroups is the API groups the resources belong to. '*' is all groups. If '*' is present, the length of the slice must be one.
   */
  apiGroups?: Array<string>

  /**
   * APIVersions is the API versions the resources belong to. '*' is all versions. If '*' is present, the length of the slice must be one.
   */
  apiVersions?: Array<string>

  /**
   * Operations is the operations the admission hook cares about - CREATE, UPDATE, or * for all operations. If '*' is present, the length of the slice must be one.
   */
  operations?: Array<string>

  /**
   * Resources is a list of resources this rule applies to.
   * 
   * For example: 'pods' means pods. 'pods/log' means the log subresource of pods. '*' means all resources, but not subresources. 'pods/*' means all subresources of pods. '*/scale' means all scale subresources. '*/*' means all resources and their subresources.
   * 
   * If wildcard is present, the validation rule will ensure resources do not overlap with each other.
   * 
   * Depending on the enclosing object, subresources might not be allowed.
   */
  resources?: Array<string>

  /**
   * scope specifies the scope of this rule. Valid values are "Cluster", "Namespaced", and "*" "Cluster" means that only cluster-scoped resources will match this rule. Namespace API objects are cluster-scoped. "Namespaced" means that only namespaced resources will match this rule. "*" means that there are no scope restrictions. Subresources match the scope of their parent resource. Default is "*".
   */
  scope?: string
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
 * ValidatingWebhook describes an admission webhook and the resources and operations it applies to.
 */
export interface ValidatingWebhook {
  /**
   * AdmissionReviewVersions is an ordered list of preferred `AdmissionReview` versions the Webhook expects. API server will try to use first version in the list which it supports. If none of the versions specified in this list supported by API server, validation will fail for this object. If a persisted webhook configuration specifies allowed versions and does not include any versions known to the API Server, calls to the webhook will fail and be subject to the failure policy. Default to `['v1beta1']`.
   */
  admissionReviewVersions?: Array<string>

  /**
   * ClientConfig defines how to communicate with the hook.
   */
  clientConfig: WebhookClientConfig

  /**
   * FailurePolicy defines how unrecognized errors from the admission endpoint are handled - allowed values are Ignore or Fail. Defaults to Ignore.
   */
  failurePolicy?: string

  /**
   * matchPolicy defines how the "rules" list is used to match incoming requests. Allowed values are "Exact" or "Equivalent".
   * 
   * - Exact: match a request only if it exactly matches a specified rule. For example, if deployments can be modified via apps/v1, apps/v1beta1, and extensions/v1beta1, but "rules" only included `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]`, a request to apps/v1beta1 or extensions/v1beta1 would not be sent to the webhook.
   * 
   * - Equivalent: match a request if modifies a resource listed in rules, even via another API group or version. For example, if deployments can be modified via apps/v1, apps/v1beta1, and extensions/v1beta1, and "rules" only included `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]`, a request to apps/v1beta1 or extensions/v1beta1 would be converted to apps/v1 and sent to the webhook.
   * 
   * Defaults to "Exact"
   */
  matchPolicy?: string

  /**
   * The name of the admission webhook. Name should be fully qualified, e.g., imagepolicy.kubernetes.io, where "imagepolicy" is the name of the webhook, and kubernetes.io is the name of the organization.
   */
  name: string

  /**
   * NamespaceSelector decides whether to run the webhook on an object based on whether the namespace for that object matches the selector. If the object itself is a namespace, the matching is performed on object.metadata.labels. If the object is another cluster scoped resource, it never skips the webhook.
   * 
   * For example, to run the webhook on any objects whose namespace is not associated with "runlevel" of "0" or "1";  you will set the selector as follows: "namespaceSelector": {
   *   "matchExpressions": [
   *     {
   *       "key": "runlevel",
   *       "operator": "NotIn",
   *       "values": [
   *         "0",
   *         "1"
   *       ]
   *     }
   *   ]
   * }
   * 
   * If instead you want to only run the webhook on any objects whose namespace is associated with the "environment" of "prod" or "staging"; you will set the selector as follows: "namespaceSelector": {
   *   "matchExpressions": [
   *     {
   *       "key": "environment",
   *       "operator": "In",
   *       "values": [
   *         "prod",
   *         "staging"
   *       ]
   *     }
   *   ]
   * }
   * 
   * See https://kubernetes.io/docs/concepts/overview/working-with-objects/labels for more examples of label selectors.
   * 
   * Default to the empty LabelSelector, which matches everything.
   */
  namespaceSelector?: LabelSelector

  /**
   * ObjectSelector decides whether to run the webhook based on if the object has matching labels. objectSelector is evaluated against both the oldObject and newObject that would be sent to the webhook, and is considered to match if either object matches the selector. A null object (oldObject in the case of create, or newObject in the case of delete) or an object that cannot have labels (like a DeploymentRollback or a PodProxyOptions object) is not considered to match. Use the object selector only if the webhook is opt-in, because end users may skip the admission webhook by setting the labels. Default to the empty LabelSelector, which matches everything.
   */
  objectSelector?: LabelSelector

  /**
   * Rules describes what operations on what resources/subresources the webhook cares about. The webhook cares about an operation if it matches _any_ Rule. However, in order to prevent ValidatingAdmissionWebhooks and MutatingAdmissionWebhooks from putting the cluster in a state which cannot be recovered from without completely disabling the plugin, ValidatingAdmissionWebhooks and MutatingAdmissionWebhooks are never called on admission requests for ValidatingWebhookConfiguration and MutatingWebhookConfiguration objects.
   */
  rules?: Array<RuleWithOperations>

  /**
   * SideEffects states whether this webhookk has side effects. Acceptable values are: Unknown, None, Some, NoneOnDryRun Webhooks with side effects MUST implement a reconciliation system, since a request may be rejected by a future step in the admission change and the side effects therefore need to be undone. Requests with the dryRun attribute will be auto-rejected if they match a webhook with sideEffects == Unknown or Some. Defaults to Unknown.
   */
  sideEffects?: string

  /**
   * TimeoutSeconds specifies the timeout for this webhook. After the timeout passes, the webhook call will be ignored or the API call will fail based on the failure policy. The timeout value must be between 1 and 30 seconds. Default to 30 seconds.
   */
  timeoutSeconds?: number
}

/**
 * ValidatingWebhookConfiguration describes the configuration of and admission webhook that accept or reject and object without changing it.
 */
export interface ValidatingWebhookConfiguration {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
   */
  apiVersion?: "admissionregistration.k8s.io/v1beta1"

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
   */
  kind?: "ValidatingWebhookConfiguration"

  /**
   * Standard object metadata; More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata.
   */
  metadata?: ObjectMeta

  /**
   * Webhooks is a list of webhooks and the affected resources and operations.
   */
  webhooks?: Array<ValidatingWebhook>
}

/**
 * ValidatingWebhookConfigurationList is a list of ValidatingWebhookConfiguration.
 */
export interface ValidatingWebhookConfigurationList {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
   */
  apiVersion?: "admissionregistration.k8s.io/v1beta1"

  /**
   * List of ValidatingWebhookConfiguration.
   */
  items: Array<ValidatingWebhookConfiguration>

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
   */
  kind?: "ValidatingWebhookConfigurationList"

  /**
   * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
   */
  metadata?: ListMeta
}

/**
 * WebhookClientConfig contains the information to make a TLS connection with the webhook
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
