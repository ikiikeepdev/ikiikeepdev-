import makeWASocket, {
  type WASocket,
  type UserFacingSocketConfig,
  useMultiFileAuthState
} from "@whiskeysockets/baileys";

export { useMultiFileAuthState };
export type { WASocket, UserFacingSocketConfig };

/**
 * Convenience API over an upstream Baileys socket.
 * This wrapper intentionally does not pretend to implement protocol features
 * that the underlying dependency does not support.
 */
export interface IkiikeepdevClient {
  socket: WASocket;
  sendMessage: WASocket["sendMessage"];
  sendText(jid: string, text: string, options?: Record<string, unknown>): ReturnType<WASocket["sendMessage"]>;
  end(error?: Error): void;
}

export function createClient(config: UserFacingSocketConfig): IkiikeepdevClient {
  const socket = makeWASocket(config);

  return {
    socket,
    sendMessage: socket.sendMessage.bind(socket),
    sendText(jid, text, options = {}) {
      // Forward options unchanged. `noSelfSync` is only effective if supported
      // by the installed underlying Baileys implementation.
      return socket.sendMessage(jid, { text }, options as never);
    },
    end(error) {
      socket.end(error);
    }
  };
}
