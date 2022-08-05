import React, { useCallback, useMemo, useState } from 'react'

import BigNumber from 'bignumber.js'

import Button from '../Button'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalTitle from '../ModalTitle'
import TokenInput from '../TokenInput'

import { getFullDisplayBalance } from '../../utils/formatBalance'
import {getDecimalByTokenName} from "../../sushi/utils";

export interface WithdrawModalProps extends ModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  tokenName?: string
  modalTitle?: string
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
                                                       onConfirm,
                                                       onDismiss,
                                                       max,
                                                       tokenName = '',
                                                       modalTitle = '',
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
      <ModalTitle text={modalTitle || `Withdraw ${tokenName}`} />
      <TokenInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        <Button text="Cancel" variant="secondary" onClick={onDismiss} />
        <Button
          disabled={pendingTx}
          text={pendingTx ? 'Pending Confirmation' : 'Confirm'}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
          }}
        />
      </ModalActions>
    </Modal>
  )
}

export default WithdrawModal
