import sqlite3 
from models import ItemCreate 

class DatabaseManager: 
    def __init__ (self, db_name: str = "bingemaxxing.db") :
        self.db_name = db_name
        self._setup_database()

    def _get_connection(self): 
        conn=sqlite3.connect(self.db_name)
        conn.row_factory = sqlite3.Row
        return conn 

    def _setup_database(self): 
        with self._get_connection() as conn: 
            conn.execute('''
                CREATE TABLE IF NOT EXISTS items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    title  TEXT NOT NULL,
                    category TEXT NOT NULL, 
                    rating INTEGER, 
                    status TEXT NOT NULL
                )
            ''')
            conn.commit()

    def add_item(self, item: ItemCreate, default_status: str = "pending") -> int: 
        status_to_save = item.status or default_status
        with self._get_connection () as conn: 
            cursor = conn.execute( 
                'INSERT INTO items (title, category, rating, status) VALUES (?, ?, ?, ?)',
                (item.title, item.category, item.rating, status_to_save)

            )
            conn.commit()
            return cursor.lastrowid

    def get_all_items(self, category: str = None):
        with self._get_connection() as conn:
            if category: 
                cursor = conn.execute('SELECT * FROM items WHERE category = ?', (category,))
            else:
                cursor = conn.execute('SELECT * FROM items')

            return [dict(row) for row in cursor.fetchall()]

    def delete_item(self,item_id: int):
        with self._get_connection() as conn:
            cursor= conn.execute('DELETE FROM items WHERE id=?', (item_id,))
            conn.commit()
            return cursor.rowcount > 0

    def update_item(self, item_id: int, item: ItemCreate):
        with self._get_connection() as conn:
            cursor = conn.execute(
                '''
                UPDATE items
                SET title = ?, category = ?, rating = ?
                WHERE id = ?
                '''
                (item.title, item.category, item.rating, item.id)
            )
            conn.commit()
            return cursor.rowcount > 0 