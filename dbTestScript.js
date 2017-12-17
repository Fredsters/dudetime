conn = new Mongo();
db = conn.getDB("testDB");

db.collection.insertOne({name: "Fred"});


cursor = db.collection.find();
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}

