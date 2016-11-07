"""Views for the base app"""

from django.shortcuts import render
from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.http import Http404
from django.shortcuts import (get_object_or_404,
                              render,
                              render_to_response,
                              redirect,)
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.views.generic import View
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import (UrlSerializer,
                          DeviceUrlSerializer,)
from .models import (Url,
                     DeviceUrl,
                     UrlVisit,
                     generate_url_id,)
import time
import jsonpickle



class HomeView(View):
    """ Default view for the root """
    @method_decorator(ensure_csrf_cookie)
    def get(self, request):
        return render(request, 'base/home.html')


class UrlRedirectView(View):
    """ Default view for the root """
    @method_decorator(ensure_csrf_cookie)
    def get(self, request, url_id=None):
        url = get_object_or_404(Url, url_id=url_id)
        device_type = 'DESKTOP'
        if request.user_agent.is_mobile:
            device_type = 'MOBILE'
        elif request.user_agent.is_tablet:
            device_type = 'TABLET'

        device_url = url.devices.all().filter(type=device_type).first()
        new_visit = UrlVisit(url=device_url)
        new_visit.save()
        return redirect(device_url.url)


class UrlView(View):
    """ Default view for the root """
    @method_decorator(ensure_csrf_cookie)
    def get(self, request, url_id=None):
        if url_id:
            url = get_object_or_404(Url,
                                    id=url_id)
            return render(request, 'base/home.html', context={
                'data': jsonpickle.encode({
                    'url': UrlSerializer(url).data,
                })
            })

        return render(request, 'base/home.html', context={
            'data': jsonpickle.encode({
                'urls': [UrlSerializer(url).data for url in Url.objects.all()],
            })
        })


class DeviceUrlViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = DeviceUrlSerializer

    def update(self, request, pk=None):
        device_url = DeviceUrl.objects.get(id=pk)
        url = request.data.get('url', '')
        device_url.url = url
        device_url.save()
        return Response({
            'device_url': DeviceUrlSerializer(device_url).data
        })


class UrlApiViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = UrlSerializer

    def create(self, request):
        device_types = ('DESKTOP', 'MOBILE', 'TABLET')
        new_url = Url()
        new_url.url_id = generate_url_id()
        new_url.save()

        url = request.data.get('url', '')
        for device_type in device_types:
            device_url = DeviceUrl(url=url,
                                   type=device_type,
                                   main_url=new_url)
            device_url.main_url = new_url
            device_url.save()

        return Response({
            'url': UrlSerializer(new_url).data
        })
