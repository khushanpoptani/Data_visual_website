from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from mysql import connector
from rest_framework.views import APIView
from rest_framework.response import Response

filters = {"year": None , "topic": None, "sector": None, "region": None, "pestle": None, "country": None }



def show_chart(request):

    filters["year"] = None
    filters["topic"] = None
    filters["sector"] = None
    filters["region"] = None
    filters["pestle"] = None
    filters["country"] = None

    if request.method == "GET":
        endYear = request.GET.get('endYear')
        topic = request.GET.get('Topic')
        sector = request.GET.get('sector')
        region = request.GET.get('region')
        pestle = request.GET.get('pestle')
        country = request.GET.get('country')


        filters["year"] = endYear
        filters["topic"] = topic
        filters["sector"] = sector
        filters["region"] = region
        filters["pestle"] = pestle
        filters["country"] = country
        # data retrived from html form
    return render(request, 'FrontPage.html')


def extract_data(data_to_extract):
    conn = connector.connect(user='root', password='toor', host='localhost', auth_plugin='mysql_native_password',
                             database="BlackCofer")
    cursor = conn.cursor()
    cursor.execute(f"select {data_to_extract} from data")
    result = cursor.fetchall()
    return result

years = extract_data("end_year")
topic = extract_data("topic")
sector = extract_data("topic")
region = extract_data("region")
pestle = extract_data("pestle")
country = extract_data("country")


def com_data_filter(position):
    t_f = []
    keys = filters.keys()
    for k in keys:
        if filters[k] is None or filters[k] == "All":
            t_f.append(True)

        else:
            if k == "year":
                t_f.append(year_filter(position))

            else:
                t_f.append(data_filter(position, k))

    if t_f.count(True) == 6:
        return True




def year_filter(position):
    f_value = filters["year"]
    year_value = years[position][0]

    if year_value is not None and year_value != "":
        if f_value.isdigit() and year_value.isdigit():  # Check if both values are digits
            if int(f_value) >= int(year_value):
                return True


def data_filter(position, data):
    raw_data = extract_data(data)

    if raw_data is not None:
        if filters[data] == raw_data[position][0]:
            return True
    else:
        return False













def single_data(data_to_extract):
    raw_data = extract_data(data_to_extract)
    data = {}
    i = 0

    for single in raw_data:
        if(com_data_filter(i)):
            if single[0] in data:
                data[single[0]] = data[single[0]] + 1

            elif single[0] == "":
                pass

            else:
                data[single[0]] = 1

        i += 1
    return data

def double_data(data_to_extract, refrence_data):
    data1 = extract_data(data_to_extract)
    ref_data = extract_data(refrence_data)

    data = {}

    for i in range(len(ref_data)):
        if (com_data_filter(i)):
            s_data1 = data1[i][0]
            s_ref_data = ref_data[i][0]

            if (s_data1 != "" and s_ref_data != ""):
                print(s_ref_data, s_data1)

                if s_ref_data in data:
                    data[s_ref_data] = int(data[s_ref_data]) + int(s_data1)

                else:
                    data[s_ref_data] = int(s_data1)


    return data

def years_data(data_to_extract, refrence_data, third_data):
    data1 = extract_data(data_to_extract)
    ref_data = extract_data(refrence_data)
    data3 = extract_data(third_data)

    data = {}

    for i in range(len(ref_data)):
        if (com_data_filter(i)):
            s_data1 = data1[i][0]
            s_ref_data = ref_data[i][0]
            s_data3 = data3[i][0]

            if (s_data1 != "" and s_ref_data != "" and s_data3 != ""):
                data[s_ref_data] = s_data1




    return data




class countries(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        data = single_data("country")
        return Response(data)

class region(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        data = single_data("region")
        return Response(data)

class pestle(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        data = single_data("pestle")
        return Response(data)

class sector(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        data = single_data("sector")
        return Response(data)

class topic(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        data = single_data("topic")
        return Response(data)

class intensity(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        data = double_data("intensity", "topic")
        return Response(data)

class likelihood(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        data = double_data("likelihood", "topic")
        return Response(data)

class relevance(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        data = double_data("relevance", "topic")
        return Response(data)

class start_year(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        data = years_data("start_year", "topic", "end_year")
        return Response(data)

class end_year(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        data = years_data("end_year", "topic", "start_year")
        return Response(data)