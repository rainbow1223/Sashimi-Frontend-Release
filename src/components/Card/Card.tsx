import React from 'react'
import styled from 'styled-components'

const Card: React.FC<{
  className?: string
}> = ({ children, className }) => (
  <StyledCard className={className}>
    {children}
  </StyledCard>
)

const StyledCard = styled.div`
  background: #ffffff;
  border: 1px solid #E8E8E8;
  border-radius: 5px;
  box-shadow: none;
  display: flex;
  flex: 1;
  flex-direction: column;
  z-index: 1;
`

export default Card
