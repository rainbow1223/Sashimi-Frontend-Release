import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Button
} from 'antd';

import Card from '../../../../components/Card'
import CardContent from '../../../../components/CardContent'
import CardIcon from '../../../../components/CardIcon'
import Label from '../../../../components/Label'
import Value from '../../../../components/Value'

import useEarnings from '../../../../hooks/useEarnings'
import useReward from '../../../../hooks/useReward'

import {
  getBalanceNumber,
} from '../../../../utils/formatBalance'
import {LogoImg} from "../../../../components/Logo/Logo";

interface HarvestProps {
  pid: number
}

const Harvest: React.FC<HarvestProps> = ({ pid }) => {
  const earnings = useEarnings(pid)
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useReward(pid)

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <LogoImg />
            </CardIcon>
            <Value value={getBalanceNumber(earnings)} />
            <Label text="SASHIMI Earned" />
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              disabled={!earnings.toNumber() || pendingTx}
              type="primary"
              size="large"
              block
              onClick={async () => {
                setPendingTx(true)
                await onReward()
                setPendingTx(false)
              }}
            >
              {pendingTx ? 'Collecting SASHIMI' : 'Harvest'}
            </Button>
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Harvest
