import config from "../config/config";
import { Client , Databases , Storage , ID, Query } from "appwrite";

export class BlogsAppwrtie{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }


    async createPost({title , slug , content , featuredImg , status , userId }){
        try {
            await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImg,
                    userId,
                    status
                }
                

            )
            
        } catch (error) {
            console.log("appwrite error :: document :--" , error)
        }
    }

    
    async updatePost(slug , {title ,content , featuredImg , status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title ,
                    content,
                    featuredImg,
                    status,

                }
            )
            
        } catch (error) {
            console.log("appwrite  error :: updateddoc :--", error )
        }

    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
            
        } catch (error) {
            console.log("appwrite error :: deletedoc :- ", error)
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,

            )
        } catch (error) {
            console.log('appwrite error ::getdoc :-  ', error )
            return false;
        }
    }

    async listPosts(queries = [Query.equal("status" , "active")]){
        try {
            return await  this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
            
        } catch (error) {
            console.log("appwrtie error :: listdocuments :- " , error);
            return false;
        }
    }

    //file upload services 

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("appwrite error :: upload file :-", error)
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId,
            )
            return true;
        } catch (error) {
            console.log("appwrite error :: deletefile :- ", error);
            return false;
        }
    }

    getfilePrev(fileId){
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId, 
            )   
        } catch (error) {
            console.log("appwrite error :: getfilepreview :- ", error);
            return false;
        }
    }

}

const blogs = new BlogsAppwrtie();

export default blogs;