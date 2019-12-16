import { Extension } from "./extension";

const name    : string = `allowances`;
const state   : string = `allowances : allowances`;
const types   : string = `
  // This is the format of allowance record type that will be used in the state
  record allowance_accounts = { from_account : address, for_account : address }

  // This is a type alias for the allowances map
  type allowances = map(allowance_accounts, int)`;
  
const events  : string = `    | Allowance(address, address, int)`;
const init    : string = `allowances = {}`;
const methods : string = `
  // Get the allowances state
  entrypoint allowances() : allowances =
    state.allowances

  entrypoint allowance(allowance_accounts : allowance_accounts) : option(int) =
    Map.lookup(allowance_accounts, state.allowances)

  entrypoint allowance_for_caller(from_account: address) : option(int) =
    allowance({ from_account = from_account, for_account = Call.caller })

  stateful entrypoint transfer_allowance(from_account: address, to_account: address, value: int) =
    let allowance_accounts = { from_account = from_account, for_account = Call.caller }
    internal_change_allowance(allowance_accounts, -value)
    internal_transfer(from_account, to_account, value)

  stateful entrypoint create_allowance(for_account: address, value: int) =
    require_non_negative_value(value)
    let allowance_accounts = { from_account = Call.caller, for_account = for_account }
    require_allowance_not_existent(allowance_accounts)
    put(state{ allowances[allowance_accounts] = value })
    Chain.event(Allowance(Call.caller, for_account, value))

  stateful entrypoint change_allowance(for_account: address, value_change: int) =
    let allowance_accounts = { from_account = Call.caller, for_account = for_account }
    internal_change_allowance(allowance_accounts, value_change)

  stateful entrypoint reset_allowance(for_account: address) =
    let allowance_accounts = { from_account = Call.caller, for_account = for_account }
    internal_change_allowance(allowance_accounts, - state.allowances[allowance_accounts])

  function require_allowance_not_existent(allowance_accounts : allowance_accounts) =
    switch(allowance(allowance_accounts))
      None => None
      Some(_) => abort("ALLOWANCE_ALREADY_EXISTENT")

  function require_allowance(allowance_accounts : allowance_accounts, value : int) : int =
    switch(allowance(allowance_accounts))
      Some(allowance) =>
        require_non_negative_value(allowance + value)
        allowance
      None => abort("ALLOWANCE_NOT_EXISTENT")

  stateful function internal_change_allowance(allowance_accounts : allowance_accounts, value_change : int) =
    let allowance = require_allowance(allowance_accounts, value_change)
    let new_allowance = allowance + value_change
    require_non_negative_value(new_allowance)
    put(state{ allowances[allowance_accounts] = new_allowance })
    Chain.event(Allowance(allowance_accounts.from_account, allowance_accounts.for_account, new_allowance))`;

export default new Extension(name, state, types, events, init, methods);