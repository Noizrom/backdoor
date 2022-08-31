<script lang="ts">
  import { errors, ErrorType } from './../../lib/store'
  import { DateTime } from 'luxon'
</script>

<fieldset class="border border-error rounded-md p-2 h-full">
  <legend class="inset-x-0 m-auto px-2 font-bold text-2xl text-white bg-error">
    Errors Encountered
  </legend>
  <div class="flex flex-row-reverse gap-2 flex-wrap h-28">
    {#each $errors as err}
      <div class="bg-yellow-300 rounded-lg p-2">
        <h1>{err.message}</h1>
        <p class="text-red-400 font-bold text-lg">{ErrorType[err.type]}</p>
        <p class="badge">{DateTime.fromMillis(err.time).toRelative()}</p>
      </div>
    {/each}
  </div>
</fieldset>
