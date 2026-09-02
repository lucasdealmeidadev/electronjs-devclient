import { app } from 'electron'
import PouchDB from 'pouchdb'
import path from 'node:path'
import fs from 'node:fs'

const dbPath = path.join(
  app.getPath('userData'),
  'database',
  'my_db'
)

fs.mkdirSync(path.dirname(dbPath), {
  recursive: true,
})

export const db = new PouchDB(dbPath)