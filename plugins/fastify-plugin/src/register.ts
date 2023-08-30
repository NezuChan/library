import "./index.js";

import { FrameworkClient, Plugin, postInitialization, ClientOptions, postLogin } from "@nezuchan/framework";
import fastify from "fastify";
import { container } from "@sapphire/pieces";
import middie from "@fastify/middie";
import { RouteStore } from "./Stores/RouteStore.js";
import { PreHandlerStore } from "./Stores/PreHandlerStore.js";
import { Server } from "socket.io";
import { io } from "socket.io-client";

export class Api extends Plugin {
    public static [postInitialization](this: FrameworkClient, options: ClientOptions): void {
        this.server = fastify(options.api);
        this.socket = new Server(this.server.server, options.socket);
        if (options.remoteSocket?.remote) this.remoteSocket = io(options.remoteSocket.remote, options.remoteSocket);

        this.stores.register(new RouteStore());
        this.stores.register(new PreHandlerStore());
        container.server = this.server;
        container.socket = this.socket;
        container.remoteSocket = this.remoteSocket;
    }

    public static async [postLogin](this: FrameworkClient): Promise<void> {
        await this.server.register(middie);
        await this.server.listen({ port: this.options.api?.port ?? 3000, host: this.options.api?.host ?? "localhost" });
    }
}

FrameworkClient.plugins.registerPostInitializationHook(Api[postInitialization], "API-PostInitialization");
FrameworkClient.plugins.registerPostLoginHook(Api[postLogin], "API-PostLogin");
