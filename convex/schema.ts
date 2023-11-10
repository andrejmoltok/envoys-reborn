import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        /* Clerk JWT Claims */

        //user.full_name
        name: v.string(),

        //user.primary_email_address
        email: v.string(),

        //user.image_url
        picture: v.string(),

        //user.username
        nickname: v.string(),

        //user.email_verified
        email_verified: v.boolean(),

        //user.updated_at
        updated_at: v.string(),

        //unique token
        tokenIdentifier: v.string(),
    }).index("by_token", ["tokenIdentifier"]),
});