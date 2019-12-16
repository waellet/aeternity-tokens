import { Extension } from "./extension";

const name    : string = `burnable`;
const state   : string = ``;
const types   : string = ``;
  
const events  : string = `    | Burn(address, int)`;
const init    : string = ``;
const methods : string =
`
  stateful entrypoint burn(value: int) =
    require_balance(Call.caller, value)
    require_non_negative_value(value)
    put(state{ total_supply = state.total_supply - value, balances[Call.caller] @ b = b - value })
    Chain.event(Burn(Call.caller, value))
`;

export default new Extension(name, state, types, events, init, methods);