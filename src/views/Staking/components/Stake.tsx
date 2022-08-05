import React, {useCallback, useState} from 'react'
import {
  Button
} from 'antd';
import styled from 'styled-components'
import BigNumber from 'bignumber.js'

import { Contract } from 'web3-eth-contract'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import WithdrawModal from '../../../components/WithdrawModal'

import useAllowance from '../../../hooks/useAllowance'
import useApprove from '../../../hooks/useApprove'
import useModal from '../../../hooks/useModal'
import useTokenBalance from '../../../hooks/useTokenBalance'

import { getBalanceNumber } from '../../../utils/formatBalance'

import {useWallet} from "use-wallet";
import useEnter from "../../../hooks/sashimiBar/useEnter";

interface StakeProps {
  sashimiBarContract: Contract
  sushiContract: Contract
  walletLocked: React.ReactElement
  isStart?: boolean
}

const Stake: React.FC<StakeProps> = ({sashimiBarContract, sushiContract, walletLocked, isStart = true}) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { account } = useWallet();

  const allowance = useAllowance(sushiContract, sashimiBarContract);
  const { onApprove } = useApprove(sushiContract, sashimiBarContract);
  const { onEnter } = useEnter(sashimiBarContract);

  const tokenBalance = useTokenBalance(sushiContract ? sushiContract.options.address : null);

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={tokenBalance}
      onConfirm={async (amount) => {
        if (!amount || parseFloat(amount) <= 0) {
          return;
        }
        await onEnter(amount, 18);
      }}
      tokenName={'SASHIMI'}
      modalTitle={'Convert SASHIMI to xSASHIMI'}
    />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      await onApprove()
      setRequestedApproval(false);
    } catch (e) {
      console.log(e)
    }
  }, [onApprove, setRequestedApproval])

  const approveButtom = <Button
    disabled={requestedApproval || !isStart}
    onClick={handleApprove}
    type="primary"
    size="large"
    block
  >
    {`Approve SASHIMI`}
  </Button>;

  const stakingButton = <Button
    disabled={tokenBalance.eq(new BigNumber(0)) || !isStart}
    type="primary"
    size="large"
    block
    onClick={onPresentWithdraw}
  >Staking</Button>;

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>👨🏻‍🍳</CardIcon>
            <Value value={getBalanceNumber(tokenBalance)} />
            <Label text={`Sashimi Tokens Available`} />
          </StyledCardHeader>
          <StyledCardActions>
            {account ? (!allowance.toNumber() ? approveButtom : stakingButton) : walletLocked}
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

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Stake
