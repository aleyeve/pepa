"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, UserPlus } from "lucide-react"

export function EmployeeForm({ employee = null }: { employee?: any }) {
  const [fullName, setFullName] = useState(employee?.full_name || "")
  const [email, setEmail] = useState(employee?.email || "")
  const [employeeId, setEmployeeId] = useState(employee?.employee_id || "")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName || !email || !employeeId || (!employee && !password)) {
      toast({
        title: "Error en el formulario",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    try {
      if (employee) {
        // Update existing employee
        const { error } = await supabase
          .from("profiles")
          .update({
            full_name: fullName,
            employee_id: employeeId,
          })
          .eq("id", employee.id)

        if (error) throw error

        toast({
          title: "Empleado actualizado",
          description: "Los datos del empleado han sido actualizados correctamente",
        })
      } else {
        // Create new employee
        // 1. Create auth user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              employee_id: employeeId,
              role: "employee",
            },
          },
        })

        if (authError) throw authError

        // 2. Ensure profile is created with role
        if (authData.user) {
          const { error: profileError } = await supabase.from("profiles").upsert({
            id: authData.user.id,
            full_name: fullName,
            employee_id: employeeId,
            role: "employee",
            email,
          })

          if (profileError) throw profileError
        }

        toast({
          title: "Empleado registrado",
          description: "El nuevo empleado ha sido registrado correctamente",
        })
      }

      router.push("/admin/employees")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error al registrar el empleado",
        description: error.message || "Ha ocurrido un error, intenta nuevamente",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="full-name">Nombre completo</Label>
            <Input
              id="full-name"
              placeholder="Nombre y apellido"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employee-id">Número de legajo</Label>
            <Input
              id="employee-id"
              placeholder="Ej: EMP001"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
          </div>

          {!employee && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña inicial</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">
                  El empleado podrá cambiar su contraseña después de iniciar sesión
                </p>
              </div>
            </>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-sky-600 hover:bg-sky-700" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {employee ? "Actualizando..." : "Registrando..."}
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  {employee ? "Actualizar Empleado" : "Registrar Empleado"}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
