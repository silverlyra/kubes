import {basename, dirname} from 'https://deno.land/std/path/posix.ts'

export class Project {
  private files: Map<string, File>

  constructor() {
    this.files = new Map()
  }

  file(path: string): File {
    let file = this.files.get(path)
    if (file == null) {
      file = new File(path)
      this.files.set(file.path, file)
    }

    return file
  }

  all(): File[] {
    return [...this.files.values()]
  }
}

export class File {
  private imports: Map<string, Set<string>>
  private members: Member[]

  constructor(public path: string) {
    this.imports = new Map()
    this.members = []
  }

  add(member: Member): this {
    this.members.push(member)
    return this
  }

  import(path: string, member: string): this {
    if (path === this.path) {
      return this
    }

    let imports = this.imports.get(path)
    if (imports == null) {
      imports = new Set()
      this.imports.set(path, imports)
    }

    imports.add(member)
    return this
  }

  render(): string[] {
    const relative = (from: string, to: string) => {
      if (dirname(from) === dirname(to)) {
        return `./${basename(to)}`
      }

      const prefix = dirname(from)
        .split('/')
        .map(() => '..')
        .join('/')
      return `${prefix}/${to}`
    }

    const importedFiles = [...this.imports.keys()].sort((a, b) =>
      relative(this.path, a).localeCompare(relative(this.path, b))
    )
    const imports = importedFiles.map(path => {
      const names = [...this.imports.get(path)].sort((a, b) => a.localeCompare(b)).join(', ')
      return `import {${names}} from ${JSON.stringify(relative(this.path, path))}`
    })

    return [
      ...imports,
      ...(imports.length > 0 ? [''] : []),
      ...renderMembers(this.members.sort((a, b) => a.name.localeCompare(b.name))),
    ]
  }
}

export interface Member {
  name: string
  description: string | undefined

  render(): string[]
}

export class Interface {
  private members: Member[]

  public constructor(public name: string, public description: string | undefined) {
    this.members = []
  }

  add(member: Member): this {
    this.members.push(member)
    return this
  }

  public render(): string[] {
    return [
      ...renderDescription(this),
      `export interface ${this.name} {`,
      ...renderMembers(this.members, 1),
      `}`,
    ]
  }
}

export class Field {
  public constructor(
    public name: string,
    public description: string | undefined,
    public type: string,
    public optional: boolean = false
  ) {}

  public render(): string[] {
    const name = /^[a-z_]\w*$/i.test(this.name) ? this.name : JSON.stringify(this.name)
    return [...renderDescription(this), `${name}${this.optional ? '?' : ''}: ${this.type}`]
  }
}

export class Union {
  public constructor(
    public name: string,
    public description: string | undefined,
    public types: string[]
  ) {}

  public render(): string[] {
    return [...renderDescription(this), `export type ${this.name} = ${this.types.join(' | ')}`]
  }
}

const renderDescription = (member: Member): string[] => {
  if (!member.description) {
    return []
  }

  const lines = member.description
    .replace(/\s+Required\.?\s*$/, '')
    .split('\n')
    .map(line => line.trimEnd())
  return ['/**', ...lines.map(line => ` * ${line}`), ' */']
}

const renderMembers = (members: Member[], indent: number = 0): string[] => {
  const prefix = '  '.repeat(indent)

  const next = (lines: string[], member: Member, i: number): string[] => {
    const memberLines = member.render().map(line => `${prefix}${line}`)
    return [...lines, ...(memberLines.length > 1 && i > 0 ? [''] : []), ...memberLines]
  }

  return members.reduce(next, [])
}
