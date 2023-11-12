import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const storeUser = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        // Check if we've already stored this identity before.
        const user = await ctx.db.query("multi")
            .filter(q => q.eq(q.field("mainCharacter"), identity.name))
            .unique();
        if (user !== null) {
            // If we've seen this identity before but the name has changed, patch the value.
            if (user.name !== identity.name) {
                await ctx.db.patch(user._id, { name: identity.name });
            }
            return user._id;
        }
        // If it's a new identity, create a new `User`.
        return await ctx.db.insert("multi", {
            name: identity.name!,
            email: identity.email!,
            picture: identity.pictureUrl!,
            nickname: identity.nickname!,
            email_verified: identity.emailVerified!,
            updated_at: identity.updatedAt!,
            mainCharacter: "",
            connectedCharacters: "",

        });
    },
});