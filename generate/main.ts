import {basename, dirname, join} from 'https://deno.land/std/path/mod.ts'

import {API} from '../openapi.ts'
import generate from './mod.ts'

async function main() {
  const encoder = new TextEncoder()

  let version = Deno.args[0]
  if (/^\d/.test(version)) {
    version = `v${version}`
  }

  const api = await fetchAPI(version)
  for (const file of generate(api).all()) {
    const filePath = join('types', version, dirname(file.path))
    const content = [...file.render(), ''].join('\n')

    Deno.mkdirSync(filePath, {recursive: true})
    Deno.writeFileSync(join(filePath, basename(file.path)), encoder.encode(content))
    console.warn(file.path)
  }
}

async function fetchAPI(version: string): Promise<API> {
  if (/^v\d+\.\d+$/.test(version)) {
    version = `${version}.0`
  }

  let response = await fetch(
    `https://raw.githubusercontent.com/kubernetes/kubernetes/${version}/api/openapi-spec/swagger.json`
  )
  return response.json()
}

if (import.meta.main) {
  main().then(() => Deno.exit(0))
}
