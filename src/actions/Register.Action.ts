"use server"

import { z } from 'zod'
import { createServerAction } from 'zsa'

export const Register = createServerAction()
    .input(
        z.object({
            password: z.string().min(8, "Password must be at least 8 characters long"),
            email: z.string().email("Invalid email"),
            displayname: z.string().max(12).optional(),
            username: z.string().max(20, "Username cannot be longer than 20 characters.").regex(/^[a-zA-Z0-9]*$/, 'Username cannot contain special characters.').optional()
        }),
        { type: 'formData' },
    )
    .handler(async ({ input }): Promise<void> => {
        const { email, password, displayname, username } = input;

                const response = await fetch(`${process.env.NEXTAUTH_URL}/api/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        fname: displayname,
                        username,
                    }),
                });

                console.log("REGISTER RESPONSE", response)
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error response:', errorData);
                    throw new Error(errorData?.message);
                }

                return get();
            
    });


    function get() {
        
    }