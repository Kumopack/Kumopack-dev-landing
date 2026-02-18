const baseUrl = "https://api.kumopack.com/v1";

async function testBlogHash() {
  console.log("--- Testing Blog Hash API ---");
  try {
    // 1. Get raw list to find a slug
    const listUrl = `${baseUrl}/articles?page=1&limit=5`;
    const listRes = await fetch(listUrl);
    const listData = await listRes.json();

    if (!listData.data || listData.data.length === 0) {
      console.log("No articles found to test.");
      return;
    }

    const firstArticle = listData.data[0];
    const fullSlug = firstArticle.slug;
    console.log(`Full Slug: ${fullSlug}`);

    // Extract suffix (assume last part after dash)
    const parts = fullSlug.split("-");
    const suffix = parts[parts.length - 1]; // This is 'b6bi9' e.g.
    console.log(`Extracted Suffix (ID?): ${suffix}`);

    // 2. Fetch by Suffix
    const hashUrl = `${baseUrl}/articles/${suffix}`;
    console.log(`Fetching: ${hashUrl}`);
    const hashRes = await fetch(hashUrl);

    if (hashRes.ok) {
      const hashData = await hashRes.json();
      console.log("✅ Success! API Accepted the suffix.");
      console.log(`Returned ID: ${hashData.id}`);
      console.log(`Returned Name: ${hashData.nameTh}`);
    } else {
      console.log(`❌ Failed. API returned ${hashRes.status}`);
    }

    // 3. Just for sanity, try integer ID if the suffix failed
    if (!hashRes.ok && firstArticle.id) {
      const idUrl = `${baseUrl}/articles/${firstArticle.id}`;
      console.log(`Trying standard ID: ${idUrl}`);
      const idRes = await fetch(idUrl);
      console.log(`ID Fetch status: ${idRes.status}`);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testBlogHash();
