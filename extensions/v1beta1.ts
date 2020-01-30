import {LoadBalancerStatus, PodTemplateSpec, SELinuxOptions} from "../core/v1.ts"
import {LabelSelector, ListMeta, ObjectMeta, Time} from "../meta/v1.ts"

/**
 * AllowedCSIDriver represents a single inline CSI Driver that is allowed to be used.
 */
export interface AllowedCSIDriver {
  /**
   * Name is the registered name of the CSI driver
   */
  name: string
}

/**
 * AllowedFlexVolume represents a single Flexvolume that is allowed to be used. Deprecated: use AllowedFlexVolume from policy API Group instead.
 */
export interface AllowedFlexVolume {
  /**
   * driver is the name of the Flexvolume driver.
   */
  driver: string
}

/**
 * AllowedHostPath defines the host volume conditions that will be enabled by a policy for pods to use. It requires the path prefix to be defined. Deprecated: use AllowedHostPath from policy API Group instead.
 */
export interface AllowedHostPath {
  /**
   * pathPrefix is the path prefix that the host volume must match. It does not support `*`. Trailing slashes are trimmed when validating the path prefix with a host path.
   * 
   * Examples: `/foo` would allow `/foo`, `/foo/` and `/foo/bar` `/foo` would not allow `/food` or `/etc/foo`
   */
  pathPrefix?: string

  /**
   * when set to true, will allow host volumes matching the pathPrefix only if all volume mounts are readOnly.
   */
  readOnly?: boolean
}

/**
 * DEPRECATED - This group version of DaemonSet is deprecated by apps/v1beta2/DaemonSet. See the release notes for more information. DaemonSet represents the configuration of a daemon set.
 */
export interface DaemonSet {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: "extensions/v1beta1"

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: "DaemonSet"

  /**
   * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   */
  metadata?: ObjectMeta

  /**
   * The desired behavior of this daemon set. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
   */
  spec?: DaemonSetSpec

  /**
   * The current status of this daemon set. This data may be out of date by some window of time. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
   */
  status?: DaemonSetStatus
}

/**
 * DaemonSetCondition describes the state of a DaemonSet at a certain point.
 */
export interface DaemonSetCondition {
  /**
   * Last time the condition transitioned from one status to another.
   */
  lastTransitionTime?: Time

  /**
   * A human readable message indicating details about the transition.
   */
  message?: string

  /**
   * The reason for the condition's last transition.
   */
  reason?: string

  /**
   * Status of the condition, one of True, False, Unknown.
   */
  status: string

  /**
   * Type of DaemonSet condition.
   */
  type: string
}

/**
 * DaemonSetList is a collection of daemon sets.
 */
export interface DaemonSetList {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: "extensions/v1beta1"

  /**
   * A list of daemon sets.
   */
  items: Array<DaemonSet>

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: "DaemonSetList"

  /**
   * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   */
  metadata?: ListMeta
}

/**
 * DaemonSetSpec is the specification of a daemon set.
 */
export interface DaemonSetSpec {
  /**
   * The minimum number of seconds for which a newly created DaemonSet pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready).
   */
  minReadySeconds?: number

  /**
   * The number of old history to retain to allow rollback. This is a pointer to distinguish between explicit zero and not specified. Defaults to 10.
   */
  revisionHistoryLimit?: number

  /**
   * A label query over pods that are managed by the daemon set. Must match in order to be controlled. If empty, defaulted to labels on Pod template. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
   */
  selector?: LabelSelector

  /**
   * An object that describes the pod that will be created. The DaemonSet will create exactly one copy of this pod on every node that matches the template's node selector (or on every node if no node selector is specified). More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#pod-template
   */
  template: PodTemplateSpec

  /**
   * DEPRECATED. A sequence number representing a specific generation of the template. Populated by the system. It can be set only during the creation.
   */
  templateGeneration?: number

  /**
   * An update strategy to replace existing DaemonSet pods with new pods.
   */
  updateStrategy?: DaemonSetUpdateStrategy
}

/**
 * DaemonSetStatus represents the current status of a daemon set.
 */
export interface DaemonSetStatus {
  /**
   * Count of hash collisions for the DaemonSet. The DaemonSet controller uses this field as a collision avoidance mechanism when it needs to create the name for the newest ControllerRevision.
   */
  collisionCount?: number

  /**
   * Represents the latest available observations of a DaemonSet's current state.
   */
  conditions?: Array<DaemonSetCondition>

  /**
   * The number of nodes that are running at least 1 daemon pod and are supposed to run the daemon pod. More info: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/
   */
  currentNumberScheduled: number

  /**
   * The total number of nodes that should be running the daemon pod (including nodes correctly running the daemon pod). More info: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/
   */
  desiredNumberScheduled: number

  /**
   * The number of nodes that should be running the daemon pod and have one or more of the daemon pod running and available (ready for at least spec.minReadySeconds)
   */
  numberAvailable?: number

  /**
   * The number of nodes that are running the daemon pod, but are not supposed to run the daemon pod. More info: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/
   */
  numberMisscheduled: number

