// import { describe, it, expect, vi } from "vitest";
// import { handleMessage } from "../src/ws/wsHandlers";

// describe("wsHandlers", () => {
//     it("routes chat messages", async () => {
//         const ws = {
//             conversationId: "conv1",
//             send: vi.fn(),
//         };

//         await handleMessage(ws, {
//             type: "chat",
//             message: "Hello",
//         });

//         expect(ws.send).toHaveBeenCalled();
//     });

//     it("handles unknown message type", async () => {
//         const ws = { send: vi.fn() };

//         await handleMessage(ws, { type: "unknown" });

//         expect(ws.send).toHaveBeenCalledWith(
//             expect.stringContaining("error")
//         );
//     });
// });
