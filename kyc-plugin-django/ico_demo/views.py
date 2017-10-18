import jwt
import requests
import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from ico_demo import settings


def register(request):

    url = settings.AUTH_URL

    headers = {
        'content-type': "application/json",
        'x-api-key': settings.API_KEY
    }

    response = requests.request("GET", url, headers=headers, verify=False)

    return HttpResponse(
        render(request, 'register.html', {'token': response.json()["token"]}))


@csrf_exempt
@require_POST
def kyc(request):

    public_key = settings.PUBLIC_KEY.replace("//", "\n")

    decoded = jwt.decode(request.body.decode('utf-8'), public_key, algorithms=['RS256'])

    print(decoded)

    # do something interesting like saving data to DB

    return JsonResponse({"message": "Data Recieved from plugin"}, safe=False)
