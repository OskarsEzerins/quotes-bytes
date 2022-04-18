import { useCallback, useState } from 'react'

import { isBoolean } from 'lodash-es'

type NewState = unknown

export function useToggler(initialState = false): [boolean, (newState?: NewState) => void] {
  const [value, setValue] = useState(initialState)

  const toggleValue = useCallback((newState: NewState = undefined) => {
    setValue((prev) => (isBoolean(newState) ? newState : !prev))
  }, [])

  return [value, toggleValue]
}
