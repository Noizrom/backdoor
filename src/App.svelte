<script lang="ts">
  import Tester from './components/tester.svelte'
  import Repl from './components/repl.svelte'
  import { onMount } from 'svelte'
  import { send_command } from './lib/api'
  import { errors, ErrorType } from './lib/store'

  let computer_name = 'null'

  onMount(async () => {
    const cached_hostname = localStorage.getItem('hostname')
    if (cached_hostname) {
      computer_name = cached_hostname
    } else {
      const command_query = await send_command('hostname')
      if (command_query.stdout) {
        localStorage.setItem('hostname', command_query.stdout)
        computer_name = command_query.stdout
      } else {
        errors.add({
          id: Date(),
          message: command_query.stderr,
          time: new Date().getTime(),
          type: ErrorType.server_error,
        })
      }
    }
  })
</script>

<div class="drawer">
  <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex lg:flex-row flex-col relative">
    <!-- Navbar -->
    <div class="lg:w-fit w-full navbar flex flex-row lg:flex-col bg-base-300">
      <div class="flex-none lg:hidden">
        <label for="my-drawer-3" class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-6 h-6 stroke-current">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
      </div>
      <div class="flex-1 px-2 mx-2 flex lg:flex-col flex-row gap-2">
        <div class="font-bold text-lg">{computer_name}</div>
        <div>{location.hostname}</div>
      </div>
      <div class="flex-none hidden lg:block">
        <ul class="menu menu-vertical">
          <li>
            <a>Navbar Item 1</a>
          </li>
          <li>
            <a>Navbar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- Page content here -->
    <div class="shadow-lg bg-base-300/90 h-full grow">
      <Repl />
    </div>
  </div>
  <div class="drawer-side">
    <label for="my-drawer-3" class="drawer-overlay" />
    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100/70 backdrop-blur-sm">
      <li>
        <a>Sidebar Item 1</a>
      </li>
      <li>
        <a>Sidebar Item 2</a>
      </li>
    </ul>

  </div>
</div>
