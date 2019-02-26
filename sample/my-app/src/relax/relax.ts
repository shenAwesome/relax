import { useEffect, useState } from 'react';
import { Updater, useUpdate } from './util'

function areEqualShallow(a: any, b: any) {
  if (a == null || b == null) return false

  for (var key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}

/** hook keeps observing data changes and update UI */
class Hook<T> extends Updater {
  constructor(private link: RelaxLink<T>, public collector: (store: T) => any) {
    super()
  }

  renderedValue: any = null
  check() {
    const { value, renderedValue } = this
    if (!areEqualShallow(value, renderedValue)) {
      console.log('will update')
      this.update()
      this.renderedValue = value
    }
  }

  get value() {
    return this.collector(this.link.store)
  }
}

type PlainObject = { [name: string]: any }

class RelaxLink<T>{

  private hooks: Hook<T>[] = []

  constructor(public store: T) {
    this.use = this.use.bind(this)
    this.commit = this.commit.bind(this)
  }

  commit() {
    this.hooks.forEach(h => h.check())
  }

  use<U extends PlainObject>(collector: (store: T) => U): U {
    const [hook] = useState(new Hook(this, collector))  //keep the hook in state
    useUpdate(hook)//hook can update now
    useEffect(() => { //only maintain hook for live component 
      const { hooks } = this
      hooks.push(hook)
      return () => {
        hooks.splice(hooks.indexOf(hook), 1)//remove hook 
      }
    }, [])
    return hook.value
  }
}


const links: RelaxLink<any>[] = []

function link<T>(store: T) {
  if (links.length == 0) {
    setTimeout(() => {
      init()
    }, 100);
  }
  const relaxLink = new RelaxLink(store)
  links.push(relaxLink)
  return relaxLink
}

function init() { //todo, make this configurable
  if (cfg.autoCommit > 0)
    window.setInterval(() => {
      links.forEach(l => l.commit())
    }, 100)
}

class Config {
  /** if >0, relax will auto commit changes, default is 100ms  */
  autoCommit = 100
}
const cfg = new Config()

/**
 * todo, for configure global settings
 */
function config(options: Partial<Config>) {
  Object.keys(options).forEach(k => {
    (cfg as any)[k] = (options as any)[k]
  })
}

export { link, config }

