import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LoginView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-sky-700">Sistema de Gestión de Ausencias y Vacaciones</h1>
          <p className="mt-2 text-gray-600">Inicia sesión para gestionar tus solicitudes</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-sky-700">Iniciar Sesión</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" placeholder="correo@empresa.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" />
              </div>
              <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700">
                Iniciar Sesión
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