  /**
   * The number of nodes that should be running the daemon pod and have one or more of the daemon pod running and ready.
   */
  numberReady: number

  /**
   * The number of nodes that should be running the daemon pod and have none of the daemon pod running and available (ready for at least spec.minReadySeconds)
   */
  numberUnavailable?: number

  /**
   * The most recent generation observed by the daemon set controller.
   */
  observedGeneration?: number

  /**
   * The total number of nodes that are running updated daemon pod
   */
  updatedNumberScheduled?: number
}

export interface DaemonSetUpdateStrategy {
  /**
   * Rolling update config params. Present only if type = "RollingUpdate".
   */
  rollingUpdate?: RollingUpdateDaemonSet

  /**
   * Type of daemon set update. Can be "RollingUpdate" or "OnDelete". Default is OnDelete.
   */
  type?: string
}

/**
 * DEPRECATED - This group version of Deployment is deprecated by apps/v1beta2/Deployment. See the release notes for more information. Deployment enables declarative updates for Pods and ReplicaSets.
 */
export interface Deployment {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: "extensions/v1beta1"

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: "Deployment"

  /**
   * Standard object metadata.
   */
  metadata?: ObjectMeta

  /**
   * Specification of the desired behavior of the Deployment.
   */
  spec?: DeploymentSpec

  /**
   * Most recently observed status of the Deployment.
   */
  status?: DeploymentStatus
}

/**
 * DeploymentCondition describes the state of a deployment at a certain point.
 */
export interface DeploymentCondition {
  /**
   * Last time the condition transitioned from one status to another.
   */
  lastTransitionTime?: Time

  /**
   * The last time this condition was updated.
   */
  lastUpdateTime?: Time

  /**
   * A human readable message indicating details about the transition.
   */
  message?: string

  /**
   * The reason for the condition's last transition.
   */
  reason?: string

  /**
   * Status of the condition, one of True, False, Unknown.
   */
  status: string

  /**
   * Type of deployment condition.
   */
  type: string
}

/**
 * DeploymentList is a list of Deployments.
 */
export interface DeploymentList {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: "extensions/v1beta1"

  /**
   * Items is the list of Deployments.
   */
  items: Array<Deployment>

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: "DeploymentList"

  /**
   * Standard list metadata.
   */
  metadata?: ListMeta
}

/**
 * DEPRECATED. DeploymentRollback stores the information required to rollback a deployment.
 */
export interface DeploymentRollback {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: "extensions/v1beta1"

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: "DeploymentRollback"

  /**
   * Required: This must match the Name of a deployment.
   */
  name: string

  /**
   * The config of this deployment rollback.
   */
  rollbackTo: RollbackConfig

  /**
   * The annotations to be updated to a deployment
   */
  updatedAnnotations?: {[name: string]: string}
}

/**
 * DeploymentSpec is the specification of the desired behavior of the Deployment.
 */
export interface DeploymentSpec {
  /**
   * Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)
   */
  minReadySeconds?: number

  /**
   * Indicates that the deployment is paused and will not be processed by the deployment controller.
   */
  paused?: boolean

  /**
   * The maximum time in seconds for a deployment to make progress before it is considered to be failed. The deployment controller will continue to process failed deployments and a condition with a ProgressDeadlineExceeded reason will be surfaced in the deployment status. Note that progress will not be estimated during the time a deployment is paused. This is set to the max value of int32 (i.e. 2147483647) by default, which means "no deadline".
   */
  progressDeadlineSeconds?: number

  /**
   * Number of desired pods. This is a pointer to distinguish between explicit zero and not specified. Defaults to 1.
   */
  replicas?: number

  /**
   * The number of old ReplicaSets to retain to allow rollback. This is a pointer to distinguish between explicit zero and not specified. This is set to the max value of int32 (i.e. 2147483647) by default, which means "retaining all old RelicaSets".
   */
  revisionHistoryLimit?: number

  /**
   * DEPRECATED. The config this deployment is rolling back to. Will be cleared after rollback is done.
   */
  rollbackTo?: RollbackConfig

  /**
   * Label selector for pods. Existing ReplicaSets whose pods are selected by this will be the ones affected by this deployment.
   */
  selector?: LabelSelector

  /**
   * The deployment strategy to use to replace existing pods with new ones.
   */
  strategy?: DeploymentStrategy

  /**
   * Template describes the pods that will be created.
   */
  template: PodTemplateSpec
}

/**
 * DeploymentStatus is the most recently observed status of the Deployment.
 */
export interface DeploymentStatus {
  /**
   * Total number of available pods (ready for at least minReadySeconds) targeted by this deployment.
   */
  availableReplicas?: number

  /**
   * Count of hash collisions for the Deployment. The Deployment controller uses this field as a collision avoidance mechanism when it needs to create the name for the newest ReplicaSet.
   */
  collisionCount?: number

  /**
   * Represents the latest available observations of a deployment's current state.
   */
  conditions?: Array<DeploymentCondition>

  /**
   * The generation observed by the deployment controller.
   */
  observedGeneration?: number

  /**
   * Total number of ready pods targeted by this deployment.
   */
  readyReplicas?: number

