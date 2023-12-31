import { FastifyInstance, FastifyServerOptions } from "fastify";
import { PreHandlerStore } from "./Stores/PreHandlerStore.js";
import { RouteStore } from "./Stores/RouteStore.js";
import { Server, ServerOptions } from "socket.io";
import { Socket, SocketOptions } from "socket.io-client";

export * from "./Lib/Prehandlers/PrehandlerContainerArray.js";
export * from "./Lib/Prehandlers/PrehandlerContainerSingle.js";
export * from "./Lib/Prehandlers/IPrehandlerContainer.js";

export * from "./Lib/Prehandlers/Conditions/IPrehandlerCondition.js";
export * from "./Lib/Prehandlers/Conditions/PrehandlerConditionAnd.js";
export * from "./Lib/Prehandlers/Conditions/PrehandlerConditionOr.js";

export * from "./Stores/PreHandler.js";
export * from "./Stores/PreHandlerStore.js";
export * from "./Stores/Route.js";
export * from "./Stores/RouteStore.js";

export * from "./Errors/ApiError.js";


declare module "@nezuchan/core" {
    interface Client {
        server: FastifyInstance;
        socket: Server;
        remoteSocket?: Socket;
    }

    interface ClientOptions {
        api?: FastifyServerOptions & { port?: number; host?: string };
        socket?: Partial<ServerOptions>;
        remoteSocket?: Partial<SocketOptions> & { remote?: string };
    }
}

declare module "@sapphire/pieces" {
    interface StoreRegistryEntries {
        routes: RouteStore;
        "pre-handlers": PreHandlerStore;
    }

    interface Container {
        server: FastifyInstance;
        socket: Server;
        remoteSocket?: Socket;
    }
}
