from mysql import connector

conn = connector.connect(user='root', password='toor', host='localhost', auth_plugin='mysql_native_password', database="BlackCofer")
cursor = conn.cursor()


def extract_data(data_to_extract):
    cursor.execute(f"select {data_to_extract} from data")
    result = cursor.fetchall()
    return result
