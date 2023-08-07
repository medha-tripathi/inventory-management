import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const uri = "mongodb+srv://test123:GyBkqShJwvSzackU@cluster0.zcmaem1.mongodb.net/";

    const client = new MongoClient(uri);

    try {
        const database = client.db('abcd');
        const inventory = database.collection('inventory');

        const query = {};
        const product = await inventory.findOne(query);

        console.log(product);
        return NextResponse.json(product);
    } finally {
        await client.close();
    }
}

export async function POST(request) {
    let body=request.body;
    const uri = "mongodb+srv://test123:GyBkqShJwvSzackU@cluster0.zcmaem1.mongodb.net/";

    const client = new MongoClient(uri);

    try {
        const database = client.db('abcd');
        const inventory = database.collection('inventory');

        const product = await inventory.insertOne(body);

        console.log(product);
        return NextResponse.json({product,ok:true});
    } finally {
        await client.close();
    }
}