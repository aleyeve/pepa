"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export function LoginForm() {
  const [legajo, setLegajo] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Buscar empleado por legajo
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("employee_id", legajo)
        .single()

      if (profileError || !profile) {
        throw new Error("Legajo no encontrado o inactivo")
      }

      // Intentar iniciar sesión con el email asociado al legajo
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: profile.email,
        password,
      })

      if (authError) {
        throw new Error("Credenciales incorrectas")
      }

      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido ${profile.full_name}`,
      })

      // Redirigir según el rol
      if (profile.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/dashboard")
      }

      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "Verifica tus credenciales e intenta nuevamente",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-sky-700">Iniciar Sesión</CardTitle>
        <p className="text-center text-sm text-gray-600">Ingresa tu legajo y contraseña</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="legajo">Número de Legajo</Label>
            <Input
              id="legajo"
              type="text"
              placeholder="Ej: EMP001, ADMIN001"
              value={legajo}
              onChange={(e) => setLegajo(e.target.value.toUpperCase())}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
