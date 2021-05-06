import { configs } from "../../configs.ts";
import { bot } from "../../deps.ts";
import { PermissionLevels } from "../types/commands.ts";

// The member using the command must be one of the bots dev team
bot.permissionLevels.set(
  PermissionLevels.BOT_OWNER,
  (message) => configs.userIds.botOwners.includes(message.authorId.toString()),
);
