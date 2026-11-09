<script lang="ts">
  import { type Token, type Tokens } from "marked"

  import { concat } from "../../lib/utils"
  import Table from "../Content/Table.svelte"
  import Inlines from "./Inlines.svelte"

  export let token: Token
  export let last: boolean

  const table = token as Tokens.Table

  const alignClass = (align: Tokens.TableCell["align"]) => {
    if (align === "center") return "text-center"
    if (align === "right") return "text-right"
    return "text-left"
  }

  const cellClass = (align: Tokens.TableCell["align"]) => concat([
    "border",
    "border-gray-400",
    "dark:border-gray-600",
    "px-2",
    "py-1",
    "align-top",
    alignClass(align),
  ])

  const headerClass = (align: Tokens.TableCell["align"]) => concat([
    cellClass(align),
    "font-bold",
    "bg-gray-200",
    "dark:bg-gray-700",
  ])
</script>

<Table {last}>
  <thead>
    <tr>
      {#each table.header as cell}
        <th class={headerClass(cell.align)}>
          <Inlines tokens={cell.tokens} />
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each table.rows as row}
      <tr>
        {#each row as cell}
          <td class={cellClass(cell.align)}>
            <Inlines tokens={cell.tokens} />
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</Table>
