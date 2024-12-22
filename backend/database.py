import psycopg2
import psycopg2.extras

class SQL:
    def __init__(self):
        self.conn = psycopg2.connect(
            database="postgres",
            user="leshya",
            password="password",
            host="0.0.0.0",
            port="5432",
        )
        self.cursor = self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    def sql_read(self, query):
        self.cursor.execute(query)
        rows = self.cursor.fetchall()
        ans1 = []
        for row in rows:
            ans1.append(dict(row))

        return ans1

