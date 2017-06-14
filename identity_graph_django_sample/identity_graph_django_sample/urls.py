"""idm_sigma_example URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.views.generic import TemplateView

import identity_graph_django_sample.views

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html'), name='home'),
    url(r'^graph/$', TemplateView.as_view(template_name='graph.html'), name='graph'),
    url(r'^transfers/$', TemplateView.as_view(template_name='transfers.html'), name='transfers'),
    url(r'^identity/$', TemplateView.as_view(template_name='identity.html'), name='identity'),
    url(r'^im/config/$', identity_graph_django_sample.views.config, name='config'),
    url(r'^upload/$', TemplateView.as_view(template_name='upload.html'), name='upload'),
    url(r'^im/admin/.*$', identity_graph_django_sample.views.api_router, name='router'),
    url(r'^im/transaction/graphscore/batch$', identity_graph_django_sample.views.transaction_upload, name='transaction_upload'),
    url(r'^admin/', admin.site.urls),
]
