import { NextRequest, NextResponse } from "next/server";
import { User } from "@/types/gallery";
import { getUsers } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("_page") || "1");
    const limit = parseInt(searchParams.get("_limit") || "12");
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const sort = searchParams.get("sort");
    const excludeId = searchParams.get("id_ne");

    let users: User[] = [...getUsers()];

    if (search) {
      const searchLower = search.toLowerCase();
      users = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchLower) ||
          user.last_name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
      );
    }

    if (category && category !== "all") {
      users = users.filter((user) => user.category === category);
    }

    if (excludeId) {
      users = users.filter((user) => user.id.toString() !== excludeId);
    }

    if (sort) {
      switch (sort) {
        case "latest":
          users.sort((a, b) => b.id - a.id);
          break;
        case "trending":
          users.sort((a, b) => (b.likes || 0) - (a.likes || 0));
          break;
        case "oldest":
          users.sort((a, b) => a.id - b.id);
          break;
      }
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = users.slice(startIndex, endIndex);

    const totalPages = Math.ceil(users.length / limit);

    return NextResponse.json({
      page,
      per_page: limit,
      total: users.length,
      total_pages: totalPages,
      data: paginatedUsers,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();

    const newUser: User = {
      ...userData,
      id: Date.now(),
    };

    return NextResponse.json(newUser, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
