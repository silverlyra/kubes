# kubes

kubes provides TypeScript `interface` types for Kubernetes resources in a
[Deno][deno]-friendly format.

[deno]: https://deno.land

## Usage

Take a look at the available [branches][branches] for the Kubernetes version
you're using (or earliest version you want to be compatible with). Then, you
can import and use type definitions via the [denopkg][denopkg] gateway:

```typescript
import {Pod} from 'https://denopkg.com/silverlyra/kubes@v1.17/core/v1.ts'
import {ObjectMeta} from 'https://denopkg.com/silverlyra/kubes@v1.17/meta/v1.ts'

let metadata: ObjectMeta = {name: 'example', labels: {app: 'example'}}
let pod: Pod = {
  apiVersion: 'v1',
  kind: 'Pod', // 'v1' and 'Pod' are the only accepted values for a Pod

  metadata,

  spec: {
    containers: [
      /* ... */
    ],
  },
}
```

[branches]: https://github.com/silverlyra/kubes/branches
[denopkg]: https://denopkg.com/
