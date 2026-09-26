import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "cn"

function RadioGroup({
  className,
  ...props
}) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}) {
  return (
    <RadioPrimitive.Root
  data-slot="radio-group-item"
  nativeButton
  render={<button type="button" />}
  className={cn(
    "relative size-4 shrink-0 rounded-full border border-gray-400 bg-white outline-none",
    "data-checked:border-black data-checked:bg-black",
    "focus-visible:ring-2 focus-visible:ring-gray-400",
    "disabled:cursor-not-allowed disabled:opacity-50",
    className
  )}
  {...props}
>
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="size-2 rounded-full bg-white" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }