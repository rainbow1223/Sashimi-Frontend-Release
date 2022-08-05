import React from 'react'
import chef from '../../assets/img/chef.png'

import PageHeader from '../../components/PageHeader'

interface ComingSoonProps {
  title: string
}

const ComingSoon: React.FC<ComingSoonProps> = ({title}) => {
  return (
    <>
      <PageHeader
        icon={<img src={chef} height="120" alt="sashimi" />}
        title={`${title} Coming Soon!`}
      />
    </>
  )
}

export default ComingSoon
