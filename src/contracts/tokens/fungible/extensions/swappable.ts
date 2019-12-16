import { Extension } from "./extension";

const name    : string = `swappable`;
const state   : string = `swapped : map(address, int)`;
const types   : string = ``;
  
const events  : string = `    | Swap(address, int)`;
const init    : string = `swapped = {}`;
const methods : string =
`
  stateful entrypoint swap() =
    let balance = Map.lookup_default(Call.caller, state.balances, 0)
    burn(balance)
    put(state{ swapped[Call.caller] = balance })
    Chain.event(Swap(Call.caller, balance))

  stateful entrypoint check_swap(account: address) : int =
    Map.lookup_default(account, state.swapped, 0)

  entrypoint swapped() : map(address, int) = state.swapped
`;

export default new Extension(name, state, types, events, init, methods);