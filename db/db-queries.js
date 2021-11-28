module.exports = (db) => {

  const getUserByEmail = function (email) {
    return db
      .query(`SELECT * FROM users WHERE email = $1;`, [email])
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };

  const getUserById = function (id) {
    return db.query(`
    SELECT * FROM users WHERE id = $1;`, [id])
      .then((result) => {
        if (result) {
          return result.rows[0];
        } else {
          return null;
        }
      });
  };


  const updateUserInfo = function (email, newInfo) {

    const queryParams = [];
    let queryString = `UPDATE users
    SET`

    if (newInfo.first_name) {
      queryParams.push(`${newInfo.name}`);
      queryString += ` first_name = $${queryParams.length}`;
    }

    if (newInfo.last_name) {
      queryString += `${queryParams.length ? ', last_name = ' : ' last_name = '}`;
      queryParams.push(`${newInfo.name}`);
      queryString += `$${queryParams.length}`;
    }

    if (newInfo.email) {
      queryString += `${queryParams.length ? ', email = ' : ' email = '}`;
      queryParams.push(`${newInfo.email}`);
      queryString += `$${queryParams.length}`;
    }

    if (newInfo.password) {
      queryString += `${queryParams.length ? ', password = ' : 'password = '}`;
      queryParams.push(`${newInfo.password}`);
      queryString += `$${queryParams.length}`;
    }

    queryParams.push(email)
    queryString += `
    WHERE email = $${queryParams.length}
    RETURNING *
    `

    return db.query(queryString, queryParams).then((result) => result.rows[0])
  }

  const addUser = function(user) {
    const values = [user.first_name, user.last_name, user.email, user.password]
    return db.query(`INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`, values)
      .then((result) => {
        if (result) {
          return result.rows[0]
        } else {
          return null
        }
      })
      .catch((err) => {
        console.log(err)
        return null
      })
  }

  const addPin = function(object) {
    return db.query(`
    INSERT INTO posts (owner_id, title, description, content_type, content, tag, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, now())
    RETURNING *;
    `, [object.owner_id, object.title, object.description, object.content_type, object.content, object.tag])
      .then(result => result.rows[0])
    //testing, remove .rows[0] in production
  }

  const addRating = function(object) {
    return db.query(`
    INSERT INTO post_ratings (user_id, post_id, rating)
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [object.user_id, object.post_id, object.rating])
      .then(result => result.rows[0])
      .catch((err) => console.log(err))
  };

  const addComment = function(object) {
    return db.query(`
    INSERT INTO comments (user_id, pin_id, comment, created_at)
    VALUES ($1, $2, $3, now())
    RETURNING *;
    `, [object.user_id, object.post_id, object.comment])
      .then(result => result.rows)
      .catch((err) => console.log(err))
  };

  const addFavorite = function(object) {
    return db.query(`
    INSERT INTO liked_posts (user_id, post_id)
    VALUES ($1, $2)
    RETURNING *;
    `, [object.user_id, object.post_id])
      .then(result => result.rows[0])
      .catch((err) => console.log(err))
  };



  return { getUserByEmail, updateUserInfo, addUser, getUserById, addPin, addRating, addComment, addFavorite };
};





