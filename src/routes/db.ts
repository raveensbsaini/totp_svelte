import * as e from "./encryption"
function assert(value: any): asserts value {
    if (!value) {
        throw new Error("assertion error")
    }
}
const LocalStorageKey = "my_key";
export function dump(data:string){
    localStorage.setItem(LocalStorageKey,data)
}
export function load(){
    return localStorage.getItem(LocalStorageKey)
}

export async function read_from_localstorage(password: string): Promise<string[] | null> {
    assert(await isPasswordValid(password))

    let data = load()
    if (data){
        return JSON.parse(await e.decrypt(data,password))
    }
    else {
        return null
    }
    
}
export async function add_to_localstorage(data: string[], password: string) {
    let new_data = JSON.stringify(data)
    new_data = await e.encrypt(new_data,password)
    dump(new_data)

    

    
}


export async function isPasswordValid(password: string): Promise<boolean> {
    let data = load()
    assert(data !== null)
    return await e.isValidPassword(data,password)


}

export function isDataExists() {




    return load() !== null

}
export async function changePassword(old_password: string, new_password: string) {
    
    assert(await isPasswordValid(old_password))
    let data = await read_from_localstorage(old_password)
    assert(data !== null)
    await add_to_localstorage(data, new_password)


}


export function delete_data() {
    localStorage.removeItem(LocalStorageKey)

}
