import { useContext } from 'react'
import appContext from '../context/appContext'

export default function useApp() {
  return useContext(appContext)
}