  /**
   * Total number of non-terminated pods targeted by this deployment (their labels match the selector).
   */
  replicas?: number

  /**
   * Total number of unavailable pods targeted by this deployment. This is the total number of pods that are still required for the deployment to have 100% available capacity. They may either be pods that are running but not yet available or pods that still have not been created.
   */
  unavailableReplicas?: number

  /**
   * Total number of non-terminated pods targeted by this deployment that have the desired template spec.
   */
  updatedReplicas?: number
}

/**
 * DeploymentStrategy describes how to replace existing pods with new ones.
 */
export interface DeploymentStrategy {
  /**
   * Rolling update config params. Present only if DeploymentStrategyType = RollingUpdate.
   */
  rollingUpdate?: RollingUpdateDeployment

  /**
   * Type of deployment. Can be "Recreate" or "RollingUpdate". Default is RollingUpdate.
   */
  type?: string
}

/**
 * FSGroupStrategyOptions defines the strategy type and options used to create the strategy. Deprecated: use FSGroupStrategyOptions from policy API Group instead.
 */
export interface FSGroupStrategyOptions {
  /**
   * ranges are the allowed ranges of fs groups.  If you would like to force a single fs group then supply a single range with the same start and end. Required for MustRunAs.
   */
  ranges?: Array<IDRange>

  /**
   * rule is the strategy that will dictate what FSGroup is used in the SecurityContext.
   */
  rule?: string
}

/**
 * HTTPIngressPath associates a path regex with a backend. Incoming urls matching the path are forwarded to the backend.
 */
export interface HTTPIngressPath {
  /**
   * Backend defines the referenced service endpoint to which the traffic will be forwarded to.
   */
  backend: IngressBackend

  /**
   * Path is an extended POSIX regex as defined by IEEE Std 1003.1, (i.e this follows the egrep/unix syntax, not the perl syntax) matched against the path of an incoming request. Currently it can contain characters disallowed from the conventional "path" part of a URL as defined by RFC 3986. Paths must begin with a '/'. If unspecified, the path defaults to a catch all sending traffic to the backend.
   */
  path?: string
}

/**
 * HTTPIngressRuleValue is a list of http selectors pointing to backends. In the example: http://<host>/<path>?<searchpart> -> backend where where parts of the url correspond to RFC 3986, this resource will be used to match against everything after the last '/' and before the first '?' or '#'.
 */
export interface HTTPIngressRuleValue {
  /**
   * A collection of paths that map requests to backends.
   */
  paths: Array<HTTPIngressPath>
}

/**
 * HostPortRange defines a range of host ports that will be enabled by a policy for pods to use.  It requires both the start and end to be defined. Deprecated: use HostPortRange from policy API Group instead.
 */
export interface HostPortRange {
  /**
   * max is the end of the range, inclusive.
   */
  max: number

  /**
   * min is the start of the range, inclusive.
   */
  min: number
}

/**
 * IDRange provides a min/max of an allowed range of IDs. Deprecated: use IDRange from policy API Group instead.
 */
export interface IDRange {
  /**
   * max is the end of the range, inclusive.
   */
  max: number

  /**
   * min is the start of the range, inclusive.
   */
  min: number
}

/**
 * DEPRECATED 1.9 - This group version of IPBlock is deprecated by networking/v1/IPBlock. IPBlock describes a particular CIDR (Ex. "192.168.1.1/24") that is allowed to the pods matched by a NetworkPolicySpec's podSelector. The except entry describes CIDRs that should not be included within this rule.
 */
export interface IPBlock {
  /**
   * CIDR is a string representing the IP Block Valid examples are "192.168.1.1/24"
   */
  cidr: string

  /**
   * Except is a slice of CIDRs that should not be included within an IP Block Valid examples are "192.168.1.1/24" Except values will be rejected if they are outside the CIDR range
   */
  except?: Array<string>
}

/**
 * Ingress is a collection of rules that allow inbound connections to reach the endpoints defined by a backend. An Ingress can be configured to give services externally-reachable urls, load balance traffic, terminate SSL, offer name based virtual hosting etc. DEPRECATED - This group version of Ingress is deprecated by networking.k8s.io/v1beta1 Ingress. See the release notes for more information.
 */
export interface Ingress {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: "extensions/v1beta1"

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: "Ingress"

  /**
   * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   */
  metadata?: ObjectMeta

  /**
   * Spec is the desired state of the Ingress. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
   */
  spec?: IngressSpec

  /**
   * Status is the current state of the Ingress. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
   */
  status?: IngressStatus
}

/**
 * IngressBackend describes all endpoints for a given service and port.
 */
export interface IngressBackend {
  /**
   * Specifies the name of the referenced service.
   */
  serviceName: string

  /**
   * Specifies the port of the referenced service.
   */
  servicePort: number | string
}

/**
 * IngressList is a collection of Ingress.
 */
export interface IngressList {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: "extensions/v1beta1"

  /**
   * Items is the list of Ingress.
   */
  items: Array<Ingress>

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: "IngressList"

  /**
   * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   */
  metadata?: ListMeta
}

