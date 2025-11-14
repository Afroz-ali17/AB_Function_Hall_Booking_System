import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer } from "better-auth/plugins";
import { NextRequest } from 'next/server';
import { headers } from "next/headers"
import { db } from "@/db";
import { logRegistration, logLogin } from "./google-sheets";
 
export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
	}),
	emailAndPassword: {    
		enabled: true
	},
	plugins: [bearer()],
	// Temporarily disable hooks to fix authentication
	// TODO: Re-enable with proper error handling once auth is working
	// hooks: {
	// 	after: [
	// 		{
	// 			matcher: () => true,
	// 			handler: async (ctx) => {
	// 				// Track user registration
	// 				if (ctx.request.url.includes("/sign-up/email") && ctx.context?.user) {
	// 					try {
	// 						await logRegistration({
	// 							userId: ctx.context.user.id,
	// 							name: ctx.context.user.name,
	// 							email: ctx.context.user.email,
	// 							timestamp: new Date().toISOString(),
	// 						});
	// 					} catch (error) {
	// 						console.error("Failed to log registration:", error);
	// 					}
	// 				}
	// 				
	// 				// Track user login
	// 				if (ctx.request.url.includes("/sign-in/email") && ctx.context?.session) {
	// 					try {
	// 						const ipAddress = ctx.request.headers.get("x-forwarded-for") || 
	// 						                  ctx.request.headers.get("x-real-ip") || 
	// 						                  null;
	// 						const userAgent = ctx.request.headers.get("user-agent") || null;
	// 						
	// 						await logLogin({
	// 							userId: ctx.context.session.userId,
	// 							email: ctx.context.user?.email || "unknown",
	// 							timestamp: new Date().toISOString(),
	// 							ipAddress,
	// 							userAgent,
	// 						});
	// 					} catch (error) {
	// 						console.error("Failed to log login:", error);
	// 					}
	// 				}
	// 			},
	// 		},
	// 	],
	// },
});

// Session validation helper
export async function getCurrentUser(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user || null;
}