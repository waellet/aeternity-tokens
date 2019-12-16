import fungibleToken from './contracts/tokens/fungible/fungible-token';
import allowances from './contracts/tokens/fungible/extensions/allowances';

export function getBasicTokenContract() : string {
  return fungibleToken;
}

export function createAllowancesToken() : string {
  let token = getBasicTokenContract();
  let allowances = getAllowancesExtension();

  token = updateState(token, allowances.state)
  token = updateTypes(token, allowances.types)
  token = updateEvents(token, allowances.events)
  token = updateExtensionsList(token, allowances.name)
  token = updateInit(token, allowances.init)
  token = updateMethods(token, allowances.methods)

  return token;
}

export function updateState(token : string, state : string) : string {
  return token.replace("    // [extension_state]",   `    // [extension_state]  ` + '\n' + `    , ${state}`);
}

export function updateTypes(token : string, types : string) : string {
  return token.replace("// [extension_types]",   `// [extension_types]  ` + '\n' + `  ${types}`);
}

export function updateEvents(token : string, events : string) : string {
  return token.replace("    // [extension_events]",   `    // [extension_events]  ` + '\n' + `${events}`);
}

export function updateExtensionsList(token : string, name : string) : string {
  return token.replace("// [extension_name]",   ` // [extension_name]  ` + '\n' + `    "${name}"`);
}

export function updateInit(token : string, init : string) : string {
  return token.replace("    // [extension_init]",   `    // [extension_init]  ` + '\n' + `     , ${init}`);
}

export function updateMethods(token : string, methods : string) : string {
  return token.replace("// [extension_methods]",   `// [extension_methods]  ` + '\n' + `  ${methods}`);
}

export function getAllowancesExtension() {
  return allowances;
}