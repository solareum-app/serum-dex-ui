import { Button } from 'antd';
import React from 'react';
import {
  useTokenAccounts,
  getSelectedTokenAccountForMint,
} from '../../utils/markets';
import { useSendConnection } from '../../utils/connection';
import { useWallet } from '../../utils/wallet';
import { settleFunds } from '../../utils/send';
import { notify } from '../../utils/notifications';
import { useReferrer } from '../../utils/referrer';
import { Section, Item } from './Table';

export default function BalancesTable({
  balances,
  showMarket,
  hideWalletBalance,
  onSettleSuccess,
}) {
  const [accounts] = useTokenAccounts();
  const connection = useSendConnection();
  const { wallet } = useWallet();
  const { usdcRef, usdtRef } = useReferrer();

  async function onSettleFunds(market, openOrders) {
    try {
      await settleFunds({
        market,
        openOrders,
        connection,
        wallet,
        baseCurrencyAccount: getSelectedTokenAccountForMint(
          accounts,
          market?.baseMintAddress,
        ),
        quoteCurrencyAccount: getSelectedTokenAccountForMint(
          accounts,
          market?.quoteMintAddress,
        ),
        usdcRef,
        usdtRef,
      });
    } catch (e) {
      notify({
        message: 'Error settling funds',
        description: e.message,
        type: 'error',
      });
      return;
    }
    onSettleSuccess && onSettleSuccess();
  }

  return (
    <Section>
      <h3 className="title">Balances</h3>
      {balances.map((i) => (
        <Item key={i.coin}>
          {showMarket ? (
            <div className="itemRow">
              <div className="label">Market</div>
              <div className="value">{i.marketName}</div>
            </div>
          ) : null}
          <div className="itemRow">
            <div className="label">Coin</div>
            <div className="value">{i.coin}</div>
          </div>
          {!hideWalletBalance ? (
            <div className="itemRow">
              <div className="label">Wallet Balance</div>
              <div className="value">{i.wallet}</div>
            </div>
          ) : null}
          <div className="itemRow">
            <div className="label">Orders</div>
            <div className="value">{i.orders}</div>
          </div>
          <div className="itemRow">
            <div className="label">Unsettled</div>
            <div className="value">{i.unsettled}</div>
          </div>
          <div className="itemRow">
            <div className="label"></div>
            <div className="value">
              <Button
                ghost
                onClick={() => onSettleFunds(i.market, i.openOrders)}
              >
                Settle {i.marketName}
              </Button>
            </div>
          </div>
        </Item>
      ))}
    </Section>
  );
}
