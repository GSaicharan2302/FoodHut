import { Metadata } from "./Metadata";

export type Image = {
    id?:string,
    name?:string,
    metadata?:Metadata
    imageData?:ArrayBuffer;
}