import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from 'mongodb';
import { Console } from 'console';

export default NextAuth({

    providers: [
        
        CredentialsProvider(<any>{
            name: "Credentials",
            credentials: {
                name: { label: "Username", type: "text", placeholder: "jsmith" },
                password: {  label: "Password", type: "password" }
              },
            async authorize(credentials: any) {
                const client = await MongoClient.connect('mongodb://localhost:27017');

                const users = await client.db('foodapp').collection('users');

                const result = await users.findOne({name: credentials.name});
                if (!result) {
                    client.close();
                    throw new Error('No user found with this username');
                }
                if (!credentials.password == result.password) {
                    client.close();
                    throw new Error('Password doesnt match');
                }
                client.close();
                return {name:{
                    name: result.name,
                    admin: result.isAdmin,
                    courier: result.isCourier,
                }}
            },
        }),
    ],
    secret: process.env.JWT_SECRET 
});
