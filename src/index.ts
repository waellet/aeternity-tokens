import allowances from "./contracts/tokens/fungible/extensions/allowances";
import burnable from "./contracts/tokens/fungible/extensions/burnable";
import { Extension } from "./contracts/tokens/fungible/extensions/extension";
import mintable from "./contracts/tokens/fungible/extensions/mintable";
import swappable from "./contracts/tokens/fungible/extensions/swappable";
import fungibleToken from "./contracts/tokens/fungible/fungible-token";

const extensions: { [id: string]: Extension } = {
  allowances: allowances,
  mintable: mintable,
  burnable: burnable,
  swappable: swappable
};

export function getBasicTokenContract(): string {
  return fungibleToken;
}

export function newToken(extensionsList: Array<string> = []): string {
  let token = getBasicTokenContract();
  extensionsList.forEach(extension => {
    token = addExtension(token, extensions[extension]);
  });

  return extensionsList.length >= 1
    ? updateExtensionsList(token, extensionsList)
    : token;
}

function addExtension(token: string, extension: any): string {
  token = updateState(token, extension.state);
  token = updateTypes(token, extension.types);
  token = updateEvents(token, extension.events);
  token = updateInit(token, extension.init);
  token = updateMethods(token, extension.methods);
  return token;
}

function updateState(token: string, state: string): string {
  return state.length > 1
    ? token.replace(
        "    // [extension_state]",
        `    // [extension_state]  ` + "\n" + `    , ${state}`
      )
    : token;
}

function updateTypes(token: string, types: string): string {
  return types.length > 1
    ? token.replace(
        "// [extension_types]",
        `// [extension_types]  ` + "\n" + `  ${types}`
      )
    : token;
}

function updateEvents(token: string, events: string): string {
  return events.length > 1
    ? token.replace(
        "    // [extension_events]",
        `    // [extension_events]  ` + "\n" + `${events}`
      )
    : token;
}

function updateExtensionsList(
  token: string,
  extensionList: Array<string>
): string {
  return token.replace(
    "// [extension_name]",
    ` // [extension_name]  ` +
      "\n" +
      `    ${`"` + extensionList.join('", "') + `"`}`
  );
}

function updateInit(token: string, init: string): string {
  return init.length > 1
    ? token.replace(
        "    // [extension_init]",
        `    // [extension_init]  ` + "\n" + `     , ${init}`
      )
    : token;
}

function updateMethods(token: string, methods: string): string {
  return methods.length > 1
    ? token.replace(
        "// [extension_methods]",
        `// [extension_methods]  ` + "\n" + `  ${methods}`
      )
    : token;
}
