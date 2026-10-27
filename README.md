# ikiikeepdev

A staged, testable Baileys-based WhatsApp Web library project. This initial scaffold wraps the upstream Baileys socket and adds a small, testable helper layer. It is **not** a complete independent protocol implementation yet.

## Requirements
- Node.js 20+
- npm
- Git

## Install and test
```bash
npm install
npm test
npm run build
```

## First implemented milestone
- A typed wrapper around a Baileys socket.
- `sendText()` and `sendMessage()` convenience methods.
- `noSelfSync` option is forwarded to the underlying socket call, but its behavior depends on whether the installed upstream version actually supports it. This scaffold does not claim that it is implemented by WhatsApp or by upstream Baileys.
- A bounded reconnect-delay helper with tests.

## Not implemented yet
- A custom protocol stack or independent WhatsApp cryptography.
- Verified `noSelfSync` semantics.
- Custom pairing protocol.
- Channel auto-follow policy or anti-spam channel-follow implementation.
- Automatic protocol/schema updates.
- Guaranteed support for every current message type or all connection errors.

## Example
```ts
import { createClient, useMultiFileAuthState } from "ikiikeepdev";

async function main() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth_info");
  const client = createClient({
    auth: state,
    printQRInTerminal: true
  });

  client.ev.on("creds.update", saveCreds);
  client.ev.on("connection.update", ({ connection }) => {
    if (connection === "open") console.log("Connected");
  });

  // In a real bot, obtain the destination JID from a message or config.
  // await client.sendText("1234567890@s.whatsapp.net", "Hello");
}

main().catch(console.error);
```

## Development roadmap
1. Establish reproducible build/tests and wrapper API.
2. Add integration tests using a dedicated test account and explicit opt-in.
3. Verify supported message payloads against the current upstream package.
4. Implement reconnect policy and connection-state tests.
5. Investigate protocol-level features such as `noSelfSync` only with tests proving actual behavior.
6. Publish to GitHub after choosing the repository URL and reviewing upstream license/attribution.

## License and attribution
This project is scaffolded under MIT. Because it depends on upstream Baileys, review the upstream repository's current license and preserve any required notices before copying or modifying upstream source. A dependency wrapper is not itself a complete fork.
