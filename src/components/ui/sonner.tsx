import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5 text-emerald-500" />,
        info: <InfoIcon className="size-5 text-blue-500" />,
        warning: <TriangleAlertIcon className="size-5 text-amber-500" />,
        error: <OctagonXIcon className="size-5 text-red-500" />,
        loading: <Loader2Icon className="size-5 animate-spin text-primary" />,
      }}
      style={
        {
          "--normal-bg": "hsl(var(--background))",
          "--normal-text": "hsl(var(--foreground))",
          "--normal-border": "hsl(var(--border))",
          "--border-radius": "1rem",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:p-4 group-[.toaster]:font-medium group-[.toaster]:gap-3",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-sm group-[.toast]:font-normal",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:font-medium group-[.toast]:rounded-xl group-[.toast]:px-4 group-[.toast]:py-1.5",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:font-medium group-[.toast]:rounded-xl group-[.toast]:px-4 group-[.toast]:py-1.5",
          success: "group-[.toaster]:border-emerald-500/20 group-[.toaster]:bg-emerald-500/[0.02]",
          error: "group-[.toaster]:border-red-500/20 group-[.toaster]:bg-red-500/[0.02]",
          info: "group-[.toaster]:border-blue-500/20 group-[.toaster]:bg-blue-500/[0.02]",
          warning: "group-[.toaster]:border-amber-500/20 group-[.toaster]:bg-amber-500/[0.02]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
