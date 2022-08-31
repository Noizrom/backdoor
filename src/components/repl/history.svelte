<script lang="ts">
  import { afterUpdate } from 'svelte'

  import { history, type CommandTransaction } from '../../lib/store'
  export let execute_command: (command: string) => void

  let main

  afterUpdate(() => {
    if (main) {
      main.scrollIntoView()
    }
  })

  let modal_show = false
  let modal_stdout_html = ''
  let modal_stderr_html = ''
  let modal_command_str = ''

  const show_modal_of = (infos: CommandTransaction) => {
    modal_stdout_html = infos.stdout_html
    modal_stderr_html = infos.stderr_html
    modal_command_str = infos.command
    modal_show = true
  }

</script>

<fieldset class="rounded-md border border-accent dark:border-white/30">
  <legend
    class="cursor-pointer inset-x-0 m-auto px-2 font-bold text-2xl text-white
    bg-accent"
    on:click={() => main.scrollIntoView()}>
    History
  </legend>
  <div
    class="h-96 overflow-y-scroll flex flex-col-reverse gap-2 scroll-smooth p-2">
    {#each $history as response}
      <div
        class="w-full text-xs whitespace-pre-line text-left odd:bg-teal-300/10
        even:bg-yellow-400/10 p-2">
        <div
          class="flex flex-row gap-2 justify-between flex-wrap lg:flex-nowrap">
          <h2
            class="text-base font-bold font-mono bg-slate-500/20 rounded-md
            w-full px-2 overflow-hidden text-ellipsis">
            {response.name || response.command}
          </h2>
          <button
            class="btn btn-primary btn-sm"
            on:click={() => {
              execute_command(response.command)
            }}>
            run again
          </button>
          <button
            class="btn btn-info btn-sm"
            on:click={() => {
              show_modal_of(response)
            }}>
            more info
          </button>
          <div
            class="btn btn-error btn-square btn-sm"
            on:click={() => {
              history.remove(response.id)
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-trash"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              stroke-width="1.3"
              stroke="#000000"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </div>
        </div>
      </div>
    {/each}
    <div bind:this={main} />
  </div>
</fieldset>

<input type="checkbox" id="my-modal-4" class="modal-toggle" bind:checked={modal_show} />
<label for="my-modal-4" class="modal cursor-pointer">
  <label class="modal-box relative p-0 rounded-md" for="">
    <h3 class="text-lg font-bold w-full bg-gray-200 text-center">Command information</h3>
    <div class="p-2 flex flex-col gap-1">
      <div class="text-xs whitespace-pre font-mono border rounded-md p-1 shadow overflow-x-scroll">
        <h2 class="pl-2 text-center text-lg font-bold text-success w-full bg-gray-100">STDOUT</h2>
        {@html modal_stdout_html}
      </div>
      <div class="text-xs whitespace-pre font-mono border rounded-md p-1 shadow overflow-x-scroll">
        <h2 class="pl-2 text-center text-lg font-bold text-error w-full bg-gray-100">STDERR</h2>
        {@html modal_stderr_html}
      </div>
    </div>
  </label>
</label>
