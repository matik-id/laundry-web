import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1">&copy; {new Date().getFullYear()} Matik Laundry.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://matik.id" target="_blank" rel="noopener noreferrer">Matik</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
