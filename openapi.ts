/**
 * An OpenAPI API.
 */
export interface API {
  info: APIInfo
  definitions: {[name: string]: Definition}
}

export interface APIInfo {
  title: string
  version: string
}

/**
 * An OpenAPI type definition.
 */
export interface Definition {
  description: string
  type?: string
  required?: string[]
  properties?: {[name: string]: Property}
  'x-kubernetes-group-version-kind'?: GroupVersionKind[]
}

export interface GroupVersionKind {
  group: string
  version: string
  kind: string
}

export interface PropertyMeta {
  description: string
}

export type Property = PropertyMeta & Value

export type Value = ScalarValue | ArrayValue | ObjectValue | Reference

export interface Reference {
  $ref: string
}

export interface ScalarValue {
  type: 'string' | 'integer' | 'number' | 'boolean'
}

export interface ArrayValue {
  type: 'array'
  items: Value
}

export interface ObjectValue {
  type: 'object'
  additionalProperties: Value
}

export const resolve = (api: API, {$ref: ref}: Reference): {name: string; def: Definition} => {
  const prefix = '#/definitions/'
  if (!ref.startsWith(prefix)) {
    throw new Error(`Invalid or unsupported $ref: ${JSON.stringify(ref)}`)
  }

  let name = ref.slice(prefix.length)
  let def = api.definitions[name]
  if (def == null) {
    throw new Error(`Failed to resolve ${name} in ${api.info.title}/${api.info.version}.`)
  }

  return {name, def}
}