/**
 * IngressRule represents the rules mapping the paths under a specified host to the related backend services. Incoming requests are first evaluated for a host match, then routed to the backend associated with the matching IngressRuleValue.
 */
export interface IngressRule {
  /**
   * Host is the fully qualified domain name of a network host, as defined by RFC 3986. Note the following deviations from the "host" part of the URI as defined in the RFC: 1. IPs are not allowed. Currently an IngressRuleValue can only apply to the
   * 	  IP in the Spec of the parent Ingress.
   * 2. The `:` delimiter is not respected because ports are not allowed.
   * 	  Currently the port of an Ingress is implicitly :80 for http and
   * 	  :443 for https.
   * Both these may change in the future. Incoming requests are matched against the host before the IngressRuleValue. If the host is unspecified, the Ingress routes all traffic based on the specified IngressRuleValue.
   */
  host?: string
  http?: HTTPIngressRuleValue
}

/**
 * IngressSpec describes the Ingress the user wishes to exist.
 */
export interface IngressSpec {
  /**
   * A default backend capable of servicing requests that don't match any rule. At least one of 'backend' or 'rules' must be specified. This field is optional to allow the loadbalancer controller or defaulting logic to specify a global default.
   */
  backend?: IngressBackend

  /**
   * A list of host rules used to configure the Ingress. If unspecified, or no rule matches, all traffic is sent to the default backend.
   */
  rules?: Array<IngressRule>

  /**
   * TLS configuration. Currently the Ingress only supports a single TLS port, 443. If multiple members of this list specify different hosts, they will be multiplexed on the same port according to the hostname specified through the SNI TLS extension, if the ingress controller fulfilling the ingress supports SNI.
   */
  tls?: Array<IngressTLS>
}

/**
 * IngressStatus describe the current state of the Ingress.
 */
export interface IngressStatus {
  /**
   * LoadBalancer contains the current status of the load-balancer.
   */
  loadBalancer?: LoadBalancerStatus
}

/**
 * IngressTLS describes the transport layer security associated with an Ingress.
 */
export interface IngressTLS {
  /**
   * Hosts are a list of hosts included in the TLS certificate. The values in this list must match the name/s used in the tlsSecret. Defaults to the wildcard host setting for the loadbalancer controller fulfilling this Ingress, if left unspecified.
   */
  hosts?: Array<string>

  /**
   * SecretName is the name of the secret used to terminate SSL traffic on 443. Field is left optional to allow SSL routing based on SNI hostname alone. If the SNI host in a listener conflicts with the "Host" header field used by an IngressRule, the SNI host is used for termination and value of the Host header is used for routing.
   */
  secretName?: string
}

/**
 * DEPRECATED 1.9 - This group version of NetworkPolicy is deprecated by networking/v1/NetworkPolicy. NetworkPolicy describes what network traffic is allowed for a set of Pods
 */
export interface NetworkPolicy {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: "extensions/v1beta1"

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: "NetworkPolicy"

  /**
   * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   */
  metadata?: ObjectMeta

  /**
   * Specification of the desired behavior for this NetworkPolicy.
   */
  spec?: NetworkPolicySpec
}

/**
 * DEPRECATED 1.9 - This group version of NetworkPolicyEgressRule is deprecated by networking/v1/NetworkPolicyEgressRule. NetworkPolicyEgressRule describes a particular set of traffic that is allowed out of pods matched by a NetworkPolicySpec's podSelector. The traffic must match both ports and to. This type is beta-level in 1.8
 */
export interface NetworkPolicyEgressRule {
  /**
   * List of destination ports for outgoing traffic. Each item in this list is combined using a logical OR. If this field is empty or missing, this rule matches all ports (traffic not restricted by port). If this field is present and contains at least one item, then this rule allows traffic only if the traffic matches at least one port in the list.
   */
  ports?: Array<NetworkPolicyPort>

  /**
   * List of destinations for outgoing traffic of pods selected for this rule. Items in this list are combined using a logical OR operation. If this field is empty or missing, this rule matches all destinations (traffic not restricted by destination). If this field is present and contains at least one item, this rule allows traffic only if the traffic matches at least one item in the to list.
   */
  to?: Array<NetworkPolicyPeer>
}

/**
 * DEPRECATED 1.9 - This group version of NetworkPolicyIngressRule is deprecated by networking/v1/NetworkPolicyIngressRule. This NetworkPolicyIngressRule matches traffic if and only if the traffic matches both ports AND from.
 */
export interface NetworkPolicyIngressRule {
  /**
   * List of sources which should be able to access the pods selected for this rule. Items in this list are combined using a logical OR operation. If this field is empty or missing, this rule matches all sources (traffic not restricted by source). If this field is present and contains at least one item, this rule allows traffic only if the traffic matches at least one item in the from list.
   */
  from?: Array<NetworkPolicyPeer>

  /**
   * List of ports which should be made accessible on the pods selected for this rule. Each item in this list is combined using a logical OR. If this field is empty or missing, this rule matches all ports (traffic not restricted by port). If this field is present and contains at least one item, then this rule allows traffic only if the traffic matches at least one port in the list.
   */
  ports?: Array<NetworkPolicyPort>
}

