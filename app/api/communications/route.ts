import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { lead_id, customer_id, project_id, type, subject, content, created_by } = body

    const { data, error } = await supabase
      .from("communications")
      .insert({
        lead_id,
        customer_id,
        project_id,
        type,
        subject,
        content,
        created_by,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lead_id = searchParams.get("lead_id")
    const customer_id = searchParams.get("customer_id")
    const project_id = searchParams.get("project_id")

    let query = supabase
      .from("communications")
      .select(`
        *,
        user_profiles(full_name)
      `)
      .order("created_at", { ascending: false })

    if (lead_id) {
      query = query.eq("lead_id", lead_id)
    }
    if (customer_id) {
      query = query.eq("customer_id", customer_id)
    }
    if (project_id) {
      query = query.eq("project_id", project_id)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
