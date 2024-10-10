<script lang="ts">
    import { onMount } from "svelte";
    import { get_totp, is_valid_uri } from "./totp";
    import Viewer from "./Viewer.svelte";
    import * as db from "./db";
    let data: string[] = $state([]);

    let uri = $state("");
    let { password }: { password: string } = $props();

    let totp_value = $derived(uri != "" && get_totp(uri));
    onMount(async () => {
        data = (await db.read_from_localstorage(password)) ?? [];
    });
    let new_passowrd_error_message = $state("This was old password")
    let error_message = $state("")
    let new_password = $state("")
</script>

<div class="m-auto max-w-screen-md p-5">
    <div class=" p-5 flex flex-col gap-4">
        <input
            class="border-2"
            type="text"
            placeholder="enter url"
            bind:value={uri}
        />
        <span class="text-red-800"> { error_message }</span>
        <button
            class=" border-4 border-blue-400 bg-blue-300"
            onclick={async () => {
                if (is_valid_uri(uri)) {
                    if( data.includes(uri)){
                        alert("Already includes") 
                        return 
                    }
                    data.push(uri);
                    await db.add_to_localstorage(data, password);
                }
                else {
                    error_message = "Invalid secret url"
                }
            }}>add</button
        >
    </div>
    <details>
        <summary>Change password?</summary>
        <div class=" p-5 flex flex-col gap-4">
            <input
                class="border-2"
                type="text"
                placeholder="New password"
                bind:value={ new_password }
            />
            {#if new_password === password }
            <span class="text-red-800">{ new_passowrd_error_message}</span>
            {/if}
            <button
                class=" border-4 border-blue-400 bg-blue-300"
                onclick={async () => {
                    await db.changePassword(password,new_password)

                }}>
                change
            </button>
        </div>
    </details>

    {#each data as uri,i}
        <Viewer secret_url={uri} on_delete={async ()=>{
            data = data.slice(0,i).concat(data.slice(i+1))
            await db.add_to_localstorage(data,password)
                
        }} />
    {/each}
</div>
