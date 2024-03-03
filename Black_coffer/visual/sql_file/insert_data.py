import json
from mysql import connector

with open('jsondata.json') as f:
    json_data = json.load(f)

parsed_data = json_data  

conn = connector.connect(user='root', password='toor', host='localhost', auth_plugin='mysql_native_password', database="BlackCofer")

cursor = conn.cursor()


for item in parsed_data:
    keys = ', '.join(item.keys())
    placeholders = ', '.join('?' * len(item))
    placeholders = placeholders.replace("?", "%s")
    values = tuple(item.values())
    cursor.execute(f"INSERT INTO data ({keys}) VALUES ({placeholders})", values)

conn.commit()
conn.close()
