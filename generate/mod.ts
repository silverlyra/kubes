import {API, Definition, GroupVersionKind, Value, resolve} from '../openapi.ts'
import {Project, File, Interface, Field, Union} from './src.ts'

const replacedTypes: {[name: string]: string} = {
  IntOrString: 'number | string',
}
const redefinedTypes: {[name: string]: string[]} = {
  JSON: ['any'],
  JSONSchemaPropsOrArray: ['JSONSchemaProps', 'JSONSchemaProps[]'],
  JSONSchemaPropsOrBool: ['JSONSchemaProps', 'boolean'],
  JSONSchemaPropsOrStringArray: ['JSONSchemaProps', 'string[]'],
}

export default function generate(api: API): Project {
  return new State(api).generate()
}

class State {
  private project: Project

  constructor(private api: API) {
    this.project = new Project()
  }

  generate(): Project {
    for (let {name, path, def} of definitions(this.api)) {
      let file = this.project.file(path)

      if (def.type === 'object') {
        file.add(this.generateInterface(file, name, def))
      } else {
        let types = redefinedTypes[name] || [def.type].filter(Boolean)
        if (types.length === 0) {
          throw new Error(`${path}: Unknown type for ${name} ${JSON.stringify(def.type)}`)
        }

        file.add(new Union(name, def.description, types))
      }
    }

    return this.project
  }

  private generateInterface(file: File, name: string, def: Definition): Interface {
    const {required, properties, 'x-kubernetes-group-version-kind': gvk} = def
    const iface = new Interface(name, def.description)

    if (properties == null) {
      console.warn(`${file.path}: interface ${name} has no properties`)
    } else {
      for (let [name, prop] of Object.entries(properties)) {
        const isRequired = (required || []).includes(name)
        const type = literalAPIType(gvk, name) || this.valueType(file, prop)
        iface.add(new Field(name, prop.description, type, !isRequired))
      }
    }

    return iface
  }

  private valueType(file: File, value: Value): string {
    let t = ''

    if ('$ref' in value) {
      let loc = nameToLocation(resolve(this.api, value).name)

      if (loc == null) {
        throw new Error(`Value references excluded type: ${JSON.stringify(value)}`)
      } else if (loc.name in replacedTypes) {
        t = replacedTypes[loc.name]
      } else {
        file.import(loc.path, loc.name)
        t = loc.name
      }
    } else if ('type' in value) {
      switch (value.type) {
        case 'string':
        case 'number':
        case 'boolean':
          t = value.type
          break
        case 'integer':
          t = 'number'
          break
        case 'object':
          t = `{[name: string]: ${this.valueType(file, value.additionalProperties)}}`
          break
        case 'array':
          t = `Array<${this.valueType(file, value.items)}>`
          break
        default:
          assertNever(value)
      }
    } else {
      assertNever(value)
    }

    return t
  }
}

interface Location {
  path: string
  name: string
}

interface ResolvedDefinition extends Location {
  def: Definition
}

function definitions(api: API): ResolvedDefinition[] {
  let defs = []

  for (let [name, def] of Object.entries(api.definitions)) {
    let loc = nameToLocation(name)
    if (loc == null || loc.name in replacedTypes) {
      continue
    }

    defs.push({...loc, def})
  }

  return defs
}

function nameToLocation(name: string): Location | undefined {
  let simplifiedName = simplifyName(name)
  if (simplifiedName == null) {
    return undefined
  }
  name = simplifiedName

  let parts = name.split('.')

  name = parts[parts.length - 1]
  let path = parts.slice(0, -1).join('/') + '.ts'

  return {name, path}
}

function simplifyName(name: string): string | undefined {
  const simplifications = {
    'io.k8s.api.': '',
    'io.k8s.apimachinery.pkg.apis.': '',
    'io.k8s.apimachinery.pkg.': '',
    'io.k8s.apiextensions-apiserver.pkg.apis.': '',
  }
  for (let [prefix, replacement] of Object.entries(simplifications)) {
    if (name.startsWith(prefix)) {
      return `${replacement}${name.slice(prefix.length)}`
    }
  }

  return undefined
}

export function literalAPIType(
  gvkList: GroupVersionKind[] | undefined,
  propName: string
): string | undefined {
  if (gvkList != null && gvkList.length === 1) {
    const gvk = gvkList[0]
    if (propName === 'apiVersion') {
      return JSON.stringify([gvk.group, gvk.version].filter(Boolean).join('/'))
    } else if (propName === 'kind') {
      return JSON.stringify(gvk.kind)
    }
  }

  return undefined
}

const assertNever = (_: never) => {
  throw new Error('"unreachable" code was reached')
}
