import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl text-sm border-2 font-bold uppercase tracking-wider whitespace-nowrap transition-[transform,shadow,colors] outline-none select-none hover:cursor-pointer active:not-aria-[haspopup]:translate-y-1 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:active:translate-y-0 focus-visible:ring-2 focus-visible:ring-ring [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'bg-zinc-700 text-white shadow-duo-zinc border-zinc-900 hover:bg-zinc-600 active:bg-zinc-700',
        secondary:
          'bg-[#1cb0f6] text-white shadow-[0_4px_0_#1899d6] hover:bg-[#25c0ff] active:bg-[#1cb0f6]',
        outline:
          'bg-white text-neutral-700 border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] hover:bg-neutral-50 active:bg-white dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:shadow-[0_4px_0_#3f3f46]',
        destructive:
          'bg-[#ff4b4b] text-white shadow-[0_4px_0_#ea2b2b] border-[#ea2b2b] hover:bg-[#ff5f5f] active:bg-[#ff4b4b]',
        warning:
          'bg-[#ffc800] text-[#774700] shadow-[0_4px_0_#e5a500] hover:bg-[#ffd21a] active:bg-[#ffc800]',
        ghost:
          'hover:bg-muted text-foreground active:translate-y-0 shadow-none',
        link: 'text-[#58cc02] underline-offset-4 hover:underline active:translate-y-0 shadow-none lowercase tracking-normal font-medium',
      },
      size: {
        default: 'h-12 gap-2 px-6 text-sm',
        xs: 'h-8 gap-1.5 px-3 text-xs',
        sm: 'h-10 gap-1.5 px-4 text-xs',
        lg: 'h-14 gap-2.5 px-8 text-base',
        icon: 'size-12',
        'icon-xs': 'size-8',
        'icon-sm': 'size-10',
        'icon-lg': 'size-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
