<script lang="ts">
    import { ClipboardCopy } from "lucide-svelte";
    import { get_details_uri, get_totp } from "./totp";



    let {secret_url,on_delete}: {secret_url: string,on_delete:()=> {}}  = $props();
    let copied = $state(false);



   let now  = $state(Date.now())
   setInterval(()=>{
    now = Date.now()
   },100)
   let details = $derived(get_details_uri(secret_url,now))
</script>
<div class="border-2 flex justify-between">
    <div>
        {details.parsed.issuer } 
        <button
        class="{copied?"text-green-400":""} transition-all" onclick={async ()=>{
            await navigator.clipboard.writeText(details.totp)
            copied = true
            setInterval(()=>{
                copied = false
            },400)

        }}>{ details.totp } 
        <ClipboardCopy  class="inline-block"/>
        </button>
    </div>
    <div>
  <progress max={ details.parsed.period} value = { details.remaining_time}></progress>
  <button class="text-red-500 hover:bg-red-300" onclick={ async ()=>{
    await on_delete()
  }}>Delete</button>
  </div>
</div>
