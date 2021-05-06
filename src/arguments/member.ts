import { bot, cache, fetchMembers, snowflakeToBigint } from "../../deps.ts";

bot.arguments.set("member", {
  name: "member",
  execute: async function (_argument, parameters, message) {
    const [id] = parameters;
    if (!id) return;

    const guild = cache.guilds.get(message.guildId);
    if (!guild) return;

    const userId = id.startsWith("<@")
      ? id.substring(id.startsWith("<@!") ? 3 : 2, id.length - 1)
      : id;

    const cachedMember = cache.members.get(snowflakeToBigint(userId));
    if (cachedMember?.guilds.has(message.guildId)) return cachedMember;

    const cached = cache.members.find(
      (member) =>
        member.guilds.has(message.guildId) &&
        member.tag.toLowerCase().startsWith(userId.toLowerCase()),
    );
    if (cached) return cached;

    if (userId.length < 17) return;

    if (!Number(userId)) return;

    console.log("Fetching a member with Id from gateway", userId);

    // TODO: fix this
    const member = await fetchMembers(guild.id, {
      userIds: [userId],
    }).catch(console.log);
    if (!member) return;

    return member.first();
  },
});
