import fungibleToken from './contracts/tokens/fungible/fungible-token';
import allowances from './contracts/tokens/fungible/extensions/allowances';
import mintable from './contracts/tokens/fungible/extensions/mintable';
import burnable from './contracts/tokens/fungible/extensions/burnable';
import swappable from './contracts/tokens/fungible/extensions/swappable';
import { Extension } from './contracts/tokens/fungible/extensions/extension';

var extensions : { [id : string] : Extension; } = {};
extensions["allowances"] = allowances;
extensions["mintable"] = mintable;
extensions["burnable"] = burnable;
extensions["swappable"] = swappable;

export function getBasicTokenContract() : string {
  return fungibleToken;
}

export function newToken(extensionsList : Array<string> = []) : string {
  let token = getBasicTokenContract();
  let multiple = false;
  extensionsList.forEach((extension) => {
    token = addExtension(token, extensions[extension], multiple);
    multiple = extensionsList.length > 1;
  })

  return token;
}

export function addExtension(token : string, extension : any, multiple: boolean = false) : string {
  let memory_token = token;
  memory_token = updateState(memory_token, extension.state)
  memory_token = updateTypes(memory_token, extension.types)
  memory_token = updateEvents(memory_token, extension.events)
  memory_token = updateExtensionsList(memory_token, extension.name, multiple)
  memory_token = updateInit(memory_token, extension.init)
  memory_token = updateMethods(memory_token, extension.methods)
  return memory_token;
}

export function updateState(token : string, state : string) : string {
  if (state.length > 1) {
    return token.replace("    // [extension_state]",   `    // [extension_state]  ` + '\n' + `    , ${state}`);
  }
  return token;
}

export function updateTypes(token : string, types : string) : string {
  if (types.length > 1) {
    return token.replace("// [extension_types]",   `// [extension_types]  ` + '\n' + `  ${types}`);
  }
  return token;
}

export function updateEvents(token : string, events : string) : string {
  if (events.length > 1) {
    return token.replace("    // [extension_events]",   `    // [extension_events]  ` + '\n' + `${events}`);
  }
  return token;
}

export function updateExtensionsList(token : string, name : string, multiple : boolean) : string {
  if (name.length > 1) {
    if (!multiple) {
      return token.replace("// [extension_name]",   ` // [extension_name]  ` + '\n' + `    , "${name}"`);
    } else {
      return token.replace("// [extension_name]",   ` // [extension_name]  ` + '\n' + `    "${name}"`);
    }
  }
  return token;
}

export function updateInit(token : string, init : string) : string {
  if (init.length > 1) {
    return token.replace("    // [extension_init]",   `    // [extension_init]  ` + '\n' + `     , ${init}`);
  }
  return token;
}

export function updateMethods(token : string, methods : string) : string {
  if (methods.length > 1) {
    return token.replace("// [extension_methods]",   `// [extension_methods]  ` + '\n' + `  ${methods}`);
  }
  return token;
}