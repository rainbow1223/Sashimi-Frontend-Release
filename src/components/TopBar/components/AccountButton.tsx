import React, { useCallback } from 'react'
import styled from 'styled-components'
import {
  Button
} from 'antd';

import { useWallet } from 'use-wallet'

import useModal from '../../../hooks/useModal'
import WalletProviderModal from '../../WalletProviderModal'

import AccountModal from './AccountModal'

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {

  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />, 'provider')

  const { account } = useWallet()

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  return (
    <StyledAccountButton>
      {!account ? (
        <Button
          onClick={handleUnlockClick}
          type="primary"
        >
          Unlock Wallet
        </Button>
      ) : (
        <Button
          onClick={onPresentAccountModal}
          type="primary"
        >
          My Wallet
        </Button>
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div``

export default AccountButton
