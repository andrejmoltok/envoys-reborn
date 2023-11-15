import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Insert or update the user in a Convex table then return the document's ID.
 *
 * The `UserIdentity.tokenIdentifier` string is a stable and unique value we use
 * to look up identities.
 *
 * Keep in mind that `UserIdentity` has a number of optional fields, the
 * presence of which depends on the identity provider chosen. It's up to the
 * application developer to determine which ones are available and to decide
 * which of those need to be persisted. For Clerk the fields are determined
 * by the JWT token's Claims config.
 */
export const storeUser = mutation({
  args: {
    sex: v.string(),
    serial: v.string(),
    raceSelect: v.string(),
    gameStyle: v.string(),
    agreed: v.boolean(),
    charismaBonus: v.number(),
    constitutionBonus: v.number(),
    dexterityBonus: v.number(),
    intelligenceBonus: v.number(),
    strengthBonus: v.number(),
    wisdomBonus: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Check if we've already stored this identity before.
    const user = await ctx.db.query("users")
      .filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
      .unique();
    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name });
      }
      return user._id;
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      name: identity.name!,
      email: identity.email!,
      picture: identity.pictureUrl!,
      nickname: identity.nickname!,
      email_verified: identity.emailVerified!,
      updated_at: identity.updatedAt!,
      agreed: args.agreed,
      role: "User",
      serial: args.serial,
      level: 1,
      rank: "beginner",
      sex: args.sex,
      money: 50,
      raceSelect: args.raceSelect,
      strengthBonus: args.charismaBonus,
      dexterityBonus: args.dexterityBonus,
      constitutionBonus: args.constitutionBonus,
      intelligenceBonus: args.intelligenceBonus,
      wisdomBonus: args.wisdomBonus,
      charismaBonus: args.charismaBonus,
      languages: "",
      outerDescription: "",
      innerDescription: "",
      backStory: "",
      notes: "",
      gameStyle: args.gameStyle,
      belief: "",
      events: "",
      backpack: "",
      backpackContents: 0,
      backpackSlots: 3,
      tokenIdentifier: identity.tokenIdentifier,
    });
  },
});

export const readAllUsers = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query("users").collect();
  },
});

export const readLoggedInId = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called readLoggedInId without authentication present");
    }

    const user = await ctx.db.query("users")
      .filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier!))
      .unique();

    if (user !== null) {
      return user?._id;
    }
  }
});

export const readUserById = query({
  args: {},
  handler: async (ctx, args) => {
    const id = await readLoggedInId(ctx, args);
    return await ctx.db.query("users")
      .filter(q => q.eq(q.field("_id"), id))
      .unique();
  }
});

export const addSerial = query({
  args: {},
  handler: async (ctx, args) => {
    const userCount = await readAllUsers(ctx, args);
    return ('#' + (userCount.length + 1)).toString();
  },
});