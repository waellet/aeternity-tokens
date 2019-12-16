import { Extension } from "./extension";

const name    : string = `mintable`;
const state   : string = ``;
const types   : string = ``;
  
const events  : string = `    | Mint(address, int)`;
const init    : string = ``;
const methods : string = 
`
  stateful entrypoint mint(account: address, value: int) =
    require_owner()
    require_non_negative_value(value)
    put(state{ total_supply = state.total_supply + value, balances[account = 0] @ b = b + value })
    Chain.event(Mint(account, value))
`;

export default new Extension(name, state, types, events, init, methods);