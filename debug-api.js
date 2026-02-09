
const urls = [
    'http://localhost:8000/v1',
    'https://api.kumopack.com/v1'
];

async function testApi() {
    console.log("--- Starting API Debug ---");

    for (const baseUrl of urls) {
        console.log(`\nTesting Base URL: ${baseUrl}`);
        try {
            // Test 1: Get All Products
            const listUrl = `${baseUrl}/product?page=1&limit=5`;
            console.log(`Fetching List: ${listUrl}`);
            const res = await fetch(listUrl);
            
            if (!res.ok) {
                console.log(`Failed to fetch list: Status ${res.status}`);
                continue;
            }

            const data = await res.json();
            console.log("Root Product List Success!");
            console.log(`Total items: ${data.totalItems}`);
            
            if (data.data && data.data.length > 0) {
                const firstProduct = data.data[0];
                console.log("Sample Product (First Item):");
                console.log(`ID: ${firstProduct.id}`);
                console.log(`Slug: ${firstProduct.slug}`);
                console.log(`NameEn: ${firstProduct.nameEn}`);
                
                // Test 2: Fetch by ID
                if (firstProduct.id) {
                    const idUrl = `${baseUrl}/product/${firstProduct.id}`;
                    console.log(`\nTesting Fetch by ID (url: ${idUrl})...`);
                    const idRes = await fetch(idUrl);
                    if (idRes.ok) {
                        const idData = await idRes.json();
                        console.log("Fetch by ID Result: SUCCESS ✅");
                        console.log(`Matched Product Name: ${idData.nameEn}`);
                    } else {
                        console.log(`Fetch by ID Result: FAILED ❌ (Status: ${idRes.status})`);
                    }
                }

                // Test 3: Fetch by Slug
                if (firstProduct.slug) {
                    const slugUrl = `${baseUrl}/product/${encodeURIComponent(firstProduct.slug)}`;
                    console.log(`\nTesting Fetch by Slug (url: ${slugUrl})...`);
                    const slugRes = await fetch(slugUrl);
                    if (slugRes.ok) {
                        const slugData = await slugRes.json();
                        console.log("Fetch by Slug Result: SUCCESS ✅");
                        console.log(`Matched Product Name: ${slugData.nameEn}`);
                    } else {
                        console.log(`Fetch by Slug Result: FAILED ❌ (Status: ${slugRes.status})`);
                    }
                }
            } else {
                console.log("No products found in list to test detail fetch.");
            }
            
        } catch (error) {
            console.log(`Error connecting to ${baseUrl}:`, error.cause ? error.cause.message : error.message);
        }
    }
    console.log("\n--- End API Debug ---");
}

testApi();
