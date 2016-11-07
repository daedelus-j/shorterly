from .models import (Url,
                     DeviceUrl,)
from rest_framework import serializers
from django.conf import settings


class DeviceUrlSerializer(serializers.ModelSerializer):
    visits = serializers.SerializerMethodField()

    class Meta:
        model = DeviceUrl
        fields = ('id', 'visits', 'type', 'url',)

    def get_visits(self, obj):
        return obj.visits.all().count()


class UrlSerializer(serializers.ModelSerializer):
    devices = serializers.SerializerMethodField()
    total_visits = serializers.SerializerMethodField()
    url_domain = serializers.SerializerMethodField()
    short_url = serializers.SerializerMethodField()

    class Meta:
        model = Url
        fields = ('id', 'short_url', 'devices', 'url_domain', 'total_visits')

    def get_total_visits(self, obj):
        return sum([d.visits.all().count() for d in obj.devices.all()])

    def get_url_domain(self, obj):
        return settings.SHORTENED_DOMAIN_NAME

    def get_short_url(self, obj):
        return '{domain}/{url_id}'.format(
            domain=settings.SHORTENED_DOMAIN_NAME,
            url_id=obj.url_id)

    def get_devices(self, obj):
        devices = {}
        for d in obj.devices.all():
            devices[d.type] = DeviceUrlSerializer(d).data
        return devices
