import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const customer_id = searchParams.get("customer_id")

    let query = supabase
      .from("projects")
      .select(`
        *,
        customers(name, email),
        project_types(name, is_on_grid),
        user_profiles(full_name)
      `)
      .order("created_at", { ascending: false })

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    if (customer_id) {
      query = query.eq("customer_id", customer_id)
    }

    const { data, error } = await query

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, customer_id, project_type_id, manager_id, start_date, end_date, budget, description } = body

    if (!name || !customer_id) {
      return NextResponse.json({ error: "Name and customer_id are required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("projects")
      .insert({
        name,
        customer_id,
        project_type_id,
        manager_id,
        start_date,
        end_date,
        budget,
        description,
        status: "draft",
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
