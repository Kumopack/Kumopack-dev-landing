
const urls = [
    'http://localhost:8000/v1'
];

async function testApi() {
    console.log("--- Starting API Debug (Detail Keys Check) ---");

    for (const baseUrl of urls) {
        try {
            // 1. Get List to get a slug
            const listUrl = `${baseUrl}/product?page=1&limit=1`;
            const listRes = await fetch(listUrl);
            const listData = await listRes.json();
            
            if (listData.data && listData.data.length > 0) {
                const slug = listData.data[0].slug;
                console.log(`Testing detail fetch for slug: ${slug}`);
                
                // 2. Get Detail
                const detailUrl = `${baseUrl}/product/${encodeURIComponent(slug)}`;
                const res = await fetch(detailUrl);
                if (!res.ok) {
                    console.log(`Status: ${res.status}`);
                    continue;
                }

                const product = await res.json();
                console.log("Detail Product Keys:", Object.keys(product));
                console.log("Detail Values for id:", {
                    id: product.id,
                    productId: product.productId,
                    _id: product._id
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

testApi();
