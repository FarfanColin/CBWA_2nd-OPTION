const db = require ( '../db' )();
const COLLECTION = "books" ;
module . exports = () => {
  const get = async ( id = null ) => {
    console . log ( ' inside books model' );
    if (! id ) {
      const authors = await db . get ( COLLECTION );
      return authors ;
    }
    return { error: "byId not implemented yet" }
  }
  const add = async ( name , author ) => {
    const bookCount = await db . count ( COLLECTION );
    const results = await db . add ( COLLECTION , {
      id: bookCount + 1 ,
      name: name ,
      author: author
    });
    return results . result ;
  }
  return {
    get ,
    add
  }
};
