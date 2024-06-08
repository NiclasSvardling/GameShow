import React, { SetStateAction, useEffect, useState } from 'react'

export default function useLocalStorage<T>(
  key: string,
  initValue: T,
): [T | undefined, (newValue: SetStateAction<T | undefined>) => void] {
  const [state, setState] = useState<T | undefined>(() => {
    const value = localStorage.getItem(key)
    if (value !== null) {
      return JSON.parse(value)
    }
    if (initValue !== undefined) {
      localStorage.setItem(key, JSON.stringify(initValue))
    }
    return initValue
  })

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === key) {
        if (event.newValue) {
          setState(JSON.parse(event.newValue))
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key])

  const updateState = (newValue: SetStateAction<T | undefined>) => {
    if (typeof newValue === 'function') {
      setState(prevState => {
        const updatedValue = (newValue as (prevState: T | undefined) => T | undefined)(prevState)
        if (updatedValue === undefined) {
          localStorage.removeItem(key)
        } else {
          localStorage.setItem(key, JSON.stringify(updatedValue))
        }
        return updatedValue
      })
    } else if (newValue === undefined) {
      localStorage.removeItem(key)
      setState(newValue)
    } else {
      localStorage.setItem(key, JSON.stringify(newValue))
      setState(newValue)
    }
    const storageChangeEvent = new StorageEvent('storage', {
      key: key,
      newValue: JSON.stringify(newValue),
      storageArea: localStorage,
    })
    window.dispatchEvent(storageChangeEvent)
  }

  return [state, updateState]
}