/**
 * DEPRECATED 1.9 - This group version of NetworkPolicyList is deprecated by networking/v1/NetworkPolicyList. Network Policy List is a list of NetworkPolicy objects.
 */
export interface NetworkPolicyList {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: "extensions/v1beta1"

  /**
   * Items is a list of schema objects.
   */
  items: Array<NetworkPolicy>

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: "NetworkPolicyList"

  /**
   * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   */
  metadata?: ListMeta
}

/**
 * DEPRECATED 1.9 - This group version of NetworkPolicyPeer is deprecated by networking/v1/NetworkPolicyPeer.
 */
export interface NetworkPolicyPeer {
  /**
   * IPBlock defines policy on a particular IPBlock. If this field is set then neither of the other fields can be.
   */
  ipBlock?: IPBlock

  /**
   * Selects Namespaces using cluster-scoped labels. This field follows standard label selector semantics; if present but empty, it selects all namespaces.
   * 
   * If PodSelector is also set, then the NetworkPolicyPeer as a whole selects the Pods matching PodSelector in the Namespaces selected by NamespaceSelector. Otherwise it selects all Pods in the Namespaces selected by NamespaceSelector.
   */
  namespaceSelector?: LabelSelector

  /**
   * This is a label selector which selects Pods. This field follows standard label selector semantics; if present but empty, it selects all pods.
   * 
   * If NamespaceSelector is also set, then the NetworkPolicyPeer as a whole selects the Pods matching PodSelector in the Namespaces selected by NamespaceSelector. Otherwise it selects the Pods matching PodSelector in the policy's own Namespace.
   */
  podSelector?: LabelSelector
}

/**
 * DEPRECATED 1.9 - This group version of NetworkPolicyPort is deprecated by networking/v1/NetworkPolicyPort.
 */
export interface NetworkPolicyPort {
  /**
   * If specified, the port on the given protocol.  This can either be a numerical or named port on a pod.  If this field is not provided, this matches all port names and numbers. If present, only traffic on the specified protocol AND port will be matched.
   */
  port?: number | string

  /**
   * Optional.  The protocol (TCP, UDP, or SCTP) which traffic must match. If not specified, this field defaults to TCP.
   */
  protocol?: string
}

/**
 * DEPRECATED 1.9 - This group version of NetworkPolicySpec is deprecated by networking/v1/NetworkPolicySpec.
 */
export interface NetworkPolicySpec {
  /**
   * List of egress rules to be applied to the selected pods. Outgoing traffic is allowed if there are no NetworkPolicies selecting the pod (and cluster policy otherwise allows the traffic), OR if the traffic matches at least one egress rule across all of the NetworkPolicy objects whose podSelector matches the pod. If this field is empty then this NetworkPolicy limits all outgoing traffic (and serves solely to ensure that the pods it selects are isolated by default). This field is beta-level in 1.8
   */
  egress?: Array<NetworkPolicyEgressRule>

  /**
   * List of ingress rules to be applied to the selected pods. Traffic is allowed to a pod if there are no NetworkPolicies selecting the pod OR if the traffic source is the pod's local node, OR if the traffic matches at least one ingress rule across all of the NetworkPolicy objects whose podSelector matches the pod. If this field is empty then this NetworkPolicy does not allow any traffic (and serves solely to ensure that the pods it selects are isolated by default).
   */
  ingress?: Array<NetworkPolicyIngressRule>

  /**
   * Selects the pods to which this NetworkPolicy object applies.  The array of ingress rules is applied to any pods selected by this field. Multiple network policies can select the same set of pods.  In this case, the ingress rules for each are combined additively. This field is NOT optional and follows standard label selector semantics. An empty podSelector matches all pods in this namespace.
   */
  podSelector: LabelSelector

  /**
   * List of rule types that the NetworkPolicy relates to. Valid options are "Ingress", "Egress", or "Ingress,Egress". If this field is not specified, it will default based on the existence of Ingress or Egress rules; policies that contain an Egress section are assumed to affect Egress, and all policies (whether or not they contain an Ingress section) are assumed to affect Ingress. If you want to write an egress-only policy, you must explicitly specify policyTypes [ "Egress" ]. Likewise, if you want to write a policy that specifies that no egress is allowed, you must specify a policyTypes value that include "Egress" (since such a policy would not include an Egress section and would otherwise default to just [ "Ingress" ]). This field is beta-level in 1.8
   */
  policyTypes?: Array<string>
}

/**
 * PodSecurityPolicy governs the ability to make requests that affect the Security Context that will be applied to a pod and container. Deprecated: use PodSecurityPolicy from policy API Group instead.
 */
export interface PodSecurityPolicy {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: "extensions/v1beta1"

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: "PodSecurityPolicy"

  /**
   * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   */
  metadata?: ObjectMeta

  /**
   * spec defines the policy enforced.
   */
  spec?: PodSecurityPolicySpec
}

/**
 * PodSecurityPolicyList is a list of PodSecurityPolicy objects. Deprecated: use PodSecurityPolicyList from policy API Group instead.
 */
export interface PodSecurityPolicyList {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: "extensions/v1beta1"

