"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export type ComboboxOption = {
  value: string
  label: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  emptyText?: string
  className?: string
  allowCreate?: boolean
  onCreateOption?: (value: string) => void
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select option",
  emptyText = "No results found.",
  className,
  allowCreate = false,
  onCreateOption,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleInputChange = React.useCallback((value: string) => {
    setInputValue(value)
  }, [])

  const handleCreateOption = React.useCallback(() => {
    if (onCreateOption && inputValue && inputValue.trim() !== "") {
      const trimmedValue = inputValue.trim()
      onCreateOption(trimmedValue)
      onChange(trimmedValue)
      setOpen(false)
      setInputValue("")
    }
  }, [inputValue, onChange, onCreateOption])

  const displayValue = React.useMemo(() => {
    const selectedOption = options.find((option) => option.value === value)
    return selectedOption ? selectedOption.label : value
  }, [options, value])

  const filteredOptions = React.useMemo(() => {
    if (!inputValue) return options

    return options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()))
  }, [options, inputValue])

  const showCreateOption = React.useMemo(() => {
    if (!allowCreate || !inputValue || inputValue.trim() === "") return false

    // Only show create option if the input doesn't match any existing option exactly
    return !options.some(
      (option) =>
        option.label.toLowerCase() === inputValue.toLowerCase() ||
        option.value.toLowerCase() === inputValue.toLowerCase(),
    )
  }, [allowCreate, inputValue, options])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          type="button"
        >
          {value ? displayValue : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder={placeholder} value={inputValue} onValueChange={handleInputChange} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            {showCreateOption && (
              <CommandItem onSelect={handleCreateOption} className="text-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add "{inputValue}"
              </CommandItem>
            )}
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    // Ensure we're using the option value, not the currentValue from onSelect
                    onChange(option.value)
                    setOpen(false)
                    setInputValue("")
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

