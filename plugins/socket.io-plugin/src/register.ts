import { FrameworkClient, Plugin, postInitialization } from "@nezuchan/framework";

export class Socket extends Plugin {
    public static [postInitialization](this: FrameworkClient): void {
        // this.stores.register(new SocketStore());
    }
}

FrameworkClient.plugins.registerPostInitializationHook(Socket[postInitialization], "Socket-PostInitialization");
