import React from 'react'
import styled from 'styled-components'
import {
  Button
} from 'antd';
import Card from '../../Card'
import CardContent from '../../CardContent'
import CardIcon from '../../CardIcon'
import CardTitle from '../../CardTitle'
import Spacer from '../../Spacer'

interface WalletCardProps {
  icon: React.ReactNode,
  onConnect: () => void,
  title: string
}

const WalletCard: React.FC<WalletCardProps> = ({ icon, onConnect, title }) => (
  <Card>
    <CardContent>
      <CardIcon>
        {icon}
      </CardIcon>
      <CardTitle text={title} />
      <Spacer />
      <Button
        onClick={onConnect}
        type="primary"
        size="large"
        block
      >
        Connect
      </Button>
    </CardContent>
  </Card>
)

export default WalletCard
