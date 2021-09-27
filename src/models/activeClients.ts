import { ContrType } from "@/models/controller";

export interface ActiveClients {
  controllers: Map<string, ContrType>;
}
