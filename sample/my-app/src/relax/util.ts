import { useEffect, useState } from 'react';

function useUpdate(updater?: Updater) {
  const [val, setVal] = useState(0)
  function update() {
    setVal(Math.random())
  }
  if (updater) {
    updater.update = update
  }
  return update
}

class Updater {
  update() { }
}

export { useUpdate, Updater }