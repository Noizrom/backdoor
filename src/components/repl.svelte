<script lang="ts">
  import { send_command } from '../lib/api'
  import { history } from '../lib/store'

  import Convert from 'ansi-to-html'
  import BuildInCommands from './repl/build-in-commands.svelte'
  import History from './repl/history.svelte'
  import Reports from './repl/reports.svelte'

  const converter = new Convert()

  let value: string
  let loading = false

  async function execute_command(command: string, name?: string) {
    loading = true
    const json_res = await send_command(command)
    if (json_res) {
      const html_stderr = converter.toHtml(json_res.stderr)
      const html_stdout = converter.toHtml(json_res.stdout)

      history.add({
        name,
        command: command,
        id: Date(),
        stderr_raw: json_res.stderr,
        stderr_html: html_stderr,
        stdout_html: html_stdout,
        stdout_raw: json_res.stdout,
      })
    }
    loading = false
  }

  async function submit(form?: SubmitEvent) {
    execute_command(value)
    value = ''
  }
</script>

<style>
  .main-container {
    @apply grid grid-cols-1 lg:grid-cols-2;
  }
</style>

<div class="main-container">
  <form
    action="?"
    on:submit|preventDefault={submit}
    class="form-control gap-2 p-2 place-content-center lg:pt-6">
    <textarea
      bind:value
      name="pypi"
      class="textarea textarea-bordered textarea-accent p-2"
      id=""
      cols="50"
      rows="1" />
    <button type="submit" class="btn btn-primary btn-sm" class:loading>
      run command
    </button>
    <Reports />
  </form>
  <div class="p-2">
    <History {execute_command} />
  </div>
  <div class="p-2 lg:col-span-2 col-span-1">
    <BuildInCommands {execute_command} />
  </div>
</div>
