<script lang="ts">
    import * as db from "./db";
    import Main from "./Main.svelte";
    let password = $state("");
    let is_data = $state(db.isDataExists());
    let is_valid_password = $state(false);
    let error_message = $state("");
    async function unlock(password: string) {
        is_valid_password = await db.isPasswordValid(password);
        if (!is_valid_password) {
            error_message = "Invalid Password";
        }
    }
    async function set(password: string) {
        await db.add_to_localstorage([], password);
        is_valid_password = await db.isPasswordValid(password)
        is_data = await db.isDataExists();
            }
</script>

{#if !is_data}
    <div class="m-auto max-w-screen-md p-5">
        <h1>You are new here. Please create a password</h1>
        <div class=" p-5 flex flex-col gap-4">
            <input
                class="border-2"
                type="text"
                placeholder="enter password"
                bind:value={password}
            />
            <span class="text-red-800">{error_message}</span>
            <button
                class=" border-4 border-blue-400 bg-blue-300"
                onclick={async () => await set(password)}>set</button
            >
            
        </div>
    </div>
{:else if !is_valid_password}
    <div class="m-auto max-w-screen-md p-5">
        <h1>
            This vault is current locked. Please enter your password to unlock.
        </h1>
        <div class=" p-5 flex flex-col gap-4">
            <input
                class="border-2"
                type="text"
                placeholder="enter password"
                bind:value={password}
            />
            <span class="text-red-800">{error_message}</span>
            <button
                class=" border-4 border-blue-400 bg-blue-300"
                onclick={async () => await unlock(password)}>unlock</button
            >
            <details>
                <summary>Reset password?</summary>
                <button
                    class=" border-4 border-red-400 bg-red-300"
                    onclick={async () =>{
                        db.delete_data()
                        is_data = db.isDataExists()
                    }}>Delete data</button
                >
            </details>
        </div>
    </div>
{:else}
    <Main {password} />
{/if}
