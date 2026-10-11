
export async function onRequestGet({ params, env }) {
  try {
    const recipe = await env.DB.prepare(
      "SELECT * FROM recipes WHERE id = ?"
    ).bind(params.id).first();

    if (!recipe) {
      return Response.json(
        { error: "Recipe not found" },
        { status: 404 }
      );
    }

    return Response.json(recipe);
  } catch (error) {
    return Response.json(
      { error: "Could not load recipe" },
      { status: 500 }
    );
  }
}

export async function onRequestDelete({ request, params, env }) {
  const secret = env.ADMIN_API_KEY;

  if (
    !secret ||
    request.headers.get("Authorization") !== `Bearer ${secret}`
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await env.DB.prepare(
      "DELETE FROM recipes WHERE id = ?"
    ).bind(params.id).run();

    if (!result.meta.changes) {
      return Response.json(
        { error: "Recipe not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: "Could not delete recipe" },
      { status: 500 }
    );
  }
                         }
