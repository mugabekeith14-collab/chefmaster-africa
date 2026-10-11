
export async function onRequestGet({ env }) {
  try {
    const { results } = await env.DB.prepare(
      "SELECT * FROM recipes ORDER BY created_at DESC"
    ).all();

    return Response.json(results);
  } catch (error) {
    return Response.json(
      { error: "Could not load recipes. Check the database setup." },
      { status: 500 }
    );
  }
}

export async function onRequestPost({ request, env }) {
  const secret = env.ADMIN_API_KEY;
  const authorization = request.headers.get("Authorization");

  if (!secret || authorization !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const recipe = await request.json();

    if (
      !recipe.title ||
      !recipe.ingredients ||
      !recipe.steps
    ) {
      return Response.json(
        { error: "Title, ingredients and steps are required." },
        { status: 400 }
      );
    }

    const result = await env.DB.prepare(
      `INSERT INTO recipes
       (title, description, category, ingredients, steps, image_url, created_at)
       VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`
    ).bind(
      recipe.title,
      recipe.description || "",
      recipe.category || "Other",
      JSON.stringify(recipe.ingredients),
      JSON.stringify(recipe.steps),
      recipe.image_url || ""
    ).run();

    return Response.json(
      { success: true, id: result.meta.last_row_id },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { error: "Could not save recipe. Check the recipe data and database." },
      { status: 500 }
    );
  }
    }
