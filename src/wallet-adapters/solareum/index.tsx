import Wallet from '@project-serum/sol-wallet-adapter';
import { notify } from '../../utils/notifications';

export function SolareumAdapter(_, network) {
  const solana = (window as any).solana;
  if (solana) {
    return new Wallet(solana, network);
  }

  return {
    on: () => {},
    connect: () => {
      notify({
        message: 'Solareum Extension Error',
        description: 'Please install the Solareum Extension for Chrome',
      });
    }
  }
}