  /**
   * items is a list of schema objects.
   */
  items: Array<PodSecurityPolicy>

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: "PodSecurityPolicyList"

  /**
   * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   */
  metadata?: ListMeta
}

/**
 * PodSecurityPolicySpec defines the policy enforced. Deprecated: use PodSecurityPolicySpec from policy API Group instead.
 */
export interface PodSecurityPolicySpec {
  /**
   * allowPrivilegeEscalation determines if a pod can request to allow privilege escalation. If unspecified, defaults to true.
   */
  allowPrivilegeEscalation?: boolean

  /**
   * AllowedCSIDrivers is a whitelist of inline CSI drivers that must be explicitly set to be embedded within a pod spec. An empty value indicates that any CSI driver can be used for inline ephemeral volumes.
   */
  allowedCSIDrivers?: Array<AllowedCSIDriver>

  /**
   * allowedCapabilities is a list of capabilities that can be requested to add to the container. Capabilities in this field may be added at the pod author's discretion. You must not list a capability in both allowedCapabilities and requiredDropCapabilities.
   */
  allowedCapabilities?: Array<string>

  /**
   * allowedFlexVolumes is a whitelist of allowed Flexvolumes.  Empty or nil indicates that all Flexvolumes may be used.  This parameter is effective only when the usage of the Flexvolumes is allowed in the "volumes" field.
   */
  allowedFlexVolumes?: Array<AllowedFlexVolume>

  /**
   * allowedHostPaths is a white list of allowed host paths. Empty indicates that all host paths may be used.
   */
  allowedHostPaths?: Array<AllowedHostPath>

  /**
   * AllowedProcMountTypes is a whitelist of allowed ProcMountTypes. Empty or nil indicates that only the DefaultProcMountType may be used. This requires the ProcMountType feature flag to be enabled.
   */
  allowedProcMountTypes?: Array<string>

  /**
   * allowedUnsafeSysctls is a list of explicitly allowed unsafe sysctls, defaults to none. Each entry is either a plain sysctl name or ends in "*" in which case it is considered as a prefix of allowed sysctls. Single * means all unsafe sysctls are allowed. Kubelet has to whitelist all allowed unsafe sysctls explicitly to avoid rejection.
   * 
   * Examples: e.g. "foo/*" allows "foo/bar", "foo/baz", etc. e.g. "foo.*" allows "foo.bar", "foo.baz", etc.
   */
  allowedUnsafeSysctls?: Array<string>

  /**
   * defaultAddCapabilities is the default set of capabilities that will be added to the container unless the pod spec specifically drops the capability.  You may not list a capability in both defaultAddCapabilities and requiredDropCapabilities. Capabilities added here are implicitly allowed, and need not be included in the allowedCapabilities list.
   */
  defaultAddCapabilities?: Array<string>

  /**
   * defaultAllowPrivilegeEscalation controls the default setting for whether a process can gain more privileges than its parent process.
   */
  defaultAllowPrivilegeEscalation?: boolean

  /**
   * forbiddenSysctls is a list of explicitly forbidden sysctls, defaults to none. Each entry is either a plain sysctl name or ends in "*" in which case it is considered as a prefix of forbidden sysctls. Single * means all sysctls are forbidden.
   * 
   * Examples: e.g. "foo/*" forbids "foo/bar", "foo/baz", etc. e.g. "foo.*" forbids "foo.bar", "foo.baz", etc.
   */
  forbiddenSysctls?: Array<string>

  /**
   * fsGroup is the strategy that will dictate what fs group is used by the SecurityContext.
   */
  fsGroup: FSGroupStrategyOptions

  /**
   * hostIPC determines if the policy allows the use of HostIPC in the pod spec.
   */
  hostIPC?: boolean

  /**
   * hostNetwork determines if the policy allows the use of HostNetwork in the pod spec.
   */
  hostNetwork?: boolean

  /**
   * hostPID determines if the policy allows the use of HostPID in the pod spec.
   */
  hostPID?: boolean

  /**
   * hostPorts determines which host port ranges are allowed to be exposed.
   */
  hostPorts?: Array<HostPortRange>

  /**
   * privileged determines if a pod can request to be run as privileged.
   */
  privileged?: boolean

  /**
   * readOnlyRootFilesystem when set to true will force containers to run with a read only root file system.  If the container specifically requests to run with a non-read only root file system the PSP should deny the pod. If set to false the container may run with a read only root file system if it wishes but it will not be forced to.
   */
  readOnlyRootFilesystem?: boolean

  /**
   * requiredDropCapabilities are the capabilities that will be dropped from the container.  These are required to be dropped and cannot be added.
   */
  requiredDropCapabilities?: Array<string>

  /**
   * RunAsGroup is the strategy that will dictate the allowable RunAsGroup values that may be set. If this field is omitted, the pod's RunAsGroup can take any value. This field requires the RunAsGroup feature gate to be enabled.
   */
  runAsGroup?: RunAsGroupStrategyOptions

  /**
   * runAsUser is the strategy that will dictate the allowable RunAsUser values that may be set.
   */
  runAsUser: RunAsUserStrategyOptions

