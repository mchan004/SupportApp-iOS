SELECT t2.id, t2.name, t1.message, t1.created_at FROM chatlog t1
  JOIN (SELECT cu.id, cu.name, MAX(c.created_at) created_at FROM chatlog c
      	JOIN customer cu ON (cu.id=c.idTo OR cu.id=c.idFrom)
      	GROUP BY cu.id
        ) t2
  ON (t1.idFrom = t2.id OR t1.idTo = t2.id) AND t1.created_at = t2.created_at
		JOIN users u ON (t1.idFrom=u.id OR t1.idTo=u.id) WHERE u.id = 1
		ORDER BY t1.created_at DESC
