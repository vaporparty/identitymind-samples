from django.http import JsonResponse
from django.shortcuts import render, redirect
import requests
import re

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
    edna_config = get_ednaConfig(request)

    edna_url = edna_config['host'] + request.get_full_path()

    print("Request: " + edna_url)

    response = requests.request("GET", edna_url, auth=(edna_config['apiName'], edna_config['apiKey']), verify=False)

    print("Response: " + response.text)

    return JsonResponse(response.json(), safe=False)


@require_POST
def transaction_upload(request):
    edna_config = get_ednaConfig(request)

    edna_url = edna_config['host'] + request.get_full_path()

    print("Request: " + edna_url)
    response = requests.request("POST", edna_url, data=request.body,
                                auth=(edna_config['apiName'], edna_config['apiKey']), verify=False)

    print("Response: " + response.text)

    return JsonResponse(response.json(), safe=False)


def get_ednaConfig(request):
    return request.session.get('ednaConfig', {
        'host': 'https://edna.identitymind.com',
        'apiName': 'apiNameHere',
        'apiKey': 'apiKeyHere'
    })


def test(request):
    regex = re.compile('^HTTP_')
    print(dict((regex.sub('', header), value) for (header, value)
               in request.META.items() if header.startswith('HTTP_')))
    return JsonResponse({'foo': 'bar'})
