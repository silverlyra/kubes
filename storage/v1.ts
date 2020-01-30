import {PersistentVolumeSpec, TopologySelectorTerm} from "../core/v1.ts"
import {ListMeta, ObjectMeta, Time} from "../meta/v1.ts"

/**
 * StorageClass describes the parameters for a class of storage for which PersistentVolumes can be dynamically provisioned.
 * 
 * StorageClasses are non-namespaced; the name of the storage class according to etcd is in ObjectMeta.Name.
 */
export interface StorageClass {
  /**
   * AllowVolumeExpansion shows whether the storage class allow volume expand
   */
  allowVolumeExpansion?: boolean

  /**
   * Restrict the node topologies where volumes can be dynamically provisioned. Each volume plugin defines its own supported topology specifications. An empty TopologySelectorTerm list means there is no topology restriction. This field is only honored by servers that enable the VolumeScheduling feature.
   */
  allowedTopologies?: Array<TopologySelectorTerm>

  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
   */
  apiVersion?: "storage.k8s.io/v1"

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
   */
  kind?: "StorageClass"

  /**
   * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata
   */
  metadata?: ObjectMeta

  /**
   * Dynamically provisioned PersistentVolumes of this storage class are created with these mountOptions, e.g. ["ro", "soft"]. Not validated - mount of the PVs will simply fail if one is invalid.
   */
  mountOptions?: Array<string>

  /**
   * Parameters holds the parameters for the provisioner that should create volumes of this storage class.
   */
  parameters?: {[name: string]: string}

  /**
   * Provisioner indicates the type of the provisioner.
   */
  provisioner: string

  /**
   * Dynamically provisioned PersistentVolumes of this storage class are created with this reclaimPolicy. Defaults to Delete.
   */
  reclaimPolicy?: string

  /**
   * VolumeBindingMode indicates how PersistentVolumeClaims should be provisioned and bound.  When unset, VolumeBindingImmediate is used. This field is only honored by servers that enable the VolumeScheduling feature.
   */
  volumeBindingMode?: string
}

/**
 * StorageClassList is a collection of storage classes.
 */
export interface StorageClassList {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
   */
  apiVersion?: "storage.k8s.io/v1"

  /**
   * Items is the list of StorageClasses
   */
  items: Array<StorageClass>

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
   */
  kind?: "StorageClassList"

  /**
   * Standard list metadata More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata
   */
  metadata?: ListMeta
}

/**
 * VolumeAttachment captures the intent to attach or detach the specified volume to/from the specified node.
 * 
 * VolumeAttachment objects are non-namespaced.
 */
export interface VolumeAttachment {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
   */
  apiVersion?: "storage.k8s.io/v1"

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
   */
  kind?: "VolumeAttachment"

  /**
   * Standard object metadata. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata
   */
  metadata?: ObjectMeta

  /**
   * Specification of the desired attach/detach volume behavior. Populated by the Kubernetes system.
   */
  spec: VolumeAttachmentSpec

  /**
   * Status of the VolumeAttachment request. Populated by the entity completing the attach or detach operation, i.e. the external-attacher.
   */
  status?: VolumeAttachmentStatus
}

/**
 * VolumeAttachmentList is a collection of VolumeAttachment objects.
 */
export interface VolumeAttachmentList {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
   */
  apiVersion?: "storage.k8s.io/v1"

  /**
   * Items is the list of VolumeAttachments
   */
  items: Array<VolumeAttachment>

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
   */
  kind?: "VolumeAttachmentList"

  /**
   * Standard list metadata More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata
   */
  metadata?: ListMeta
}

/**
 * VolumeAttachmentSource represents a volume that should be attached. Right now only PersistenVolumes can be attached via external attacher, in future we may allow also inline volumes in pods. Exactly one member can be set.
 */
export interface VolumeAttachmentSource {
  /**
   * inlineVolumeSpec contains all the information necessary to attach a persistent volume defined by a pod's inline VolumeSource. This field is populated only for the CSIMigration feature. It contains translated fields from a pod's inline VolumeSource to a PersistentVolumeSpec. This field is alpha-level and is only honored by servers that enabled the CSIMigration feature.
   */
  inlineVolumeSpec?: PersistentVolumeSpec

  /**
   * Name of the persistent volume to attach.
   */
  persistentVolumeName?: string
}

/**
 * VolumeAttachmentSpec is the specification of a VolumeAttachment request.
 */
export interface VolumeAttachmentSpec {
  /**
   * Attacher indicates the name of the volume driver that MUST handle this request. This is the name returned by GetPluginName().
   */
  attacher: string

  /**
   * The node that the volume should be attached to.
   */
  nodeName: string

  /**
   * Source represents the volume that should be attached.
   */
  source: VolumeAttachmentSource
}

/**
 * VolumeAttachmentStatus is the status of a VolumeAttachment request.
 */
export interface VolumeAttachmentStatus {
  /**
   * The last error encountered during attach operation, if any. This field must only be set by the entity completing the attach operation, i.e. the external-attacher.
   */
  attachError?: VolumeError

  /**
   * Indicates the volume is successfully attached. This field must only be set by the entity completing the attach operation, i.e. the external-attacher.
   */
  attached: boolean

  /**
   * Upon successful attach, this field is populated with any information returned by the attach operation that must be passed into subsequent WaitForAttach or Mount calls. This field must only be set by the entity completing the attach operation, i.e. the external-attacher.
   */
  attachmentMetadata?: {[name: string]: string}

  /**
   * The last error encountered during detach operation, if any. This field must only be set by the entity completing the detach operation, i.e. the external-attacher.
   */
  detachError?: VolumeError
}

/**
 * VolumeError captures an error encountered during a volume operation.
 */
export interface VolumeError {
  /**
   * String detailing the error encountered during Attach or Detach operation. This string may be logged, so it should not contain sensitive information.
   */
  message?: string

  /**
   * Time the error was encountered.
   */
  time?: Time
}
