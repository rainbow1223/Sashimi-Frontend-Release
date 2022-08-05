import React, { useCallback, useMemo, useState } from 'react'
import {
  Button
} from 'antd';

import BigNumber from 'bignumber.js'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalTitle from '../ModalTitle'
import TokenInput from '../TokenInput'

import { getFullDisplayBalance } from '../../utils/formatBalance'
import {getDecimalByTokenName} from "../../sushi/utils";

export interface DepositModalProps extends ModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  tokenName?: string
  modalTitle?: string
}

const DepositModal: React.FC<DepositModalProps> = ({
                                                     max,
                                                     onConfirm,
                                                     onDismiss,
                                                     tokenName = '',
                                                     modalTitle = ''
                                                   }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)

  const decimal = getDecimalByTokenName(tokenName);

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, decimal)
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal>
      <ModalTitle text={modalTitle || `Deposit ${tokenName} Tokens`} />
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        <Button
          onClick={onDismiss}
          size="large"
          block
        >
          Cancel
        </Button>
        <Button
          disabled={pendingTx}
          type="primary"
          size="large"
          block
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? 'Pending Confirmation' : 'Confirm'}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default DepositModal
