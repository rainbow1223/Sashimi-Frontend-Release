import React, {createContext, useMemo} from 'react'
import useMedia from 'react-use/lib/useMedia'

interface MobileContext {
  isMobile: boolean,
  lt576: boolean
}

export const Context = createContext<MobileContext>({
  isMobile: false,
  lt576: false
})

const Mobile: React.FC = ({ children }) => {
  const isMobile = useMedia('(max-width: 576px)')

  const value = useMemo(() => {
    return {
      isMobile,
      lt576: isMobile
    };
  }, [isMobile])


  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default Mobile
