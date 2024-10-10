//@ts-ignore
import * as iocane from "iocane/web"
const createAdapter: typeof import("iocane").createAdapter = iocane.createAdapter
export async function encrypt(data:string,password:string):Promise<string>{
    let object  = iocane.createAdapter()
    return await object.encrypt(data,password)
}
export async function decrypt(data:string,password:string):Promise<string>{
    let object  = iocane.createAdapter()
    return await object.decrypt(data,password)

}
export async function isValidPassword(data:string,password:string):Promise<boolean>{
    let object = iocane.createAdapter()
    try {
        await object.decrypt(data,password)
        return true
    }
    catch (error) {
        return false
    }
}