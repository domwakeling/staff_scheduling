import { TempleHindu } from "@mui/icons-material";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            
            // used as name/display text in the "vanilla" sign-in form
            name: 'Credentials',
            
            //  details in the object would be used in the vanilla form ...
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },

            // handler to authorise; needs to return a user object of null/false (if not authenticated)
            async authorize(credentials, req) {
                if (credentials.username == 'Admin') {
                    return {
                        id: 1,
                        name: 'Admin',
                        role: 'admin'
                    }
                } else {
                    return {
                        id: 1,
                        name: credentials.username,
                        role: 'user'
                    }
                }
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const res = await fetch("/your/endpoint", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],

    // probably not explicitly required (used when Credentials are used) but include for completeness
    // session: { jwt: true },

    // add the user.role to token, and get it from the token to add to session.user
    // callbacks: {
    //     async jwt({token, user, account, profile, isNewUser}) {
    //         if (user) {
    //             token.role = user.role;
    //         }
    //         return token
    //     },
    //     async session({session, token, user}) {
    //         if (token?.role) {
    //             session.user.role = token.role;
    //         }
    //         return session
    //     }
    // },

    // pages: {
        // signIn: '/auth/signin',
        // signOut: '/', // not needed, we're handling signout silently
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    // },
}

export default NextAuth(authOptions)