  /**
   * runtimeClass is the strategy that will dictate the allowable RuntimeClasses for a pod. If this field is omitted, the pod's runtimeClassName field is unrestricted. Enforcement of this field depends on the RuntimeClass feature gate being enabled.
   */
  runtimeClass?: RuntimeClassStrategyOptions

  /**
   * seLinux is the strategy that will dictate the allowable labels that may be set.
   */
  seLinux: SELinuxStrategyOptions

  /**
   * supplementalGroups is the strategy that will dictate what supplemental groups are used by the SecurityContext.
   */
  supplementalGroups: SupplementalGroupsStrategyOptions

  /**
   * volumes is a white list of allowed volume plugins. Empty indicates that no volumes may be used. To allow all volumes you may use '*'.
   */
  volumes?: Array<string>
}

/**
 * DEPRECATED - This group version of ReplicaSet is deprecated by apps/v1beta2/ReplicaSet. See the release notes for more information. ReplicaSet ensures that a specified number of pod replicas are running at any given time.
 */
export interface ReplicaSet {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: "extensions/v1beta1"

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: "ReplicaSet"

  /**
   * If the Labels of a ReplicaSet are empty, they are defaulted to be the same as the Pod(s) that the ReplicaSet manages. Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   */
  metadata?: ObjectMeta

  /**
   * Spec defines the specification of the desired behavior of the ReplicaSet. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
   */
  spec?: ReplicaSetSpec

  /**
   * Status is the most recently observed status of the ReplicaSet. This data may be out of date by some window of time. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
   */
  status?: ReplicaSetStatus
}

/**
 * ReplicaSetCondition describes the state of a replica set at a certain point.
 */
export interface ReplicaSetCondition {
  /**
   * The last time the condition transitioned from one status to another.
   */
  lastTransitionTime?: Time

  /**
   * A human readable message indicating details about the transition.
   */
  message?: string

  /**
   * The reason for the condition's last transition.
   */
  reason?: string

  /**
   * Status of the condition, one of True, False, Unknown.
   */
  status: string

  /**
   * Type of replica set condition.
   */
  type: string
}

/**
 * ReplicaSetList is a collection of ReplicaSets.
 */
export interface ReplicaSetList {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: "extensions/v1beta1"

  /**
   * List of ReplicaSets. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller
   */
  items: Array<ReplicaSet>

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: "ReplicaSetList"

  /**
   * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  metadata?: ListMeta
}

/**
 * ReplicaSetSpec is the specification of a ReplicaSet.
 */
export interface ReplicaSetSpec {
  /**
   * Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)
   */
  minReadySeconds?: number

  /**
   * Replicas is the number of desired replicas. This is a pointer to distinguish between explicit zero and unspecified. Defaults to 1. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller/#what-is-a-replicationcontroller
   */
  replicas?: number

  /**
   * Selector is a label query over pods that should match the replica count. If the selector is empty, it is defaulted to the labels present on the pod template. Label keys and values that must match in order to be controlled by this replica set. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
   */
  selector?: LabelSelector

  /**
   * Template is the object that describes the pod that will be created if insufficient replicas are detected. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#pod-template
   */
  template?: PodTemplateSpec
}

/**
 * ReplicaSetStatus represents the current status of a ReplicaSet.
 */
export interface ReplicaSetStatus {
  /**
   * The number of available replicas (ready for at least minReadySeconds) for this replica set.
   */
  availableReplicas?: number

  /**
   * Represents the latest available observations of a replica set's current state.
   */
  conditions?: Array<ReplicaSetCondition>

  /**
   * The number of pods that have labels matching the labels of the pod template of the replicaset.
   */
  fullyLabeledReplicas?: number

  /**
   * ObservedGeneration reflects the generation of the most recently observed ReplicaSet.
   */
  observedGeneration?: number

  /**
   * The number of ready replicas for this replica set.
   */
  readyReplicas?: number

  /**
   * Replicas is the most recently oberved number of replicas. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller/#what-is-a-replicationcontroller
   */
  replicas: number
}

/**
 * DEPRECATED.
 */
export interface RollbackConfig {
  /**
   * The revision to rollback to. If set to 0, rollback to the last revision.
   */
  revision?: number
}

/**
 * Spec to control the desired behavior of daemon set rolling update.
 */
export interface RollingUpdateDaemonSet {
  /**
   * The maximum number of DaemonSet pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of total number of DaemonSet pods at the start of the update (ex: 10%). Absolute number is calculated from percentage by rounding up. This cannot be 0. Default value is 1. Example: when this is set to 30%, at most 30% of the total number of nodes that should be running the daemon pod (i.e. status.desiredNumberScheduled) can have their pods stopped for an update at any given time. The update starts by stopping at most 30% of those DaemonSet pods and then brings up new DaemonSet pods in their place. Once the new pods are available, it then proceeds onto other DaemonSet pods, thus ensuring that at least 70% of original number of DaemonSet pods are available at all times during the update.
   */
  maxUnavailable?: number | string
}

/**
 * Spec to control the desired behavior of rolling update.
 */
export interface RollingUpdateDeployment {
  /**
   * The maximum number of pods that can be scheduled above the desired number of pods. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). This can not be 0 if MaxUnavailable is 0. Absolute number is calculated from percentage by rounding up. By default, a value of 1 is used. Example: when this is set to 30%, the new RC can be scaled up immediately when the rolling update starts, such that the total number of old and new pods do not exceed 130% of desired pods. Once old pods have been killed, new RC can be scaled up further, ensuring that total number of pods running at any time during the update is at most 130% of desired pods.
   */
  maxSurge?: number | string

