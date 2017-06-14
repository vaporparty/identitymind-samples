from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
import requests
import json

from django.views.decorators.http import require_GET, require_POST


def config(request):
    if request.method == "POST":

        request.session['ednaConfig'] = {
            'host': request.POST.get("host", ""),
            'apiName': request.POST.get("apiName", ""),
            'apiKey': request.POST.get("apiKey", "")
        }

        return redirect('/')

    else:

        ednaConfig = get_ednaConfig(request)

        return render(request, 'config.html', {'ednaConfig': ednaConfig})


@require_GET
def api_router(request):
    ednaConfig = get_ednaConfig(request)

    ednaUrl = ednaConfig['host'] + request.get_full_path()

    print "Request: " + ednaUrl

    response = requests.request("GET", ednaUrl, auth=(ednaConfig['apiName'], ednaConfig['apiKey']), verify=False)

    print "Response: " + response.text

    return JsonResponse(response.json(), safe=False)


@require_POST
def transaction_upload(request):
    ednaConfig = get_ednaConfig(request)

    ednaUrl = ednaConfig['host'] + request.get_full_path()

    print "Request: " + ednaUrl
    response = requests.request("POST", ednaUrl, data=request.body,
                                auth=(ednaConfig['apiName'], ednaConfig['apiKey']), verify=False)

    print "Response: " + response.text

    return JsonResponse(response.json(), safe=False)


def get_ednaConfig(request):
    return request.session.get('ednaConfig', {
        'host': 'https://edna.identitymind.com',
        'apiName': 'apiNameHere',
        'apiKey': 'apiKeyHere'
    })
