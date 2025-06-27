import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { DashboardContent } from "@/components/dashboard-content"

export default async function DashboardPage() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  // Check if user is an employee
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  if (profile?.role === "admin") {
    redirect("/admin/dashboard")
  }

  // Get employee data
  const { data: employee } = await supabase
    .from("profiles")
    .select("*, absences(*), vacations(*)")
    .eq("id", session.user.id)
    .single()

  return <DashboardContent employee={employee} />
}
