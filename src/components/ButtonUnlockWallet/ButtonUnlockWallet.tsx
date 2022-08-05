import React, { useEffect} from 'react'
import useModal from "../../hooks/useModal";
import WalletProviderModal from "../WalletProviderModal";
import {Button} from "antd";

const ButtonUnlockWallet: React.FC = () => {
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />, 'provider');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Button
    onClick={onPresentWalletProviderModal}
    type="primary"
    size="large"
    block
  >Unlock Wallet</Button>;
};

export default ButtonUnlockWallet;