  /**
   * The maximum number of pods that can be unavailable during the update. Value can be an absolute number (ex: 5) or a percentage of desired pods (ex: 10%). Absolute number is calculated from percentage by rounding down. This can not be 0 if MaxSurge is 0. By default, a fixed value of 1 is used. Example: when this is set to 30%, the old RC can be scaled down to 70% of desired pods immediately when the rolling update starts. Once new pods are ready, old RC can be scaled down further, followed by scaling up the new RC, ensuring that the total number of pods available at all times during the update is at least 70% of desired pods.
   */
  maxUnavailable?: number | string
}

/**
 * RunAsGroupStrategyOptions defines the strategy type and any options used to create the strategy. Deprecated: use RunAsGroupStrategyOptions from policy API Group instead.
 */
export interface RunAsGroupStrategyOptions {
  /**
   * ranges are the allowed ranges of gids that may be used. If you would like to force a single gid then supply a single range with the same start and end. Required for MustRunAs.
   */
  ranges?: Array<IDRange>

  /**
   * rule is the strategy that will dictate the allowable RunAsGroup values that may be set.
   */
  rule: string
}

/**
 * RunAsUserStrategyOptions defines the strategy type and any options used to create the strategy. Deprecated: use RunAsUserStrategyOptions from policy API Group instead.
 */
export interface RunAsUserStrategyOptions {
  /**
   * ranges are the allowed ranges of uids that may be used. If you would like to force a single uid then supply a single range with the same start and end. Required for MustRunAs.
   */
  ranges?: Array<IDRange>

  /**
   * rule is the strategy that will dictate the allowable RunAsUser values that may be set.
   */
  rule: string
}

/**
 * RuntimeClassStrategyOptions define the strategy that will dictate the allowable RuntimeClasses for a pod.
 */
export interface RuntimeClassStrategyOptions {
  /**
   * allowedRuntimeClassNames is a whitelist of RuntimeClass names that may be specified on a pod. A value of "*" means that any RuntimeClass name is allowed, and must be the only item in the list. An empty list requires the RuntimeClassName field to be unset.
   */
  allowedRuntimeClassNames: Array<string>

  /**
   * defaultRuntimeClassName is the default RuntimeClassName to set on the pod. The default MUST be allowed by the allowedRuntimeClassNames list. A value of nil does not mutate the Pod.
   */
  defaultRuntimeClassName?: string
}

/**
 * SELinuxStrategyOptions defines the strategy type and any options used to create the strategy. Deprecated: use SELinuxStrategyOptions from policy API Group instead.
 */
export interface SELinuxStrategyOptions {
  /**
   * rule is the strategy that will dictate the allowable labels that may be set.
   */
  rule: string

  /**
   * seLinuxOptions required to run as; required for MustRunAs More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
   */
  seLinuxOptions?: SELinuxOptions
}

/**
 * represents a scaling request for a resource.
 */
export interface Scale {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: "extensions/v1beta1"

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: "Scale"

  /**
   * Standard object metadata; More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata.
   */
  metadata?: ObjectMeta

  /**
   * defines the behavior of the scale. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status.
   */
  spec?: ScaleSpec

  /**
   * current status of the scale. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status. Read-only.
   */
  status?: ScaleStatus
}

/**
 * describes the attributes of a scale subresource
 */
export interface ScaleSpec {
  /**
   * desired number of instances for the scaled object.
   */
  replicas?: number
}

/**
 * represents the current status of a scale subresource.
 */
export interface ScaleStatus {
  /**
   * actual number of observed instances of the scaled object.
   */
  replicas: number

  /**
   * label query over pods that should match the replicas count. More info: http://kubernetes.io/docs/user-guide/labels#label-selectors
   */
  selector?: {[name: string]: string}

  /**
   * label selector for pods that should match the replicas count. This is a serializated version of both map-based and more expressive set-based selectors. This is done to avoid introspection in the clients. The string will be in the same format as the query-param syntax. If the target type only supports map-based selectors, both this field and map-based selector field are populated. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
   */
  targetSelector?: string
}

/**
 * SupplementalGroupsStrategyOptions defines the strategy type and options used to create the strategy. Deprecated: use SupplementalGroupsStrategyOptions from policy API Group instead.
 */
export interface SupplementalGroupsStrategyOptions {
  /**
   * ranges are the allowed ranges of supplemental groups.  If you would like to force a single supplemental group then supply a single range with the same start and end. Required for MustRunAs.
   */
  ranges?: Array<IDRange>

  /**
   * rule is the strategy that will dictate what supplemental groups is used in the SecurityContext.
   */
  rule?: string
}
