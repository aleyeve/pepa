import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { EmployeeForm } from "@/components/employee-form"

export default async function NewEmployeePage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  // Check if user is an admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  if (profile?.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-sky-700 mb-6">Registrar Nuevo Empleado</h1>
      <EmployeeForm />
    </div>
  )
}
