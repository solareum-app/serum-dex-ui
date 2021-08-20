import BalancesTable from './BalancesTable';
import OpenOrderTable from './OpenOrderTable';
import React from 'react';
import { Typography } from 'antd';
import FillsTable from './FillsTable';
import FloatingElement from '../layout/FloatingElement';
import {
  useOpenOrders,
  useBalances /* useMarket */,
} from '../../utils/markets';
// import FeesTable from './FeesTable';

const { Paragraph } = Typography;

export default function Index() {
  // const { market } = useMarket();

  return (
    <FloatingElement style={{ flex: 1, paddingTop: 20 }}>
      <Typography style={{ display: 'none' }}>
        <Paragraph style={{ color: 'rgba(255,255,255,0.5)' }}>
          Make sure to go to Balances and click Settle to send out your funds.
        </Paragraph>
        <Paragraph style={{ color: 'rgba(255,255,255,0.5)' }}>
          To fund your wallet, <a href="https://www.sollet.io">sollet.io</a>.
          You can get SOL from FTX, Binance, BitMax, and others. You can get
          other tokens from FTX.{' '}
        </Paragraph>
      </Typography>

      <div>
        <OpenOrdersTab />
        <FillsTable />
        <BalancesTab />

        {/* market && market.supportsSrmFeeDiscounts ? (
          <Section>
            <h3 className="sectionTitle">Fee discounts</h3>
            <FeesTable />
          </Section>
        ) : null */}
      </div>
    </FloatingElement>
  );
}

const OpenOrdersTab = () => {
  const openOrders = useOpenOrders();

  return <OpenOrderTable openOrders={openOrders} />;
};

const BalancesTab = () => {
  const balances = useBalances();

  return <BalancesTable balances={balances} />;
};
