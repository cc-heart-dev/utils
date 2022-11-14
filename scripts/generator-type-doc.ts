import { join } from 'path'
import Typedoc from 'typedoc'
;(async () => {
  const app = await Typedoc.Application.bootstrapWithPlugins({
    entryPoints: [`index.ts`],
  })

  const project = await app.convert()

  if (project) {
    // Project may not have converted correctly
    const outputDir = join('docs')

    // Rendered docs
    await app.generateDocs(project, outputDir)
    // Alternatively generate JSON output
    await app.generateJson(project, outputDir + '/documentation.json')
  }
})()
