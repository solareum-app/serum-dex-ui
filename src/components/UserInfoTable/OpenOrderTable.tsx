import React, { useState } from 'react';

import styled from 'styled-components';
import { Button } from 'antd';
import { cancelOrder } from '../../utils/send';
import { useWallet } from '../../utils/wallet';
import { useSendConnection } from '../../utils/connection';
import { notify } from '../../utils/notifications';
import { DeleteOutlined } from '@ant-design/icons';
import { OrderWithMarketAndMarketName } from '../../utils/types';
import { Section, Item } from './Table';

const CancelButton = styled(Button)`
  color: #f23b69;
`;

export default function OpenOrderTable({
  openOrders,
  onCancelSuccess,
}: {
  openOrders: OrderWithMarketAndMarketName[] | null | undefined;
  onCancelSuccess?: () => void;
  pageSize?: number;
  loading?: boolean;
  marketFilter?: boolean;
}) {
  let { wallet } = useWallet();
  let connection = useSendConnection();
  const [cancelId, setCancelId] = useState(null);

  async function cancel(order) {
    setCancelId(order?.orderId);
    try {
      if (!wallet) {
        return null;
      }

      await cancelOrder({
        order,
        market: order.market,
        connection,
        wallet,
      });
    } catch (e) {
      notify({
        message: 'Error cancelling order',
        description: e.message,
        type: 'error',
      });
      return;
    } finally {
      setCancelId(null);
    }

    onCancelSuccess && onCancelSuccess();
  }

  const dataSource = (openOrders || []).map((order) => ({
    ...order,
    key: order.orderId,
  }));

  return (
    <Section>
      <h3 className="title">Open Orders</h3>
      {!dataSource.length ? (
        <p className="message">No orders found.</p>
      ) : null}
      {dataSource.map(i => (
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
            <div className="label"></div>
            <div>
              <CancelButton
                icon={<DeleteOutlined />}
                onClick={() => cancel(i)}
                loading={cancelId + '' === i?.orderId + ''}
              >
                Cancel
              </CancelButton>
            </div>
          </div>
        </Item>
      ))}
    </Section>
  );
}
