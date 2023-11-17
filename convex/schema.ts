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

        /* Player specific data */
        //rules agreed check
        agreed: v.boolean(),

        //user role set at registration
        role: v.string(),

        //serial number
        serial: v.number(),

        //starting character level
        level: v.number(),

        //rank of the character
        rank: v.string(),

        //sex of the player
        sex: v.string(),

        //starting in-game money
        money: v.number(),

        //race select
        raceSelect: v.string(),

        //ability score increase scores
        //strength
        strengthBonus: v.number(),

        //dexterity
        dexterityBonus: v.number(),

        //constitution
        constitutionBonus: v.number(),

        //intelligence
        intelligenceBonus: v.number(),

        //wisdom
        wisdomBonus: v.number(),

        //charisma
        charismaBonus: v.number(),

        /* Other character specific data */
        //languages spokne by the character
        languages: v.string(),

        //outer descriptio of the character
        outerDescription: v.string(),

        //inner description of the character
        innerDescription: v.string(),

        //compulsory bakstory
        backStory: v.string(),

        //take notes for self
        notes: v.string(),

        //gaming style
        gameStyle: v.string(),

        //belief of the character
        belief: v.string(),

        //in-game events recordd by the DMs
        events: v.string(),

        //the backpack contetns of the character
        backpack: v.string(),

        //back contents number in sync with `backpack`
        backpackContents: v.number(),

        //backpack slots multiplied by character level
        backpackSlots: v.number(),

        // `deleted` flag if the user was deleted from Clerk
        deleted: v.optional(v.boolean()),

        //unique token
        tokenIdentifier: v.string(),
    }).index("by_token", ["tokenIdentifier"]),

    multi: defineTable({
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

        //main character for connected characters
        mainCharacter: v.string(),

        //connected characters in Clerk
        connectedCharacters: v.string(),

    }).index("by_mainCharacter", ["mainCharacter"]),
});