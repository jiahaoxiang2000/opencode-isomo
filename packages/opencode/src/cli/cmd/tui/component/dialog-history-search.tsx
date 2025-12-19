import { createMemo } from "solid-js"
import { DialogSelect } from "@tui/ui/dialog-select"
import { useDialog } from "@tui/ui/dialog"
import type { PromptInfo } from "./prompt/history"

export interface DialogHistorySearchProps {
  items: PromptInfo[]
  onSelect: (item: PromptInfo) => void
}

export function DialogHistorySearch(props: DialogHistorySearchProps) {
  const dialog = useDialog()

  const options = createMemo(() => {
    const seen = new Set<string>()
    return props.items
      .slice()
      .reverse()
      .filter((item) => {
        if (!item.input.trim().length) return false
        if (seen.has(item.input)) return false
        seen.add(item.input)
        return true
      })
      .map((item) => ({
        title: item.input,
        value: item,
        description: undefined,
        onSelect: () => {
          props.onSelect(item)
          dialog.clear()
        },
      }))
  })

  return <DialogSelect title="Search History" placeholder="Type to search..." options={options()} />
}
