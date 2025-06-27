"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Menu, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"

export function Header() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function getUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        setUser(session.user)

        // Get profile
        const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

        setProfile(data)
      }

      setLoading(false)
    }

    getUser()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const isAdmin = profile?.role === "admin"
  const isEmployee = profile?.role === "employee"

  const employeeLinks = [
    { href: "/dashboard", label: "Panel Principal" },
    { href: "/absences", label: "Registrar Ausencia" },
    { href: "/vacations", label: "Solicitar Vacaciones" },
    { href: "/reports", label: "Mis Reportes" },
  ]

  const adminLinks = [
    { href: "/admin/dashboard", label: "Panel Admin" },
    { href: "/admin/employees", label: "Gestión de Empleados" },
    { href: "/admin/absences", label: "Gestión de Ausencias" },
    { href: "/admin/vacations", label: "Gestión de Vacaciones" },
    { href: "/admin/reports", label: "Reportes" },
  ]

  const links = isAdmin ? adminLinks : employeeLinks

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="flex flex-col gap-4 mt-8">
                {!loading && user && (
                  <>
                    {links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`text-sm font-medium transition-colors hover:text-sky-700 ${
                          pathname === link.href ? "text-sky-700" : "text-gray-600"
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Button
                      variant="ghost"
                      className="justify-start px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-sky-700">GestVac</span>
          </Link>

          {!loading && user && (
            <nav className="hidden lg:flex items-center gap-6 ml-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-sky-700 ${
                    pathname === link.href ? "text-sky-700" : "text-gray-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {!loading && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <User className="h-5 w-5 text-sky-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{profile?.full_name || user.email}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={isAdmin ? "/admin/profile" : "/profile"}>Mi Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={handleSignOut}>
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : !loading ? (
          <Button asChild className="bg-sky-600 hover:bg-sky-700">
            <Link href="/">Iniciar Sesión</Link>
          </Button>
        ) : null}
      </div>
    </header>
  )
}
