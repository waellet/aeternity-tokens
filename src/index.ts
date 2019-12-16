import fungibleToken from './contracts/tokens/fungible/fungible-token';
import allowances from './contracts/tokens/fungible/extensions/allowances';

export function getBasicTokenContract() : string {
  return fungibleToken;
}

export function getAllowancesExtension() {
  return allowances;
}