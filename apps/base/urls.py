"""urlconf for the base application"""

from django.conf.urls import include, url
from .views import (HomeView,
                    UrlView,
                    UrlApiViewSet,
                    UrlRedirectView,
                    DeviceUrlViewSet)
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'urls', UrlApiViewSet, base_name='urls')
router.register(r'device-urls', DeviceUrlViewSet, base_name='device-urls')

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^urls/$',
        UrlView.as_view(),
        name='urls'),
    url(r'^urls/(?P<url_id>[A-Za-z0-9\-_=]+)/$',
        UrlView.as_view(),
        name='urls'),
    url(r'^(?P<url_id>[A-Za-z0-9\-_=]+)/$',
        UrlRedirectView.as_view(),
        name='short_urls'),
    url(r'^$', HomeView.as_view(), name='home'),
]
