
const urls = [
    'http://localhost:8000/v1'
];

async function testApi() {
    console.log("--- Starting Materials API Debug ---");

    for (const baseUrl of urls) {
        try {
            // 1. Get List
            const listUrl = `${baseUrl}/product/materials?page=1&limit=1`;
            console.log(`Fetching: ${listUrl}`);
            const res = await fetch(listUrl);
            
            if (!res.ok) {
                console.log(`Failed: Status ${res.status}`);
                continue;
            }

            const data = await res.json();
            console.log("Materials List Success!");
            console.log(`Total items: ${data.totalItems}`);
            
            if (data.data && data.data.length > 0) {
                const firstItem = data.data[0];
                console.log("Material Keys:", Object.keys(firstItem));
                console.log("Sample Material:", JSON.stringify(firstItem, null, 2));
                
                 if (firstItem.slug) {
                    const slugUrl = `${baseUrl}/product/materials/${encodeURIComponent(firstItem.slug)}`;
                    console.log(`Testing Fetch by Slug: ${slugUrl}`);
                    const slugRes = await fetch(slugUrl);
                    if (slugRes.ok) {
                        const slugData = await slugRes.json();
                        console.log("Fetch by Slug Result: SUCCESS");
                         console.log("Detail Keys:", Object.keys(slugData));
                    } else {
                        console.log(`Fetch by Slug Result: FAILED (${slugRes.status})`);
                    }
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

testApi();
