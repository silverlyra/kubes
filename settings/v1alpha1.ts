import {EnvFromSource, EnvVar, Volume, VolumeMount} from "../core/v1.ts"
import {LabelSelector, ListMeta, ObjectMeta} from "../meta/v1.ts"

/**
 * PodPreset is a policy resource that defines additional runtime requirements for a Pod.
 */
export interface PodPreset {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
   */
  apiVersion?: "settings.k8s.io/v1alpha1"

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
   */
  kind?: "PodPreset"
  metadata?: ObjectMeta
  spec?: PodPresetSpec
}

/**
 * PodPresetList is a list of PodPreset objects.
 */
export interface PodPresetList {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
   */
  apiVersion?: "settings.k8s.io/v1alpha1"

  /**
   * Items is a list of schema objects.
   */
  items: Array<PodPreset>

  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
   */
  kind?: "PodPresetList"

  /**
   * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   */
  metadata?: ListMeta
}

/**
 * PodPresetSpec is a description of a pod preset.
 */
export interface PodPresetSpec {
  /**
   * Env defines the collection of EnvVar to inject into containers.
   */
  env?: Array<EnvVar>

  /**
   * EnvFrom defines the collection of EnvFromSource to inject into containers.
   */
  envFrom?: Array<EnvFromSource>

  /**
   * Selector is a label query over a set of resources, in this case pods.
   */
  selector?: LabelSelector

  /**
   * VolumeMounts defines the collection of VolumeMount to inject into containers.
   */
  volumeMounts?: Array<VolumeMount>

  /**
   * Volumes defines the collection of Volume to inject into the pod.
   */
  volumes?: Array<Volume>
}
