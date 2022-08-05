import React, { useCallback } from 'react'
import {
  Button
} from 'antd';
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useYam from '../../../hooks/useYam'
import {
  LogoImg
} from '../../Logo/Logo';
import { getSushiAddress } from '../../../sushi/utils'

import useTokenBalance from '../../../hooks/useTokenBalance'
import {
  getDisplayBalance,
  getBalanceNumber,
} from '../../../utils/formatBalance'

import CardIcon from '../../CardIcon'
import Label from '../../Label'
import Modal, { ModalProps } from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Separator from '../../Separator'
import Spacer from '../../Spacer'
import Value from '../../Value'
import {getEthChainInfo} from "../../../utils/getEthChainInfo";

const {
  ethscanType
} = getEthChainInfo();

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, reset } = useWallet()

  const handleSignOutClick = useCallback(() => {
    onDismiss!()
    reset()
  }, [onDismiss, reset])

  const yam = useYam()
  const sushiBalance = useTokenBalance(getSushiAddress(yam))

  return (
    <Modal>
      <ModalTitle text="My Account" />
      <ModalContent>
        <Spacer />

        <div style={{ display: 'flex' }}>
          <StyledBalanceWrapper>
            <CardIcon>
              <LogoImg />
            </CardIcon>
            <StyledBalance>
              <Value value={getBalanceNumber(sushiBalance)} />
              {/*<Label text="SUSHI Balance" />*/}
              <Label text="SASHIMI Balance" />
            </StyledBalance>
          </StyledBalanceWrapper>
        </div>

        <Spacer />
        <Button
          href={`https://${ethscanType}etherscan.io/address/${account}`}
          size="large"
          block
          type="primary"
        >View on Etherscan</Button>
        <Spacer />
        <Button
          onClick={handleSignOutClick}
          block
          size="large"
          type="primary"
        >Sign out</Button>
      </ModalContent>
      <ModalActions>
        <Button
          onClick={onDismiss}
          size="large"
          block
        >
          Cancel
        </Button>
      </ModalActions>
    </Modal>
  )
}

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

export default AccountModal
