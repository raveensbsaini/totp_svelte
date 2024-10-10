import { test,describe,expect } from "vitest";
import * as e from "./encryption"
describe("encryption",()=>{
    test("it sould work",()=>{
        let password = "This is a password"
        let data = "This is data"
        let encrypted_data = e.encrypt(data,password) 
        expect(e.decrypt(data,password)).toStrictEqual(password)
    })
    test("it shoudl throw an error",()=>{
        let  password = "This is a password"
        let data = "This is a data"
        let encrypt_data = e.encrypt(data,password)
        expect(e.decrypt(data,"This is a wrong password"))
    })
})