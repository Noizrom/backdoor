<script lang="ts">
  export let execute_command: (command: string, name?: string) => void

  const build_in_commands = [
    {
      name: 'toggle-mute',
      id: Date(),
      command: '$obj = new-object -com wscript.shell;$obj.SendKeys([char]173)',
    },
    {
      name: 'wifi-off',
      id: Date(),
      command: 'netsh interface set interface "Wi-Fi" disable',
    },
    {
      name: 'wifi-on',
      id: Date(),
      command: 'netsh interface set interface "Wi-Fi" enable',
    },
  ]
</script>

<fieldset
  class="border border-accent rounded-md p-2 h-fit bg-accent drop-shadow-xl">
  <legend
    class="inset-x-0 m-auto px-2 font-bold text-2xl text-white bg-accent
    rounded-md">
    Common Commands
  </legend>
  <div class="flex flex-row gap-2 justify-evenly lg:justify-start">
    {#each build_in_commands as command}
      <button
        class="btn btn-secondary drop-shadow-xl"
        on:click={() => execute_command(command.command, command.name)}>
        {command.name}
      </button>
    {/each}
  </div>
</fieldset>
