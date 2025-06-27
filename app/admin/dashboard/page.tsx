import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { AdminDashboardContent } from "@/components/admin-dashboard-content"

export default async function AdminDashboardPage() {
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

  // Get counts for dashboard
  const { data: pendingAbsences, count: pendingAbsencesCount } = await supabase
    .from("absences")
    .select("*", { count: "exact" })
    .eq("status", "pending")

  const { data: pendingVacations, count: pendingVacationsCount } = await supabase
    .from("vacations")
    .select("*", { count: "exact" })
    .eq("status", "pending")

  const { data: employees, count: employeesCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .eq("role", "employee")

  return (
    <AdminDashboardContent
      pendingAbsencesCount={pendingAbsencesCount || 0}
      pendingVacationsCount={pendingVacationsCount || 0}
      employeesCount={employeesCount || 0}
      pendingAbsences={pendingAbsences || []}
      pendingVacations={pendingVacations || []}
    />
  )
}
