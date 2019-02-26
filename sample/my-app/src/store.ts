
//import { createStore } from '@aslab/relax'

import { link } from './relax/relax'

const store = {
  /** this is the name */
  name: "Alex",
  score: 100,
  nationality: 'Martian'
}

const { use, commit } = link(store)

export { store, use, commit }