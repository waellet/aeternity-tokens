module.export = {
  state: 
`
    , allowances : allowances
`,
  types:
`
// This is the format of allowance record type that will be used in the state
record allowance_accounts = { from_account : address, for_account : address }

// This is a type alias for the allowances map
type allowances = map(allowance_accounts, int)
`,
  events:
`
| Allowance(address, address, int)
`,
  init:
`
    , allowances = {}
`,
  methods:
`
// Get the allowances state
entrypoint allowances() : allowances =
  state.allowances

// Get the allowance for passed 'allowance_accounts' record
// returns option(int)
// This will lookup and return the allowed spendable amount
// from one address for another
// If there is no such allowance present result is None
// Otherwise Some(int) is returned with the allowance amount
entrypoint allowance(allowance_accounts : allowance_accounts) : option(int) =
  Map.lookup(allowance_accounts, state.allowances)

// Get the allowance for caller from 'from_account' address
// returns option(int)
// This will look up the allowances and return the allowed spendable amount
// from 'from_account' for the transaction sender 'Call.caller'
// If there is no such allowance present result is None
// Otherwise Some(int) is returned with the allowance amount
entrypoint allowance_for_caller(from_account: address) : option(int) =
  allowance({ from_account = from_account, for_account = Call.caller })

// Send 'value' amount of tokens from address 'from_account' to address 'to_account'
// The transfer_allowance method is used for a withdraw workflow, allowing contracts to send
// tokens on your behalf, for example to "deposit" to a contract address and/or to charge
// fees in sub-token contract.
// The execution will abort and fail if there is no allowance set up previous this call
stateful entrypoint transfer_allowance(from_account: address, to_account: address, value: int) =
  let allowance_accounts = { from_account = from_account, for_account = Call.caller }
  internal_change_allowance(allowance_accounts, -value)
  internal_transfer(from_account, to_account, value)

// Create allowance for 'for_account' to withdraw from your account 'Call.caller',
// multiple times, up to the 'value' amount.
// This function will abort and fail if called again when there is allowance
// already set for these particular accounts pair.
stateful entrypoint create_allowance(for_account: address, value: int) =
  // Chcek if the passed value is not negative
  require_non_negative_value(value)
  // Set the allowance account pair in the memory variable
  let allowance_accounts = { from_account = Call.caller, for_account = for_account }
  // Check if there is no allowance already present in the state
  // for these particular accounts pair.
  require_allowance_not_existent(allowance_accounts)
  // Save the allowance value for these accounts pair in the state
  put(state{ allowances[allowance_accounts] = value })
  // Fire Allowance event to include it in the transaction event log
  Chain.event(Allowance(Call.caller, for_account, value))

// Allows to change the allowed spendable value for 'for_account' with 'value_change'
stateful entrypoint change_allowance(for_account: address, value_change: int) =
  let allowance_accounts = { from_account = Call.caller, for_account = for_account }
  internal_change_allowance(allowance_accounts, value_change)

// Resets the allowance given 'for_account' to zero.
stateful entrypoint reset_allowance(for_account: address) =
  let allowance_accounts = { from_account = Call.caller, for_account = for_account }
  internal_change_allowance(allowance_accounts, - state.allowances[allowance_accounts])

// [extension] allowances_end_5 

// [extension] allowances_start_6
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
  Chain.event(Allowance(allowance_accounts.from_account, allowance_accounts.for_account, new_allowance))

`
}