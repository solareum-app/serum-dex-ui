import Wallet from '@project-serum/sol-wallet-adapter';
import { notify } from '../../utils/notifications';

export function SolareumAdapter(_, network) {
  const solareum = (window as any).solareum;
  if (solareum) {
    return new Wallet(solareum, network);
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