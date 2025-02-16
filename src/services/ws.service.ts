import { SW_SERVER_API_URL } from "@/config/01.constants";
import { ApiService } from "./api.service";
import { SocketBody } from "@/types/socket";

export class WSService {
  static async broadcast(body: SocketBody) {
    return ApiService.post(SW_SERVER_API_URL, body);
  }
}
