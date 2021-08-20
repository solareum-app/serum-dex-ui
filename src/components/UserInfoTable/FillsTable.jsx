import React from 'react';
import { useFills, useMarket } from '../../utils/markets';
import { Section, Item } from './Table';

export default function FillsTable() {
  const fills = useFills();
  const { quoteCurrency } = useMarket();
  const dataSource = (fills || []).map((fill) => ({
    ...fill,
    key: `${fill.orderId}${fill.side}`,
    liquidity: fill.eventFlags.maker ? 'Maker' : 'Taker',
  }));

  return (
    <Section>
      <h3 className="title">Recent Trade</h3>
      {!dataSource.length ? <p className="message">No trades found.</p> : null}
      {dataSource.map((i) => (
        <Item key={i.key}>
          <div className="itemRow">
            <div className="label">{i.marketName}</div>
            <div className={`value ${i.side}`}>{i.side}</div>
          </div>
          <div className="itemRow">
            <div className="label">Size</div>
            <div className="value">{i.size}</div>
          </div>
          <div className="itemRow">
            <div className="label">Price</div>
            <div className="value">{i.price}</div>
          </div>
          <div className="itemRow">
            <div className="label">Liquidity</div>
            <div className="value">{i.liquidity}</div>
          </div>
          <div className="itemRow">
            <div className="label">
              {quoteCurrency ? `Fees (${quoteCurrency})` : 'Fees'}
            </div>
            <div className="value">{i.feeCost}</div>
          </div>
        </Item>
      ))}
    </Section>
  );
}
