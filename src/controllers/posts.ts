// import { Request, Response } from 'express';
// import { collections } from '../config/database';
// import * as mongodb from "mongodb";
// import { } from "../services/posts";



// export const  getPosts = async (req: Request, res: Response) => {
//   try {
//     const  posts = await collections.posts.find({}).toArray();
//     res.status(200).send(posts);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// export const  getPostById = async (req: Request, res: Response) => {
//   try {
//     const id = req?.params?.id;
//     const query = { _id: new mongodb.ObjectId(id) };
//     const  post = await collections.posts.findOne(query);
//     if (!post) {
//       return res.status(404).send('post not found');
//     }
//     res.status(200).send(post);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// export const  createPost = async (req: Request, res: Response) => {
//   try {
//     const post = req.body;
//     const result = await collections.posts.insertOne (post);
//     if (result.acknowledged) {
//       res.status(201).send(`Se creo una nueva post: ID ${result.insertedId}.`);
//   } else {
//       res.status(500).send("Falló crear una nueva post.");
//   }
//   } catch (error) {
//     console.error(error);
//     res.status(400).send(error.message);
//   }
// };
 

  

// export const  updatePost = async (req: Request, res: Response) => {
//   try {
//     const id = req?.params?.id;
//     const post = req.body;
//     const query = { _id: new mongodb.ObjectId(id) };
//     const  result = await collections.posts.replaceOne(query, post);
//     if (result.modifiedCount === 0) {
//       return res.status(404).send('post not found');
//     }
//     res.status(200).send(await collections.posts.findOne(query));
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };
// export const  deletePost = async (req: Request, res: Response) => {
//   try {
//     const id = req?.params?.id;
//     const query = { _id: new mongodb.ObjectId(id) };
//     const result = await collections.posts.deleteOne(query);
//     if (result && result.deletedCount) {
//       res.status(202).send(`Post eliminado: ID ${id}`);
//   } else if (!result) {
//       res.status(400).send(`Falló eliminar post: ID ${id}`);
//   } else if (!result.deletedCount) {
//       res.status(404).send(`Fallo eliminar post: ID ${id}`);
//   }
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };




