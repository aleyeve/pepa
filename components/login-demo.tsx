"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const users = {
  ADMIN001: { role: "admin", name: "Administrador Sistema", password: "admin123" },
  EMP001: { role: "employee", name: "Juan Pérez", password: "empleado123" },
  EMP002: { role: "employee", name: "María González", password: "empleado123" },
}

export function LoginDemo({ onLogin }: { onLogin: (user: any) => void }) {
  const [legajo, setLegajo] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const user = users[legajo as keyof typeof users]
    if (!user) {
      setError("Legajo no encontrado")
      return
    }

    if (user.password !== password) {
      setError("Contraseña incorrecta")
      return
    }

    onLogin({ ...user, legajo })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-sky-700">Sistema de Gestión</h1>
          <h2 className="text-xl font-semibold text-sky-600">Ausencias y Vacaciones</h2>
          <p className="mt-2 text-gray-600">Demo Funcional - Ingresa con tu legajo</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-sky-700">Iniciar Sesión</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="legajo">Número de Legajo</Label>
                <Input
                  id="legajo"
                  type="text"
                  placeholder="Ej: ADMIN001, EMP001"
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
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
                Iniciar Sesión
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="p-4 bg-white/50 rounded-lg border border-sky-200">
          <h3 className="font-semibold text-sky-700 mb-2">Credenciales de Prueba:</h3>
          <div className="text-sm space-y-1">
            <p>
              <strong>Administrador:</strong> ADMIN001 / admin123
            </p>
            <p>
              <strong>Empleado 1:</strong> EMP001 / empleado123
            </p>
            <p>
              <strong>Empleado 2:</strong> EMP002 / empleado123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
