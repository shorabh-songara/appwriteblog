import { Client , Account , ID } from "appwrite";
import config from "../config/config";

export class AuthSevice {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email , password , name}) {
            try {
                const userAccount = await this.account.create(
                    ID.unique(),
                    email,
                    password,
                    name,
                )
                if (userAccount) {
                    // call another method like login 
                    return this.login({email , password})
                    
                }else{
                    return userAccount;
                }
                
            } catch (error) {
                throw error;
            }
    }

    async login ({email , password}){
        try {
            return await this.account.createEmailPasswordSession(email , password);
            
        } catch (error) {
            throw error;
            
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("appwrite user :: current user:-" , error  )
        }
        return null;
    }

    async logout({}){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("appwrite user :: logout ::-" , error  )
        }

    }
}

const auth = new AuthSevice();

export default auth;
